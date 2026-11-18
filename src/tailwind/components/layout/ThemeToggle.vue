<template>
  <button
    type="button"
    class="group relative inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-ink-muted transition duration-300 hover:border-brand-300 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-400/60 dark:hover:text-white"
    :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
    :aria-pressed="isDark"
    title="Переключить тему"
    @click="toggleTheme"
  >
    <!-- Солнце -->
    <svg
      class="size-5 transition duration-500 ease-out"
      :class="isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <!-- Луна -->
    <svg
      class="absolute size-5 transition duration-500 ease-out"
      :class="isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  </button>
</template>

<script setup>
import { isDark, toggleTheme } from '../../theme'
</script>
