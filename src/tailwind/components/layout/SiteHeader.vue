<template>
  <header class="sticky top-0 z-50 border-b border-line/80 bg-surface/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
    <nav class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" aria-label="Основная навигация">
      <RouterLink to="/tailwind" class="flex items-center gap-2.5" aria-label="CodeWay Tailwind — на главную">
        <span class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 font-mono text-sm font-bold text-white shadow-lg shadow-brand-500/30">
          &lt;/&gt;
        </span>
        <span class="leading-tight">
          <span class="block text-sm font-extrabold tracking-tight text-ink dark:text-white">CodeWay</span>
          <span class="block text-[10px] font-semibold tracking-[0.18em] text-brand-600 uppercase dark:text-brand-400">Tailwind tasks</span>
        </span>
      </RouterLink>

      <!-- Меню: на мобильных — горизонтальный скролл, на десктопе — по центру -->
      <ul class="scrollbar-none -mx-4 flex flex-1 items-center gap-1 overflow-x-auto px-4 md:mx-0 md:justify-center md:overflow-visible md:px-0">
        <li v-for="item in links" :key="item.to">
          <RouterLink
            :to="item.to"
            class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-ink-muted transition duration-200 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
            active-class="bg-brand-50 !text-brand-700 dark:bg-brand-500/15 dark:!text-brand-300"
            :aria-label="item.label"
          >
            {{ item.short }}
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <RouterLink to="/tasks" class="tw-btn-secondary hidden lg:inline-flex">Задания в CodeWay</RouterLink>
        <a href="/" class="tw-btn-ghost hidden xl:inline-flex">← CodeWay</a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'

const links = [
  { to: '/tailwind', short: 'Обзор', label: 'Обзор заданий' },
  { to: '/tailwind/level-1', short: 'Уровень 1', label: 'Уровень 1: Начальный' },
  { to: '/tailwind/level-2', short: 'Уровень 2', label: 'Уровень 2: Средний' },
  { to: '/tailwind/level-3', short: 'Уровень 3', label: 'Уровень 3: Продвинутый' },
  { to: '/tailwind/level-4', short: 'Уровень 4', label: 'Уровень 4: Экспертный' },
]
</script>
