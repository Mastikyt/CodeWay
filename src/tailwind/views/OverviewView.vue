<template>
  <div>
    <!-- Hero обзора -->
    <section class="relative isolate overflow-hidden border-b border-line bg-surface dark:border-white/10 dark:bg-slate-950" aria-labelledby="overview-title">
      <div class="pointer-events-none absolute -top-32 -left-24 size-80 rounded-full bg-brand-400/20 blur-3xl" aria-hidden="true" />
      <div class="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-fuchsia-400/15 blur-3xl" aria-hidden="true" />
      <div class="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p class="tw-section-label">Tailwind CSS 4 · mobile-first · 320 → 1920px</p>
        <h1 id="overview-title" class="max-w-3xl text-3xl font-black tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl dark:text-white">
          15 заданий по вёрстке:
          <span class="text-gradient">от карточки до дизайн-системы</span>
        </h1>
        <p class="mt-4 max-w-2xl text-base text-ink-muted text-pretty sm:text-lg dark:text-slate-400">
          Отдельный слой CodeWay на чистом Tailwind, без Bootstrap. Каждое задание снабжено пояснением и списком приёмов, которые в нём используются.
        </p>

        <dl class="mt-9 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div v-for="stat in heroStats" :key="stat.label" class="rounded-xl border border-line bg-canvas p-3 dark:border-white/10 dark:bg-white/5">
            <dd class="text-xl font-extrabold text-ink sm:text-2xl dark:text-white">{{ stat.value }}</dd>
            <dt class="text-[11px] font-medium text-ink-muted dark:text-slate-400">{{ stat.label }}</dt>
          </div>
        </dl>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <RouterLink to="/tailwind/level-1" class="tw-btn-primary px-5 py-3">Начать с уровня 1 →</RouterLink>
          <a href="#criteria" class="tw-btn-secondary px-5 py-3">Критерии оценки</a>
        </div>
      </div>
    </section>

    <!-- Карта уровней -->
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="levels-title">
      <h2 id="levels-title" class="tw-section-title">Четыре уровня</h2>
      <p class="tw-section-lead">По 3–4 задания в каждом. Двигайтесь сверху вниз — задания опираются на предыдущие.</p>

      <ul class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" role="list">
        <li v-for="level in levels" :key="level.to">
          <RouterLink
            :to="level.to"
            class="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900 dark:hover:border-brand-500/40"
          >
            <div class="flex items-center justify-between">
              <span class="rounded-lg px-2 py-1 text-xs font-bold" :class="level.chip">{{ level.label }}</span>
              <svg class="size-5 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-brand-600 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </div>
            <h3 class="mt-3 text-lg font-bold text-ink dark:text-white">{{ level.title }}</h3>
            <p class="mt-1 flex-1 text-sm text-ink-muted dark:text-slate-400">{{ level.desc }}</p>
            <ul class="mt-4 space-y-1.5 border-t border-line pt-4 text-sm dark:border-white/10" role="list">
              <li v-for="task in level.tasks" :key="task" class="flex items-start gap-2 text-ink-muted dark:text-slate-300">
                <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                {{ task }}
              </li>
            </ul>
          </RouterLink>
        </li>
      </ul>
    </section>

    <!-- Технологии слоя -->
    <section class="border-y border-line bg-surface px-4 py-12 sm:px-6 sm:py-16 dark:border-white/10 dark:bg-slate-900/50 lg:px-8" aria-labelledby="stack-title">
      <div class="mx-auto max-w-7xl">
        <h2 id="stack-title" class="tw-section-title">Как это устроено</h2>
        <p class="tw-section-lead">Tailwind v4 — CSS-first: конфигурация живёт прямо в CSS, а не в JS-файле.</p>

        <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          <li v-for="item in stack" :key="item.title" class="tw-card p-5">
            <code class="tw-code">{{ item.token }}</code>
            <h3 class="mt-3 text-sm font-bold text-ink dark:text-white">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-ink-muted dark:text-slate-400">{{ item.text }}</p>
          </li>
        </ul>

        <div class="mt-6 overflow-x-auto rounded-xl border border-line bg-canvas p-4 dark:border-white/10 dark:bg-slate-950">
          <pre class="font-mono text-xs leading-relaxed text-ink dark:text-slate-300"><code>/* src/tailwind/tailwind.css */
