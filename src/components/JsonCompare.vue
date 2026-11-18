<!-- Компонент сравнения JSON (Задание 2) -->
<template>
  <div class="json-compare">
    <div>
      <h6 style="color: var(--text-muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
        До изменения
      </h6>
      <pre ref="oldPre"><code v-html="renderJson(oldData, newData, 'old')"></code></pre>
    </div>
    <div>
      <h6 style="color: var(--text-muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
        После изменения
      </h6>
      <pre ref="newPre"><code v-html="renderJson(newData, oldData, 'new')"></code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonCompare',
  props: {
    oldData: {
      type: Object,
      default: () => ({}),
    },
    newData: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    renderJson(data, compareData, side) {
      if (!data) return '<span style="color: var(--text-muted);">null</span>'

      const lines = []
      const allKeys = new Set([
        ...Object.keys(data || {}),
        ...Object.keys(compareData || {}),
      ])

      lines.push('{')
      const keyArr = [...allKeys]
      keyArr.forEach((key, i) => {
        const val = data?.[key]
        const compareVal = compareData?.[key]
        const comma = i < keyArr.length - 1 ? ',' : ''
        let className = ''
        let prefix = '  '

        if (side === 'old' && val !== undefined && compareVal === undefined) {
          className = 'removed'
          prefix = '- '
        } else if (side === 'new' && val !== undefined && compareVal === undefined) {
          className = 'added'
          prefix = '+ '
        } else if (val !== undefined && compareVal !== undefined && JSON.stringify(val) !== JSON.stringify(compareVal)) {
          className = 'changed'
          prefix = '~ '
        }

        const valStr = typeof val === 'string' ? `"${this.escapeHtml(val)}"` : JSON.stringify(val)

        if (val !== undefined) {
          lines.push(
            `<span class="${className}">${prefix}"<span style="color: var(--accent-cyan);">${this.escapeHtml(key)}</span>": ${valStr}${comma}</span>`
          )
        } else if (side === 'old') {
          // Key was added in new version
          lines.push(
            `<span class="removed">- "<span style="color: var(--accent-cyan);">${this.escapeHtml(key)}</span>": undefined${comma}</span>`
          )
        }
      })
      lines.push('}')

      return lines.join('\n')
    },
    escapeHtml(str) {
      const div = document.createElement('div')
      div.textContent = str
      return div.innerHTML
    },
  },
}
</script>
