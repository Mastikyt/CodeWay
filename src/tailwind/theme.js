import { ref, watch } from 'vue'

const STORAGE_KEY = 'tw-theme'

function initialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const theme = ref(initialTheme())
export const isDark = ref(theme.value === 'dark')

function apply(value) {
  const root = document.documentElement
  root.classList.toggle('dark', value === 'dark')
  root.dataset.theme = value
  isDark.value = value === 'dark'
}

apply(theme.value)

watch(theme, (value) => {
  localStorage.setItem(STORAGE_KEY, value)
  apply(value)
})

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