@import 'tailwindcss';
@custom-variant dark (&:where(.dark, .dark *));   /* аналог darkMode: 'class' */

@theme {                                          /* дизайн-токены */
  --color-brand-500: #6366f1;
  --color-ink: #1d2433;
  --animate-in: fade-up .7s cubic-bezier(.16,1,.3,1) both;
}

@utility scrollbar-thin { /* «плагин»: кастомная утилита */ }

@layer components {
  .tw-btn-primary { @apply bg-brand-600 text-white hover:bg-brand-700; }
}</code></pre>
        </div>
      </div>
    </section>

    <!-- Критерии оценки -->
    <section id="criteria" class="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="criteria-title">
      <h2 id="criteria-title" class="tw-section-title">Критерии оценки</h2>
      <p class="tw-section-lead">Чек-лист, по которому проверяется каждое задание.</p>

      <ul class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
        <li v-for="c in criteria" :key="c.title" class="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 dark:border-white/10 dark:bg-slate-900">
          <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400" aria-hidden="true">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <div>
            <h3 class="text-sm font-bold text-ink dark:text-white">{{ c.title }}</h3>
            <p class="mt-0.5 text-xs text-ink-muted dark:text-slate-400">{{ c.text }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
const heroStats = [
  { value: '15', label: 'заданий' },
  { value: '4', label: 'уровня' },
  { value: '320–1920', label: 'px адаптив' },
  { value: '0', label: 'зависимостей UI' },
]

const levels = [
  {
    to: '/tailwind/level-1',
    label: 'Уровень 1',
    title: 'Начальный',
    chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    desc: 'Базовые блоки и адаптивные сетки.',
    tasks: ['1.1 Карточка профиля', '1.2 Навбар с бургером без JS', '1.3 Сетка товаров 1→2→4'],
  },
  {
    to: '/tailwind/level-2',
    label: 'Уровень 2',
    title: 'Средний',
    chip: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
    desc: 'Лендинг, тарифы, дашборд и формы.',
    tasks: ['2.1 Hero с градиентом', '2.2 Pricing-таблица', '2.3 Sidebar + контент', '2.4 Форма регистрации'],
  },
  {
    to: '/tailwind/level-3',
    label: 'Уровень 3',
    title: 'Продвинутый',
    chip: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    desc: 'Сложные интерфейсы и тёмная тема.',
    tasks: ['3.1 Мессенджер', '3.2 Kanban-доска', '3.3 Комплексный лендинг', '3.4 Dark mode'],
  },
  {
    to: '/tailwind/level-4',
    label: 'Уровень 4',
    title: 'Экспертный',
    chip: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
    desc: 'Дашборды, формы и дизайн-система.',
    tasks: ['4.1 Дашборд аналитики', '4.2 Многошаговая форма', '4.3 Каталог с фильтрами', '4.4 Дизайн-система'],
  },
]

const stack = [
  { token: '@theme', title: 'Дизайн-токены', text: 'Цвета бренда и семантика, шрифты, анимации — как CSS-переменные.' },
  { token: '@custom-variant', title: 'Тёмная тема', text: 'Аналог darkMode: "class" — переключение классом .dark на <html>.' },
  { token: '@utility', title: 'Свои утилиты', text: 'scrollbar-thin, text-gradient, text-balance — вместо плагина.' },
  { token: '@layer components', title: 'Компоненты', text: 'Кнопки, инпуты, карточки через @apply без дублирования.' },
]

const criteria = [
  { title: 'Адаптивность', text: 'Корректно от 320px до 1920px+: контейнеры, сетки, переносы.' },
  { title: 'Семантика', text: 'header, nav, main, section, article, fieldset, table.' },
  { title: 'Доступность', text: 'aria-*, focus-visible, контраст, sr-only подписи, роли.' },
  { title: 'Чистота классов', text: 'Нет дублирования, повторяемое вынесено в @apply.' },
  { title: 'Состояния', text: 'hover, focus, active, disabled, loading, empty.' },
  { title: 'Анимации', text: 'Плавные transition с duration и ease, respects reduced-motion.' },
]
</script>
