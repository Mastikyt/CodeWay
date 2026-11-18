// Минимальный CDP-драйвер: аргументы — url, outPng, actionsJson
import { spawn } from 'node:child_process'
import fs from 'node:fs'

const CHROME = process.env.CHROME_PATH
const url = process.argv[2]
const outPng = process.argv[3]
const actions = JSON.parse(process.argv[4] || '{}')
const port = 9333 + Math.floor(Math.random() * 200)
const profile = `D:/Колледж/4 курс/УП_веб-программирование/CodeWay/artifacts/.profile-${port}`

const proc = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  '--hide-scrollbars',
  '--window-size=1280,1400',
  'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getWsUrl() {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/list`)
      const list = await r.json()
      const page = list.find((t) => t.type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {}
    await sleep(100)
  }
  throw new Error('CDP not available')
}

const wsUrl = await getWsUrl()
const ws = new WebSocket(wsUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })

let id = 0
const pending = new Map()
const events = []
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
  } else if (msg.method) {
    events.push(msg)
  }
}
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const mid = ++id
  pending.set(mid, { resolve, reject })
  ws.send(JSON.stringify({ id: mid, method, params }))
})

const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', {
    expression: expr,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true,
  })
  if (r.exceptionDetails) return { error: r.exceptionDetails.exception?.description || r.exceptionDetails.text }
  return r.result.value
}

await send('Page.enable')
await send('Runtime.enable')
await send('Network.enable')
await send('Log.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1400, deviceScaleFactor: 1, mobile: false })

// pre-seed localStorage if requested
if (actions.seed) {
  await send('Page.navigate', { url: new URL('/', url).href })
  await sleep(1500)
  await evaluate(actions.seed)
}

await send('Page.navigate', { url })
if (actions.waitFor) {
  for (let i = 0; i < Math.ceil((actions.wait || 2500) / 200); i++) {
    await sleep(200)
    const ok = await evaluate(`document.getElementById('app') && document.getElementById('app').innerHTML.length > 0`)
    if (ok === true) break
  }
} else {
  await sleep(actions.wait || 2500)
}

const results = {}
if (actions.steps) {
  for (const step of actions.steps) {
    results[step.name] = await evaluate(step.expr)
    await sleep(step.wait || 1200)
  }
}

// ---- diagnostics: network requests, console errors, computed styles ----
const netFails = events
  .filter((e) => e.method === 'Network.loadingFailed' || (e.method === 'Network.responseReceived' && e.params.response.status >= 400))
  .map((e) => e.method === 'Network.loadingFailed'
    ? `FAILED ${e.params.errorText} ${e.params.type}`
    : `${e.params.response.status} ${e.params.response.url}`)

const consoleMsgs = events
  .filter((e) => e.method === 'Runtime.consoleAPICalled' || e.method === 'Runtime.exceptionThrown' || e.method === 'Log.entryAdded')
  .map((e) => {
    if (e.method === 'Runtime.consoleAPICalled') return `[console.${e.params.type}] ` + e.params.args.map((a) => a.value ?? a.description ?? a.type).join(' ')
    if (e.method === 'Runtime.exceptionThrown') return '[exception] ' + (e.params.exceptionDetails.exception?.description || e.params.exceptionDetails.text)
    return `[log.${e.params.entry.level}] ${e.params.entry.text} ${e.params.entry.url || ''}`
  })

const styleProbe = await evaluate(`(() => {
  const q = (s) => document.querySelector(s)
  const cs = (el, p) => el ? getComputedStyle(el)[p] : 'NO_EL'
  const label = q('.form-group label')
  const input = q('input.form-control')
  const card = q('.auth-card')
  const btn = q('button[type=submit]')
  const h2 = q('.auth-card h2')
  return {
    location: location.pathname + location.search,
    title: document.title,
    rootTextSecondary: cs(document.documentElement, 'color') && getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim(),
    label: { color: cs(label, 'color'), fontSize: cs(label, 'fontSize'), fontWeight: cs(label, 'fontWeight'), display: cs(label, 'display'), marginBottom: cs(label, 'marginBottom') },
    input: { background: cs(input, 'backgroundColor'), color: cs(input, 'color'), border: cs(input, 'borderTopWidth') + ' ' + cs(input, 'borderTopColor'), height: cs(input, 'height'), padding: cs(input, 'padding'), borderRadius: cs(input, 'borderTopLeftRadius'), fontSize: cs(input, 'fontSize'), width: cs(input, 'width'), boxSizing: cs(input, 'boxSizing') },
    card: { background: cs(card, 'backgroundColor'), radius: cs(card, 'borderTopLeftRadius'), width: cs(card, 'width'), padding: cs(card, 'padding'), border: cs(card, 'borderTopWidth') + ' ' + cs(card, 'borderTopColor') },
    submitBtn: { background: cs(btn, 'backgroundColor'), color: cs(btn, 'color'), padding: cs(btn, 'padding'), height: cs(btn, 'height'), fontFamily: cs(btn, 'fontFamily'), borderRadius: cs(btn, 'borderTopLeftRadius') },
    h2: { fontSize: cs(h2, 'fontSize'), fontWeight: cs(h2, 'fontWeight'), color: cs(h2, 'color'), marginBottom: cs(h2, 'marginBottom') },
    bodyFont: cs(document.body, 'fontFamily'),
    bodyBg: cs(document.body, 'backgroundColor'),
    twLayerPresent: !!document.querySelector('.tw-layer'),
    buttonsCount: document.querySelectorAll('button').length,
    quickBtns: [...document.querySelectorAll('button')].slice(-2).map(b => b.textContent.trim()),
  }
})()`)

const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
fs.writeFileSync(outPng, Buffer.from(shot.data, 'base64'))

console.log(JSON.stringify({ url, results, netFails, consoleMsgs, styleProbe }, null, 2))

ws.close()
proc.kill()
await sleep(300)
try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }) } catch {}
process.exit(0)
