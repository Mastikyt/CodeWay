<template>
  <div class="overflow-hidden rounded-2xl border border-line bg-canvas shadow-sm dark:border-white/10 dark:bg-slate-950">
    <div class="flex min-h-[640px]">
      <!-- Sidebar 256px -->
      <aside
        class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface p-4 transition-transform duration-300 ease-out lg:static lg:translate-x-0 lg:h-[680px] dark:border-white/10 dark:bg-slate-900"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        aria-label="Навигация панели"
      >
        <div class="flex items-center justify-between">
          <p class="flex items-center gap-2 font-bold text-ink dark:text-white">
            <span class="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 font-mono text-[10px] text-white">&lt;/&gt;</span>
            Analytics
          </p>
          <button type="button" class="grid size-8 place-items-center rounded-lg text-ink-muted lg:hidden dark:text-slate-400" aria-label="Закрыть меню" @click="sidebarOpen = false">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" /></svg>
          </button>
        </div>

        <nav class="scrollbar-thin mt-6 flex-1 space-y-1 overflow-y-auto" aria-label="Разделы аналитики">
          <a
            v-for="item in navItems"
            :key="item.label"
            href="#analytics-top"
            class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition"
            :class="item.active
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
              : 'text-ink-muted hover:bg-ink/5 hover:text-ink dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'"
            :aria-current="item.active ? 'page' : undefined"
            @click.prevent="active = item.label; sidebarOpen = false"
          >
            <span class="text-base" aria-hidden="true">{{ item.icon }}</span>
            <span class="truncate">{{ item.label }}</span>
          </a>
        </nav>

        <div class="mt-4 rounded-xl border border-line p-3 dark:border-white/10">
          <p class="text-xs font-semibold text-ink dark:text-white">Выручка месяца</p>
          <p class="mt-1 text-lg font-extrabold text-ink dark:text-white">42 870 BYN</p>
          <p class="text-[11px] text-emerald-600 dark:text-emerald-400">▲ 12.4% к сентябрю</p>
        </div>
      </aside>

      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
        @click="sidebarOpen = false"
      />

      <!-- Контент -->
      <div id="analytics-top" class="flex min-w-0 flex-1 flex-col">
        <!-- Topbar -->
        <header class="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2.5 sm:px-4 dark:border-white/10 dark:bg-slate-900">
          <button type="button" class="grid size-9 place-items-center rounded-lg border border-line lg:hidden dark:border-white/10" aria-label="Открыть меню" :aria-expanded="sidebarOpen" @click="sidebarOpen = true">
            <svg class="size-5 text-ink dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" /></svg>
          </button>

          <h2 class="mr-auto truncate text-sm font-bold text-ink sm:text-base dark:text-white">{{ active }}</h2>

          <label class="relative order-last w-full sm:order-none sm:w-56">
            <span class="sr-only">Поиск по транзакциям</span>
            <svg class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" stroke-linecap="round" /></svg>
            <input v-model="query" type="search" placeholder="Поиск…" class="tw-input py-1.5 pl-9 text-xs" />
          </label>

          <select v-model="period" class="tw-input w-auto py-1.5 text-xs" aria-label="Период">
            <option value="30">30 дней</option>
            <option value="90">90 дней</option>
            <option value="365">Год</option>
          </select>

          <img src="https://ui-avatars.com/api/?name=Admin&size=72&background=4f46e5&color=fff" alt="Администратор" width="32" height="32" class="size-8 rounded-full ring-2 ring-brand-100 dark:ring-brand-500/30" />
        </header>

        <div class="scrollbar-thin flex-1 overflow-y-auto p-3 sm:p-4 lg:h-[620px]">
          <!-- 4 stat-карточки: grid-cols-12 -->
          <div class="grid grid-cols-12 gap-3">
            <article
              v-for="(stat, i) in stats"
              :key="stat.label"
              class="group col-span-12 min-w-0 rounded-xl border border-line bg-surface p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:col-span-6 xl:col-span-3 dark:border-white/10 dark:bg-slate-900"
            >
              <div class="flex items-start justify-between gap-2">
                <p class="truncate text-xs font-semibold tracking-wide text-ink-muted uppercase dark:text-slate-500">{{ stat.label }}</p>
                <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 transition group-hover:scale-110 dark:bg-brand-500/15 dark:text-brand-300" aria-hidden="true">
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path :d="stat.icon" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </span>
              </div>
              <p class="mt-2 truncate text-2xl font-extrabold tracking-tight text-ink dark:text-white">{{ stat.value }}</p>
              <p class="mt-1 flex items-center gap-1 text-xs font-semibold" :class="stat.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <path :d="stat.trend >= 0 ? 'M7 17 17 7M9 7h8v8' : 'M7 7l10 10M17 9v8H9'" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                <span class="font-normal text-ink-muted dark:text-slate-500">к прошлому периоду</span>
              </p>
              <svg class="mt-3 h-8 w-full" :viewBox="`0 0 100 32`" preserveAspectRatio="none" aria-hidden="true">
                <polyline :points="spark(stat.series)" fill="none" :stroke="stat.trend >= 0 ? '#10b981' : '#f43f5e'" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round" />
              </svg>
            </article>
          </div>

          <!-- График-заглушка: grid + цветные ячейки -->
          <div class="mt-3 grid grid-cols-12 gap-3">
            <section class="col-span-12 min-w-0 rounded-xl border border-line bg-surface p-4 xl:col-span-8 dark:border-white/10 dark:bg-slate-900" aria-labelledby="chart-title">
              <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 id="chart-title" class="text-sm font-bold text-ink dark:text-white">Активность за {{ period }} дней</h3>
                <div class="flex gap-3 text-[11px] text-ink-muted dark:text-slate-400" role="list">
                  <span class="flex items-center gap-1"><span class="size-2 rounded-sm bg-brand-500" aria-hidden="true" />Просмотры</span>
                  <span class="flex items-center gap-1"><span class="size-2 rounded-sm bg-brand-200 dark:bg-brand-500/30" aria-hidden="true" />Регистрации</span>
                </div>
              </div>
              <div class="flex gap-2">
                <div class="flex h-36 flex-col justify-between text-[10px] text-ink-muted sm:h-44 dark:text-slate-500" aria-hidden="true">
                  <span>800</span><span>600</span><span>400</span><span>200</span><span>0</span>
                </div>
                <div class="grid h-36 flex-1 grid-cols-14 items-end gap-1 border-b border-l border-line pb-px sm:h-44 dark:border-white/10" role="img" aria-label="Столбчатая диаграмма активности">
                  <div v-for="(bar, i) in chart" :key="i" class="group flex h-full flex-col justify-end gap-0.5" :title="`День ${i + 1}: ${bar.a}`">
                    <span class="w-full rounded-t bg-brand-500/80 transition group-hover:bg-brand-500" :style="{ height: `${bar.a}%` }" />
                    <span class="w-full rounded-b bg-brand-200 transition group-hover:bg-brand-300 dark:bg-brand-500/30" :style="{ height: `${bar.b}%` }" />
                  </div>
                </div>
              </div>
              <div class="mt-1 ml-8 flex justify-between text-[10px] text-ink-muted dark:text-slate-500">
                <span>1 окт</span><span>8 окт</span><span>15 окт</span><span>22 окт</span><span>28 окт</span>
              </div>
            </section>

            <!-- Разбивка по курсам -->
            <section class="col-span-12 min-w-0 rounded-xl border border-line bg-surface p-4 xl:col-span-4 dark:border-white/10 dark:bg-slate-900" aria-labelledby="split-title">
              <h3 id="split-title" class="mb-4 text-sm font-bold text-ink dark:text-white">Доля курсов</h3>
              <ul class="space-y-3" role="list">
                <li v-for="course in share" :key="course.name">
                  <div class="mb-1 flex items-center justify-between gap-2 text-xs">
                    <span class="truncate font-medium text-ink dark:text-slate-200">{{ course.name }}</span>
                    <span class="shrink-0 font-semibold text-ink-muted dark:text-slate-400">{{ course.pct }}%</span>
                  </div>
                  <div class="h-2 overflow-hidden rounded-full bg-ink/5 dark:bg-white/10">
                    <div class="h-full rounded-full transition-all duration-700" :class="course.color" :style="{ width: `${course.pct}%` }" />
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <!-- Таблица транзакций -->
          <section class="mt-3 min-w-0 overflow-hidden rounded-xl border border-line bg-surface dark:border-white/10 dark:bg-slate-900" aria-labelledby="tx-title">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line p-4 dark:border-white/10">
              <h3 id="tx-title" class="text-sm font-bold text-ink dark:text-white">Последние транзакции</h3>
              <div class="flex items-center gap-2">
                <div class="flex rounded-lg bg-ink/5 p-0.5 dark:bg-white/5" role="group" aria-label="Фильтр по статусу">
                  <button
                    v-for="f in filters"
                    :key="f.value"
                    type="button"
                    class="rounded-md px-2.5 py-1 text-[11px] font-semibold transition"
                    :class="statusFilter === f.value ? 'bg-surface text-ink shadow-sm dark:bg-slate-700 dark:text-white' : 'text-ink-muted hover:text-ink dark:text-slate-400 dark:hover:text-white'"
                    :aria-pressed="statusFilter === f.value"
                    @click="statusFilter = f.value"
                  >
                    {{ f.label }}
                  </button>
                </div>
              </div>
            </div>

            <div class="scrollbar-thin overflow-x-auto">
              <table class="w-full min-w-[560px] text-left text-sm">
                <thead class="bg-surface-elevated text-[11px] font-semibold tracking-wide text-ink-muted uppercase dark:bg-slate-950/50 dark:text-slate-500">
                  <tr>
                    <th scope="col" class="px-4 py-2.5">ID</th>
                    <th scope="col" class="px-4 py-2.5">Покупатель</th>
                    <th scope="col" class="px-4 py-2.5">Курс</th>
                    <th scope="col" class="px-4 py-2.5 text-right">Сумма</th>
                    <th scope="col" class="px-4 py-2.5">Статус</th>
                    <th scope="col" class="px-4 py-2.5">Дата</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-line dark:divide-white/5">
                  <tr v-for="tx in filteredTx" :key="tx.id" class="group transition hover:bg-brand-50/50 dark:hover:bg-white/[0.03]">
                    <td class="px-4 py-2.5 font-mono text-xs text-ink-muted dark:text-slate-400">{{ tx.id }}</td>
                    <td class="max-w-[180px] truncate px-4 py-2.5 font-medium text-ink dark:text-slate-100">{{ tx.customer }}</td>
                    <td class="max-w-[140px] truncate px-4 py-2.5 text-ink-muted dark:text-slate-400">{{ tx.course }}</td>
                    <td class="px-4 py-2.5 text-right font-semibold text-ink tabular-nums dark:text-white">{{ tx.amount }} BYN</td>
                    <td class="px-4 py-2.5">
                      <span class="tw-badge ring-1" :class="statusStyles[tx.status].style">{{ statusStyles[tx.status].label }}</span>
                    </td>
                    <td class="px-4 py-2.5 whitespace-nowrap text-xs text-ink-muted dark:text-slate-500">{{ formatDate(tx.date) }}</td>
                  </tr>
                  <tr v-if="!filteredTx.length">
                    <td colspan="6" class="px-4 py-10 text-center text-sm text-ink-muted dark:text-slate-500">
                      Ничего не найдено — измените фильтр или запрос
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { transactions, statusStyles } from '../../data/transactions.js'

