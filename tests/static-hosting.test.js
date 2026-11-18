import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('AdSlot supports both presets and compiles with an accessible label', () => {
  const path = new URL('../src/components/AdSlot.vue', import.meta.url)
  assert.ok(existsSync(path), 'AdSlot.vue must exist')
  const source = read('src/components/AdSlot.vue')
  const { descriptor, errors } = parse(source, { filename: 'AdSlot.vue' })
  assert.deepEqual(errors, [])
  assert.ok(descriptor.script || descriptor.scriptSetup, 'component script is required')
  assert.ok(descriptor.template, 'component template is required')
  const script = compileScript(descriptor, { id: 'ad-slot-test' })
  const template = compileTemplate({
    source: descriptor.template.content,
    filename: 'AdSlot.vue',
    id: 'ad-slot-test',
    compilerOptions: { bindingMetadata: script.bindings },
  })
  assert.deepEqual(template.errors, [])
  assert.match(source, /Рекламное место/)
  assert.match(source, /banner/)
  assert.match(source, /sidebar/)
  assert.match(source, /aria-label|role=/)
  assert.match(source, /border: 1px dashed/)
})

test('home page renders AdSlot after the hero and before the upload section', () => {
  const source = read('src/views/HomePage.vue')
  assert.match(source, /import AdSlot from ['"]\.\.\/components\/AdSlot\.vue['"]\s*\n/)
  assert.match(source, /components:\s*\{[^}]*\bAdSlot\b/s)
  const heroEnd = source.indexOf('<!-- Stats -->')
  const uploadStart = source.indexOf('id="upload"')
  const adSlotPosition = source.indexOf('<AdSlot size="banner" />')
  assert.ok(heroEnd !== -1 && adSlotPosition > heroEnd && adSlotPosition < uploadStart)
})

test('Cloudflare redirects preserve the two SPA entry points', () => {
  const path = new URL('../public/_redirects', import.meta.url)
  assert.ok(existsSync(path), 'public/_redirects must exist')
  const lines = read('public/_redirects').split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  assert.ok(lines.some((line) => /^\/tailwind\s+\/tailwind\.html\s+200$/.test(line)))
  assert.ok(lines.some((line) => /^\/tailwind\/\*\s+\/tailwind\.html\s+200$/.test(line)))
  assert.ok(lines.some((line) => /^\/\*\s+\/index\.html\s+200$/.test(line)))
  assert.ok(lines.indexOf('/tailwind /tailwind.html 200') < lines.indexOf('/* /index.html 200'))
})

test('hosting report covers the requested providers, comparison criteria, and sources', () => {
  const source = read('docs/hosting-platforms-comparison.md')
  for (const provider of ['Cloudflare Pages', 'GitHub Pages', 'Netlify', 'Vercel']) {
    assert.ok(source.includes(provider), `report must cover ${provider}`)
  }
  for (const criterion of ['трафик', 'сборк', 'реклам', 'домен', 'Git']) {
    assert.ok(source.toLowerCase().includes(criterion.toLowerCase()), `report must discuss ${criterion}`)
  }
  assert.match(source, /https:\/\/(?:developers\.cloudflare\.com|docs\.github\.com|docs\.netlify\.com|www\.netlify\.com|vercel\.com)/)
  assert.match(source, /политик|ограничен/i)
})
