<template>
  <div class="overflow-hidden rounded-2xl border border-line bg-surface dark:border-white/10 dark:bg-slate-900">
    <!-- «Storybook»: сайдбар разделов + холст истории -->
    <div class="flex min-h-[560px] flex-col lg:flex-row">
      <nav class="shrink-0 border-b border-line p-3 lg:w-56 lg:border-r lg:border-b-0 dark:border-white/10" aria-label="Разделы дизайн-системы">
        <p class="px-2 pb-2 text-[11px] font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Design System</p>
        <ul class="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible" role="list">
          <li v-for="s in sections" :key="s.id">
            <button
              type="button"
              class="w-full rounded-lg px-2.5 py-1.5 text-left text-sm font-medium whitespace-nowrap transition"
              :class="active === s.id
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                : 'text-ink-muted hover:bg-ink/5 hover:text-ink dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'"
              :aria-current="active === s.id ? 'true' : undefined"
              @click="active = s.id"
            >
              {{ s.label }}
            </button>
          </li>
        </ul>

        <div class="mt-4 hidden rounded-lg bg-surface-elevated p-3 text-[11px] leading-relaxed text-ink-muted lg:block dark:bg-slate-950/50 dark:text-slate-500">
          Токены — в <code class="tw-code">@theme</code>, компоненты — в <code class="tw-code">@layer components</code>, утилиты — в <code class="tw-code">@utility</code>.
        </div>
      </nav>

      <div class="min-w-0 flex-1">
        <!-- Цвета -->
        <section v-show="active === 'colors'" class="p-4 sm:p-6" aria-labelledby="ds-colors">
          <h3 id="ds-colors" class="text-base font-bold text-ink dark:text-white">Цвета</h3>
          <p class="mt-1 text-xs text-ink-muted dark:text-slate-400">Бренд и семантика. Каждый токен доступен как утилита: bg-, text-, border-, ring-.</p>

          <div class="mt-5">
            <p class="mb-2 text-[11px] font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Brand</p>
            <div class="grid grid-cols-5 gap-2 sm:grid-cols-10">
              <div v-for="step in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" :key="step">
                <div class="h-14 rounded-lg" :style="{ background: `var(--color-brand-${step})` }" />
                <p class="mt-1 text-center font-mono text-[10px] text-ink-muted dark:text-slate-500">{{ step }}</p>
              </div>
            </div>
          </div>

          <div class="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="c in semantic" :key="c.name" class="rounded-lg border border-line p-3 dark:border-white/10">
              <div class="h-8 rounded-md" :class="c.bg" />
              <p class="mt-2 text-xs font-semibold text-ink dark:text-white">{{ c.name }}</p>
              <p class="font-mono text-[10px] text-ink-muted dark:text-slate-500">{{ c.token }}</p>
            </div>
          </div>
        </section>

        <!-- Типографика -->
        <section v-show="active === 'type'" class="p-4 sm:p-6" aria-labelledby="ds-type">
          <h3 id="ds-type" class="text-base font-bold text-ink dark:text-white">Типографика</h3>
          <div class="mt-5 space-y-5 divide-y divide-line dark:divide-white/10">
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <p class="text-4xl font-black tracking-tight text-ink dark:text-white">Заголовок h1</p>
              <p class="font-mono text-[11px] text-ink-muted dark:text-slate-500">.tw-h1 · text-4xl font-black</p>
            </div>
            <div class="flex flex-wrap items-baseline justify-between gap-2 pt-5">
              <p class="pt-0 text-2xl font-bold tracking-tight text-ink dark:text-white">Заголовок h2 — секция</p>
              <p class="font-mono text-[11px] text-ink-muted dark:text-slate-500">.tw-h2 · text-2xl font-bold</p>
            </div>
            <div class="flex flex-wrap items-baseline justify-between gap-2 pt-5">
              <p class="text-base text-ink dark:text-slate-200">Основной текст. Минимальный межстрочный интервал — leading-relaxed, длина строки — не более 75 символов.</p>
              <p class="font-mono text-[11px] text-ink-muted dark:text-slate-500">.tw-body · text-base</p>
            </div>
            <div class="flex flex-wrap items-baseline justify-between gap-2 pt-5">
              <p class="text-xs font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Подпись / надзаголовок</p>
              <p class="font-mono text-[11px] text-ink-muted dark:text-slate-500">.tw-overline · text-xs uppercase</p>
            </div>
            <div class="flex flex-wrap items-baseline justify-between gap-2 pt-5">
              <p class="font-mono text-sm text-brand-700 dark:text-brand-300">const tw = 'mono'</p>
              <p class="font-mono text-[11px] text-ink-muted dark:text-slate-500">.tw-code · font-mono</p>
            </div>
          </div>
        </section>

        <!-- Кнопки -->
        <section v-show="active === 'buttons'" class="p-4 sm:p-6" aria-labelledby="ds-buttons">
          <h3 id="ds-buttons" class="text-base font-bold text-ink dark:text-white">Кнопки</h3>
          <p class="mt-1 text-xs text-ink-muted dark:text-slate-400">4 варианта × 3 размера · hover / active / focus-visible / disabled / loading.</p>

          <div class="mt-5 overflow-x-auto">
            <table class="w-full min-w-[520px] text-left text-sm">
              <thead class="text-[11px] font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">
                <tr><th class="py-2">Вариант</th><th class="py-2">sm</th><th class="py-2">md</th><th class="py-2">lg</th><th class="py-2">disabled</th></tr>
              </thead>
              <tbody class="divide-y divide-line dark:divide-white/10">
                <tr v-for="v in ['primary', 'secondary', 'ghost', 'danger']" :key="v">
                  <td class="py-3 font-mono text-xs text-ink dark:text-slate-200">tw-btn-{{ v }}</td>
                  <td class="py-3"><button type="button" class="tw-btn" :class="`tw-btn-${v} px-2.5 py-1.5 text-xs`">Button</button></td>
                  <td class="py-3"><button type="button" class="tw-btn" :class="`tw-btn-${v}`">Button</button></td>
                  <td class="py-3"><button type="button" class="tw-btn" :class="`tw-btn-${v} px-5 py-3 text-base`">Button</button></td>
                  <td class="py-3"><button type="button" class="tw-btn" :class="`tw-btn-${v}`" disabled>Button</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" class="tw-btn-primary" :disabled="busy" @click="simulate">
              <svg v-if="busy" class="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.3" stroke-width="3" /><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
              {{ busy ? 'Загрузка…' : 'Loading-состояние' }}
            </button>
            <div class="flex -space-x-3" aria-label="Аватары группы">
              <img v-for="n in ['AK', 'DO', 'MS']" :key="n" :src="`https://ui-avatars.com/api/?name=${n}&background=6366f1&color=fff&size=48`" :alt="n" width="32" height="32" class="size-8 rounded-full ring-2 ring-surface dark:ring-slate-900" />
            </div>
          </div>
        </section>

        <!-- Формы -->
        <section v-show="active === 'forms'" class="p-4 sm:p-6" aria-labelledby="ds-forms">
          <h3 id="ds-forms" class="text-base font-bold text-ink dark:text-white">Инпуты, чекбоксы, toggle</h3>
          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <div class="space-y-4">
              <div>
                <label for="ds-email" class="tw-label">Email</label>
                <input id="ds-email" type="email" placeholder="you@example.com" class="tw-input" />
              </div>
              <div>
                <label for="ds-error" class="tw-label">С ошибкой</label>
                <input id="ds-error" type="text" value="неверный email" class="tw-input border-rose-500 ring-4 ring-rose-500/10" aria-invalid="true" aria-describedby="ds-error-msg" />
                <p id="ds-error-msg" class="mt-1 text-xs text-rose-600 dark:text-rose-400">Проверьте формат адреса</p>
              </div>
              <div>
                <label for="ds-disabled" class="tw-label">Disabled</label>
                <input id="ds-disabled" type="text" value="Недоступно" class="tw-input" disabled />
              </div>
            </div>

            <div class="space-y-4">
              <label class="flex cursor-pointer items-center gap-3 text-sm text-ink dark:text-slate-200">
                <input type="checkbox" checked class="size-4 rounded accent-brand-600" />
                Чекбокс: выбран
              </label>
              <label class="flex cursor-pointer items-center gap-3 text-sm text-ink dark:text-slate-200">
                <input type="checkbox" class="size-4 rounded accent-brand-600" />
                Чекбокс: не выбран
              </label>

              <!-- Toggle: checkbox + peer -->
              <div class="flex items-center justify-between gap-3 rounded-lg border border-line p-3 dark:border-white/10">
                <span class="text-sm text-ink dark:text-slate-200">Уведомления на почту</span>
                <label class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" class="peer sr-only" />
                  <span class="h-6 w-11 rounded-full bg-ink/15 transition peer-checked:bg-brand-600 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/25 dark:bg-white/15" />
                  <span class="absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
                </label>
              </div>

              <div>
                <label for="ds-select" class="tw-label">Селект</label>
                <select id="ds-select" class="tw-input">
                  <option>Базовый</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <!-- Badge / Alert / Card / Modal -->
        <section v-show="active === 'feedback'" class="p-4 sm:p-6" aria-labelledby="ds-feedback">
          <h3 id="ds-feedback" class="text-base font-bold text-ink dark:text-white">Badge · Alert · Card · Modal</h3>

          <div class="mt-5">
            <p class="mb-2 text-[11px] font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Badges</p>
            <div class="flex flex-wrap gap-2">
              <span class="tw-badge ring-1 ring-brand-200 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">Brand</span>
              <span class="tw-badge ring-1 ring-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30">Успех</span>
              <span class="tw-badge ring-1 ring-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30">Внимание</span>
              <span class="tw-badge ring-1 ring-rose-200 bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-500/30">Ошибка</span>
              <span class="tw-badge bg-ink/5 text-ink-muted dark:bg-white/10 dark:text-slate-300">Нейтральный</span>
            </div>
          </div>

          <div class="mt-5 space-y-2">
            <p class="mb-2 text-[11px] font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Alerts</p>
            <div v-for="a in alerts" :key="a.title" class="flex items-start gap-3 rounded-xl border p-3.5 text-sm" :class="a.style" role="status">
              <span class="mt-0.5 shrink-0" aria-hidden="true">
                <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path :d="a.icon" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
              <div>
                <p class="font-semibold">{{ a.title }}</p>
                <p class="text-xs opacity-80">{{ a.text }}</p>
              </div>
            </div>
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <article class="tw-card p-4">
              <h4 class="text-sm font-bold text-ink dark:text-white">Card</h4>
              <p class="mt-1 text-xs text-ink-muted dark:text-slate-400">Поверхность с рамкой, тенью и радиусом 16px.</p>
              <button type="button" class="tw-btn-secondary mt-3 px-3 py-1.5 text-xs">Действие</button>
            </article>
            <div class="grid place-items-center rounded-xl border-2 border-dashed border-line p-4 text-center dark:border-white/10">
              <p class="text-xs text-ink-muted dark:text-slate-400">Modal открывается кнопкой</p>
              <button type="button" class="tw-btn-primary mt-2 px-3 py-1.5 text-xs" @click="modalOpen = true">Открыть Modal</button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0"
        appear
      >
        <div v-if="modalOpen" class="fixed inset-0 z-[70] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="ds-modal-title" @click.self="modalOpen = false">
          <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="modalOpen = false" />
          <div class="relative w-full max-w-md scale-100 rounded-2xl border border-line bg-surface p-6 shadow-2xl transition dark:border-white/10 dark:bg-slate-900">
            <div class="flex items-start justify-between gap-4">
              <h4 id="ds-modal-title" class="text-lg font-bold text-ink dark:text-white">Удалить курс?</h4>
              <button type="button" class="rounded-lg p-1.5 text-ink-muted hover:bg-ink/5 dark:text-slate-400 dark:hover:bg-white/10" aria-label="Закрыть" @click="modalOpen = false">
                <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" /></svg>
              </button>
            </div>
            <p class="mt-2 text-sm text-ink-muted dark:text-slate-400">Действие необратимо. Все прогресс и записи на курс будут удалены.</p>
            <div class="mt-6 flex justify-end gap-2">
              <button type="button" class="tw-btn-secondary" @click="modalOpen = false">Отмена</button>
              <button type="button" class="tw-btn-danger" @click="modalOpen = false">Удалить</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sections = [
  { id: 'colors', label: 'Цвета' },
  { id: 'type', label: 'Типографика' },
  { id: 'buttons', label: 'Кнопки' },
  { id: 'forms', label: 'Формы' },
  { id: 'feedback', label: 'Badge / Alert / Card / Modal' },
]
const active = ref('colors')
const busy = ref(false)
const modalOpen = ref(false)

const semantic = [
  { name: 'Surface', token: '--color-surface', bg: 'bg-surface border border-line' },
  { name: 'Canvas', token: '--color-canvas', bg: 'bg-canvas border border-line' },
  { name: 'Success', token: '--color-success', bg: 'bg-success' },
  { name: 'Warning', token: '--color-warning', bg: 'bg-warning' },
  { name: 'Danger', token: '--color-danger', bg: 'bg-danger' },
  { name: 'Info', token: '--color-info', bg: 'bg-info' },
  { name: 'Ink', token: '--color-ink', bg: 'bg-ink' },
  { name: 'Ink muted', token: '--color-ink-muted', bg: 'bg-ink-muted' },
]

const alerts = [
  { title: 'Успех', text: 'Изменения сохранены', icon: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12l3 3 5-6', style: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200' },
  { title: 'Внимание', text: 'Срок действия тарифа истекает через 3 дня', icon: 'M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z', style: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200' },
  { title: 'Ошибка', text: 'Не удалось отправить форму', icon: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM15 9l-6 6m0-6 6 6', style: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200' },
]

function simulate() {
  busy.value = true
  setTimeout(() => (busy.value = false), 1400)
}
</script>
