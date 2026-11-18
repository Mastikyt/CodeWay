<template>
  <footer class="mt-20 border-t border-line bg-surface/60 dark:border-white/10 dark:bg-slate-950">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
      <div class="space-y-3">
        <p class="flex items-center gap-2 text-sm font-extrabold text-ink dark:text-white">
          <span class="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 font-mono text-xs text-white">&lt;/&gt;</span>
          CodeWay · Tailwind tasks
        </p>
        <p class="text-sm text-ink-muted dark:text-slate-400">
          Слой заданий на Tailwind CSS v4: 15 компонентов от начального до экспертного уровня, mobile-first.
        </p>
      </div>

      <nav aria-labelledby="tw-footer-levels">
        <h2 id="tw-footer-levels" class="mb-3 text-xs font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Уровни</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="l in levels" :key="l.to">
            <RouterLink :to="l.to" class="text-ink-muted transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300">
              {{ l.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="mb-3 text-xs font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Стек</h2>
        <ul class="space-y-2 text-sm text-ink-muted dark:text-slate-400">
          <li>Vue 3 + Vite</li>
          <li>Tailwind CSS 4.3</li>
          <li>CSS-first конфигурация</li>
          <li>Mobile-first 320 → 1920px</li>
          <li>
            <RouterLink to="/tasks" class="font-semibold text-brand-600 hover:underline dark:text-brand-400">
              Открыть те же задания на /tasks
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="mb-3 text-xs font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Проверить</h2>
        <ul class="space-y-2 text-sm">
          <li>
            <a
              href="https://play.tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
            >
              Tailwind Play
              <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </a>
          </li>
          <li>
            <a href="/" class="text-ink-muted transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300">← Вернуться в CodeWay</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-line px-4 py-5 text-center text-xs text-ink-muted sm:px-6 lg:px-8 dark:border-white/10 dark:text-slate-500">
      © {{ year }} CodeWay · Учебный проект по вёрстке с Tailwind CSS
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()

const levels = [
  { to: '/tailwind/level-1', label: 'Уровень 1 — Начальный' },
  { to: '/tailwind/level-2', label: 'Уровень 2 — Средний' },
  { to: '/tailwind/level-3', label: 'Уровень 3 — Продвинутый' },
  { to: '/tailwind/level-4', label: 'Уровень 4 — Экспертный' },
]
</script>
