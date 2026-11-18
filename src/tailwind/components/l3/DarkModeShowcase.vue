<template>
  <div class="rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 sm:p-6 dark:border-white/10 dark:bg-slate-900">
    <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 class="text-lg font-bold text-ink transition-colors duration-300 dark:text-white">Тема интерфейса</h3>
        <p class="text-xs text-ink-muted transition-colors duration-300 dark:text-slate-400">
          Сейчас — <strong class="text-ink dark:text-white">{{ isDark ? 'тёмная' : 'светлая' }}</strong>. Выбор сохраняется в localStorage.
        </p>
      </div>

      <!-- Переключатель-сегмент: peer-радио, без JS для визуала -->
      <div class="flex items-center gap-2">
        <span class="text-xs font-medium text-ink-muted dark:text-slate-500" aria-hidden="true">Тема:</span>
        <button
          type="button"
          role="switch"
          :aria-checked="isDark"
          aria-label="Тёмная тема"
          class="relative h-9 w-16 rounded-full border border-line bg-ink/5 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-white/10 dark:bg-white/10"
          @click="toggleTheme"
        >
          <span class="absolute inset-y-1 left-1 grid size-7 place-items-center rounded-full bg-surface shadow transition-transform duration-300 ease-out dark:translate-x-7 dark:bg-slate-700">
            <svg v-if="!isDark" class="size-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round" /></svg>
            <svg v-else class="size-4 text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </button>
        <button type="button" class="tw-btn-ghost px-2.5 py-1.5 text-xs" @click="resetToSystem">Как в системе</button>
      </div>
    </div>

    <!-- Палитра токенов в двух темах -->
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-line bg-canvas p-4 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950">
        <p class="text-xs font-semibold text-ink-muted dark:text-slate-400">Canvas</p>
        <p class="mt-1 font-mono text-xs text-ink dark:text-slate-200">{{ isDark ? 'slate-950' : 'canvas' }}</p>
        <div class="mt-3 h-2 rounded-full bg-ink/10 dark:bg-white/10" />
      </div>
      <div class="rounded-xl border border-line bg-surface p-4 transition-colors duration-300 dark:border-white/10 dark:bg-slate-900">
        <p class="text-xs font-semibold text-ink-muted dark:text-slate-400">Surface</p>
        <p class="mt-1 font-mono text-xs text-ink dark:text-slate-200">{{ isDark ? 'slate-900' : 'surface' }}</p>
        <div class="mt-3 h-2 rounded-full bg-ink/10 dark:bg-white/10" />
      </div>
      <div class="rounded-xl border border-line bg-surface p-4 transition-colors duration-300 dark:border-white/10 dark:bg-slate-900">
        <p class="text-xs font-semibold text-ink-muted dark:text-slate-400">Текст</p>
        <p class="mt-1 text-sm font-bold text-ink transition-colors dark:text-slate-100">Основной ink</p>
        <p class="text-xs text-ink-muted dark:text-slate-400">Вторичный текст</p>
      </div>
      <div class="rounded-xl border border-line bg-surface p-4 transition-colors duration-300 dark:border-white/10 dark:bg-slate-900">
        <p class="text-xs font-semibold text-ink-muted dark:text-slate-400">Акцент</p>
        <div class="mt-2 flex gap-1.5" aria-hidden="true">
          <span class="size-5 rounded-md bg-brand-500" />
          <span class="size-5 rounded-md bg-emerald-500" />
          <span class="size-5 rounded-md bg-amber-500" />
          <span class="size-5 rounded-md bg-rose-500" />
        </div>
        <p class="mt-1 font-mono text-xs text-ink-muted dark:text-slate-500">brand / success / warning / danger</p>
      </div>
    </div>

    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <article class="tw-card p-4">
        <p class="flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
          <span class="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
          Карточка в текущей теме
        </p>
        <p class="mt-1 text-sm text-ink-muted dark:text-slate-400">Границы, фон и текст автоматически переключаются через dark:*.</p>
        <div class="mt-3 flex gap-2">
          <button type="button" class="tw-btn-primary px-3 py-1.5 text-xs">Primary</button>
          <button type="button" class="tw-btn-secondary px-3 py-1.5 text-xs">Secondary</button>
        </div>
      </article>
      <div class="tw-input flex items-center gap-2">
        <svg class="size-4 text-ink-muted dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" stroke-linecap="round" /></svg>
        <input type="text" placeholder="Поле ввода в текущей теме" class="w-full bg-transparent text-sm outline-none" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { isDark, theme, toggleTheme } from '../../theme'

function resetToSystem() {
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  theme.value = system
}
</script>
