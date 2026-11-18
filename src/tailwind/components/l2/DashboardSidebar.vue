<template>
  <!-- Демо-дашборд: сайдбар 256px fixed на lg+, на мобильных — off-canvas -->
  <div class="overflow-hidden rounded-2xl border border-line bg-canvas shadow-sm dark:border-white/10 dark:bg-slate-950">
    <!-- Backdrop -->
    <div
      v-if="open"
      class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
      aria-hidden="true"
      @click="open = false"
    />

    <div class="flex">
      <!-- Sidebar -->
      <aside
        id="demo-sidebar"
        class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-y-auto bg-surface p-4 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:h-[560px] lg:translate-x-0 lg:shadow-none dark:bg-slate-900"
        :class="open ? 'translate-x-0' : '-translate-x-full'"
        :aria-hidden="!open ? 'true' : undefined"
        aria-label="Боковая панель"
      >
        <div class="flex items-center justify-between">
          <p class="flex items-center gap-2 font-bold text-ink dark:text-white">
            <span class="grid size-8 place-items-center rounded-lg bg-brand-600 font-mono text-xs text-white">&lt;/&gt;</span>
            CodeWay
          </p>
          <button
            type="button"
            class="grid size-9 place-items-center rounded-lg text-ink-muted hover:bg-ink/5 lg:hidden dark:hover:bg-white/10"
            aria-label="Закрыть меню"
            @click="open = false"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" /></svg>
          </button>
        </div>

        <nav class="scrollbar-thin mt-6 flex-1 space-y-1 overflow-y-auto" aria-label="Разделы дашборда">
          <p class="px-3 pb-2 text-[11px] font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Обучение</p>
          <a
            v-for="item in nav"
            :key="item.label"
            href="#demo-sidebar"
            class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition duration-200"
            :class="item.active
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
              : 'text-ink-muted hover:bg-ink/5 hover:text-ink dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'"
            :aria-current="item.active ? 'page' : undefined"
            @click="setActive(item.label)"
          >
            <svg class="size-5 shrink-0 transition group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path :d="item.icon" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="flex-1">{{ item.label }}</span>
            <span v-if="item.badge" class="tw-badge bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">{{ item.badge }}</span>
          </a>

          <p class="px-3 pt-5 pb-2 text-[11px] font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Аккаунт</p>
          <a
            v-for="item in navSecondary"
            :key="item.label"
            href="#demo-sidebar"
            class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-ink/5 hover:text-ink dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <svg class="size-5 shrink-0 transition group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path :d="item.icon" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ item.label }}
          </a>
        </nav>

        <div class="mt-4 rounded-xl bg-gradient-to-br from-brand-600 to-violet-700 p-4 text-white">
          <p class="text-sm font-bold">Pro-доступ</p>
          <p class="mt-1 text-xs text-white/80">Осталось 18 из 30 дней</p>
          <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25">
            <div class="h-full w-3/5 rounded-full bg-white" />
          </div>
        </div>
      </aside>

      <!-- Контент -->
      <div class="flex min-w-0 flex-1 flex-col">
        <!-- Topbar -->
        <header class="flex items-center gap-3 border-b border-line bg-surface px-4 py-3 dark:border-white/10 dark:bg-slate-900">
          <button
            type="button"
            class="grid size-10 place-items-center rounded-lg border border-line text-ink lg:hidden dark:border-white/10 dark:text-white"
            aria-controls="demo-sidebar"
            :aria-expanded="open"
            aria-label="Открыть меню"
            @click="open = true"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" /></svg>
          </button>

          <label class="relative min-w-0 flex-1">
            <span class="sr-only">Поиск по дашборду</span>
            <svg class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" stroke-linecap="round" /></svg>
            <input type="search" placeholder="Поиск…" class="tw-input w-full rounded-full py-2 pl-9" />
          </label>

          <button type="button" class="relative grid size-10 shrink-0 place-items-center rounded-full text-ink-muted hover:bg-ink/5 dark:text-slate-400 dark:hover:bg-white/10" aria-label="Уведомления: 3 новых">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 ring-2 ring-surface dark:ring-slate-900" aria-hidden="true" />
          </button>

          <img
            src="https://ui-avatars.com/api/?name=Ivan+Petrov&size=80&background=0ea5e9&color=fff"
            alt="Иван Петров"
            width="36"
            height="36"
            class="size-9 shrink-0 rounded-full ring-2 ring-brand-100 dark:ring-brand-500/30"
          />
        </header>

        <!-- Контентная область -->
        <div class="scrollbar-thin grid flex-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 lg:h-[500px] lg:grid-cols-3">
          <article
            v-for="(card, i) in cards"
            :key="card.title"
            class="tw-card group p-5 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p class="text-xs font-semibold tracking-wide text-ink-muted uppercase dark:text-slate-500">{{ card.title }}</p>
            <p class="mt-2 text-2xl font-extrabold text-ink dark:text-white">{{ card.value }}</p>
            <p class="mt-1 flex items-center gap-1 text-xs font-semibold" :class="card.trend > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
              <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path :d="card.trend > 0 ? 'M7 17 17 7M9 7h8v8' : 'M7 7l10 10M17 9v8H9'" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ card.trend > 0 ? '+' : '' }}{{ card.trend }}% за неделю
            </p>
            <div class="mt-4 flex h-10 items-end gap-1" aria-hidden="true">
              <span
                v-for="(h, j) in card.bars"
                :key="j"
                class="flex-1 rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                :class="i % 3 === 0 ? 'bg-brand-400/70' : i % 3 === 1 ? 'bg-emerald-400/70' : 'bg-amber-400/70'"
                :style="{ height: `${h}%` }"
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)

const nav = ref([
  { label: 'Обзор', active: true, icon: 'M3 12h7V3H3zM14 21h7v-9h-7zM14 3h7v6h-7zM3 21h7v-6H3z' },
  { label: 'Мои курсы', active: false, icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14M8 7h8' },
  { label: 'Задания', active: false, badge: '7', icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2' },
  { label: 'Расписание', active: false, icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { label: 'Рейтинг', active: false, icon: 'M12 2 15.1 8.3l6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2l-5-4.9 6.9-1z' },
])

const navSecondary = [
  { label: 'Настройки', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6 1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.6.7 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' },
  { label: 'Помощь', icon: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4M12 17h.01' },
]

const cards = [
  { title: 'Пройдено уроков', value: '42 / 90', trend: 12, bars: [30, 45, 40, 60, 55, 75, 90] },
  { title: 'Домашние задания', value: '18 из 22', trend: 8, bars: [20, 35, 50, 45, 65, 70, 85] },
  { title: 'Средний балл', value: '8.7', trend: -3, bars: [80, 70, 75, 65, 70, 60, 62] },
  { title: 'Стрик', value: '14 дней', trend: 21, bars: [40, 50, 60, 70, 80, 85, 95] },
  { title: 'Место в группе', value: '3 / 24', trend: 5, bars: [95, 88, 84, 80, 78, 72, 70] },
  { title: 'Сертификаты', value: '2', trend: 0, bars: [10, 30, 30, 40, 40, 50, 50] },
]

function setActive(label) {
  nav.value.forEach((item) => (item.active = item.label === label))
}
</script>