const sidebarOpen = ref(false)
const active = ref('Обзор')
const period = ref('30')
const query = ref('')
const statusFilter = ref('all')

const navItems = [
  { label: 'Обзор', icon: '📊', active: true },
  { label: 'Студенты', icon: '👥' },
  { label: 'Курсы', icon: '🎓' },
  { label: 'Платежи', icon: '💳' },
  { label: 'Отчёты', icon: '📑' },
  { label: 'Настройки', icon: '⚙️' },
]

const stats = [
  { label: 'Студенты', value: '2 418', trend: 12, icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM22 21v-2a4 4 0 0 0-3-3.9', series: [20, 35, 30, 50, 45, 65, 60, 80] },
  { label: 'Выручка', value: '42.9k BYN', trend: 8.4, icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', series: [30, 28, 40, 38, 55, 50, 70, 72] },
  { label: 'Конверсия', value: '6.8%', trend: -3.1, icon: 'M3 3v18h18M7 15l4-4 3 3 5-6', series: [70, 66, 60, 62, 50, 45, 42, 38] },
  { label: 'Ср. чек', value: '1 284 BYN', trend: 2.2, icon: 'M3 3h18v4H3zM3 10h18v11H3zM8 14h.01', series: [40, 42, 45, 43, 50, 48, 52, 55] },
]

const chart = Array.from({ length: 14 }, (_, i) => ({
  a: 30 + Math.round(45 * Math.abs(Math.sin(i * 1.1)) + (i % 3) * 8),
  b: 8 + ((i * 7) % 18),
}))

const share = [
  { name: 'Frontend Pro', pct: 42, color: 'bg-brand-500' },
  { name: 'Vue-разработчик', pct: 27, color: 'bg-violet-500' },
  { name: 'Вёрстка с нуля', pct: 18, color: 'bg-sky-500' },
  { name: 'Карьерный интенсив', pct: 13, color: 'bg-amber-500' },
]

const filters = [
  { value: 'all', label: 'Все' },
  { value: 'paid', label: 'Оплачено' },
  { value: 'pending', label: 'Ожидает' },
  { value: 'refunded', label: 'Возврат' },
  { value: 'failed', label: 'Ошибка' },
]

const filteredTx = computed(() => {
  const q = query.value.trim().toLowerCase()
  return transactions.filter((tx) => {
    const statusOk = statusFilter.value === 'all' || tx.status === statusFilter.value
    const queryOk = !q || tx.customer.toLowerCase().includes(q) || tx.course.toLowerCase().includes(q) || tx.id.toLowerCase().includes(q)
    return statusOk && queryOk
  })
})

function spark(series) {
  const max = Math.max(...series)
  return series
    .map((v, i) => `${(i / (series.length - 1)) * 100},${32 - (v / max) * 30}`)
    .join(' ')
}

function formatDate(iso) {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(new Date(iso))
}
</script>
