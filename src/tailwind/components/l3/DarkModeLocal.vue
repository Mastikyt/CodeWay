<template>
  <!--
    Локальная тёмная тема: класс dark ставим на контейнер, а не на <html>,
    поэтому переключатель не влияет на тему всего CodeWay.
  -->
  <div>
    <div
      class="rounded-2xl border transition-colors duration-300"
      :class="isDark
        ? 'dark border-slate-800 bg-slate-900'
        : 'border-line bg-gray-100'"
    >
      <section class="p-5 sm:p-7" aria-labelledby="dark-demo-title">
        <header class="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 id="dark-demo-title" class="text-xl font-bold text-gray-900 transition-colors duration-300 dark:text-slate-100">
              Панель управления
            </h3>
            <p class="text-sm text-gray-500 transition-colors duration-300 dark:text-slate-400">
              Сейчас тема: <strong class="text-gray-900 dark:text-white">{{ isDark ? 'тёмная' : 'светлая' }}</strong>
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/10" @click="isDark = !isDark">
              Перевернуть тему
            </button>
            <button
              type="button"
              role="switch"
              :aria-checked="isDark"
              aria-label="Тёмная тема"
              class="relative h-10 w-[72px] rounded-full p-1 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              :class="isDark ? 'bg-slate-700' : 'bg-gray-300'"
              @click="isDark = !isDark"
            >
              <span
                class="grid size-8 place-items-center rounded-full bg-white shadow transition-transform duration-300 ease-out"
                :class="isDark ? 'translate-x-8' : 'translate-x-0'"
                aria-hidden="true"
              >
                <svg v-if="!isDark" class="size-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round" /></svg>
                <svg v-else class="size-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
            </button>
          </div>
        </header>

        <div class="grid gap-3 sm:grid-cols-2">
          <article
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800"
          >
            <p class="text-xs font-semibold text-gray-500 uppercase dark:text-slate-400">{{ stat.label }}</p>
            <p class="mt-1 text-2xl font-extrabold text-gray-900 dark:text-slate-100">{{ stat.value }}</p>
            <p class="text-xs font-semibold" :class="stat.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
              {{ stat.up ? '▲' : '▼' }} {{ stat.delta }}
            </p>
          </article>
        </div>

        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
          <label for="dark-search" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">Поиск по студентам</label>
          <input
            id="dark-search"
            type="search"
            placeholder="Имя или email…"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 transition-colors duration-300 placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <div class="mt-3 flex flex-wrap gap-2">
            <button type="button" class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]">Применить</button>
            <button type="button" class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700">Сбросить</button>
          </div>
        </div>
      </section>
    </div>

    <p class="mt-3 text-xs text-ink-muted dark:text-slate-500">
      Приём: <code class="tw-code">@custom-variant dark (&amp;:where(.dark, .dark *))</code> — класс <code class="tw-code">.dark</code> на этом контейнере переключает только его содержимое.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)

const stats = [
  { label: 'Студенты', value: '2 418', delta: '12%', up: true },
  { label: 'Активные курсы', value: '18', delta: '2', up: true },
  { label: 'Отток', value: '3.2%', delta: '0.4%', up: false },
  { label: 'Средний балл', value: '8.7', delta: '0.3', up: true },
]
</script>
