<template>
  <form
    class="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-lg dark:border-white/10 dark:bg-slate-900"
    novalidate
    :data-state="status"
    @submit.prevent="onSubmit"
  >
    <!-- Степпер -->
    <header class="border-b border-line bg-surface-elevated px-4 py-5 sm:px-8 dark:border-white/10 dark:bg-slate-950/40">
      <h3 class="sr-only">Оформление заявки на обучение</h3>
      <ol class="flex items-start justify-between gap-1" aria-label="Шаги формы">
        <li v-for="(s, i) in steps" :key="s.title" class="group relative flex flex-1 flex-col items-center text-center" :aria-current="i === step ? 'step' : undefined">
          <!-- линия между шагами -->
          <span v-if="i < steps.length - 1" class="absolute top-4 left-1/2 h-0.5 w-full bg-line dark:bg-white/10" aria-hidden="true">
            <span class="block h-full bg-brand-500 transition-all duration-500" :style="{ width: i < step ? '100%' : '0%' }" />
          </span>
          <span
            class="relative z-10 grid size-8 place-items-center rounded-full border-2 text-xs font-bold transition duration-300 sm:size-9 sm:text-sm"
            :class="i < step
              ? 'border-brand-600 bg-brand-600 text-white'
              : i === step
                ? 'border-brand-600 bg-surface text-brand-700 ring-4 ring-brand-500/15 dark:bg-slate-900 dark:text-brand-300'
                : 'border-line bg-surface text-ink-muted dark:border-white/10 dark:bg-slate-900 dark:text-slate-500'"
            :aria-hidden="true"
          >
            <svg v-if="i < step" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <template v-else>{{ i + 1 }}</template>
          </span>
          <span class="mt-1.5 hidden text-[11px] font-semibold sm:block" :class="i <= step ? 'text-ink dark:text-white' : 'text-ink-muted dark:text-slate-500'">{{ s.short }}</span>
        </li>
      </ol>
      <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-line dark:bg-white/10" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" :aria-valuetext="`Шаг ${step + 1} из ${steps.length}: ${steps[step].title}`">
        <div class="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-500 ease-out" :style="{ width: `${progress}%` }" />
      </div>
      <p class="mt-2 text-center text-xs text-ink-muted dark:text-slate-400">
        Шаг {{ step + 1 }} из {{ steps.length }} · <span class="font-semibold text-ink dark:text-slate-200">{{ steps[step].title }}</span>
      </p>
    </header>

    <div class="min-h-[320px] px-4 py-6 sm:px-8">
      <!-- Шаг 1: Личные данные -->
      <fieldset v-show="step === 0" class="space-y-4">
        <legend class="mb-4 text-lg font-bold text-ink dark:text-white">Личные данные</legend>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="ms-name" class="tw-label">Имя и фамилия <span class="text-rose-500" aria-hidden="true">*</span></label>
            <input id="ms-name" v-model.trim="form.name" type="text" required class="tw-input" :class="errors.name ? '!border-rose-500 !ring-4 !ring-rose-500/10' : touched.name && form.name ? '!border-emerald-500' : ''" :aria-invalid="!!errors.name" aria-describedby="ms-name-err" @blur="touch('name')" />
            <p id="ms-name-err" class="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400" :class="errors.name ? 'flex' : 'hidden'">{{ errors.name }}</p>
          </div>
          <div>
            <label for="ms-email" class="tw-label">Email <span class="text-rose-500" aria-hidden="true">*</span></label>
            <input id="ms-email" v-model.trim="form.email" type="email" required class="tw-input" :class="errors.email ? '!border-rose-500 !ring-4 !ring-rose-500/10' : touched.email && form.email ? '!border-emerald-500' : ''" :aria-invalid="!!errors.email" aria-describedby="ms-email-err" @blur="touch('email')" />
            <p id="ms-email-err" class="mt-1 text-xs text-rose-600 dark:text-rose-400" :class="errors.email ? 'block' : 'hidden'">{{ errors.email }}</p>
          </div>
        </div>

        <fieldset>
          <legend class="tw-label">Формат обучения</legend>
          <div class="grid gap-2 sm:grid-cols-2">
            <label
              v-for="opt in formats"
              :key="opt"
              class="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-3 text-sm transition has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:ring-2 has-[:checked]:ring-brand-500/25 has-[:focus-visible]:ring-4 dark:border-white/10 dark:has-[:checked]:bg-brand-500/10"
            >
              <input v-model="form.format" type="radio" name="format" :value="opt" class="size-4 accent-brand-600" />
              <span class="font-medium text-ink dark:text-slate-200">{{ opt }}</span>
            </label>
          </div>
        </fieldset>
      </fieldset>

      <!-- Шаг 2: Адрес -->
      <fieldset v-show="step === 1" class="space-y-4">
        <legend class="mb-4 text-lg font-bold text-ink dark:text-white">Адрес и контакты</legend>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label for="ms-street" class="tw-label">Улица, дом, квартира <span class="text-rose-500" aria-hidden="true">*</span></label>
            <input id="ms-street" v-model.trim="form.street" type="text" class="tw-input" :class="errors.street ? '!border-rose-500' : ''" :aria-invalid="!!errors.street" @blur="touch('street')" />
            <p v-if="errors.street" class="mt-1 text-xs text-rose-600 dark:text-rose-400">{{ errors.street }}</p>
          </div>
          <div>
            <label for="ms-city" class="tw-label">Город <span class="text-rose-500" aria-hidden="true">*</span></label>
            <input id="ms-city" v-model.trim="form.city" type="text" class="tw-input" :class="errors.city ? '!border-rose-500' : ''" :aria-invalid="!!errors.city" @blur="touch('city')" />
            <p v-if="errors.city" class="mt-1 text-xs text-rose-600 dark:text-rose-400">{{ errors.city }}</p>
          </div>
          <div>
            <label for="ms-zip" class="tw-label">Индекс</label>
            <input id="ms-zip" v-model.trim="form.zip" type="text" inputmode="numeric" maxlength="6" class="tw-input" placeholder="220000" />
          </div>
          <div class="sm:col-span-2">
            <label for="ms-phone" class="tw-label">Телефон <span class="text-rose-500" aria-hidden="true">*</span></label>
            <input id="ms-phone" v-model.trim="form.phone" type="tel" class="tw-input" placeholder="+375 (29) 000-00-00" :class="errors.phone ? '!border-rose-500' : ''" :aria-invalid="!!errors.phone" @blur="touch('phone')" />
            <p v-if="errors.phone" class="mt-1 text-xs text-rose-600 dark:text-rose-400">{{ errors.phone }}</p>
          </div>
        </div>
        <label class="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-3 text-sm transition has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 dark:border-white/10 dark:has-[:checked]:bg-brand-500/10">
          <input v-model="form.saveAddress" type="checkbox" class="size-4 accent-brand-600" />
          <span class="text-ink dark:text-slate-200">Запомнить адрес для следующих заказов</span>
        </label>
      </fieldset>

      <!-- Шаг 3: Оплата -->
      <fieldset v-show="step === 2" class="space-y-4">
        <legend class="mb-4 text-lg font-bold text-ink dark:text-white">Способ оплаты</legend>
        <div class="space-y-2">
          <label
            v-for="method in payMethods"
            :key="method.id"
            class="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3.5 transition has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:ring-2 has-[:checked]:ring-brand-500/25 dark:border-white/10 dark:has-[:checked]:bg-brand-500/10"
          >
            <input v-model="form.payMethod" type="radio" name="pay" :value="method.id" class="mt-0.5 size-4 accent-brand-600" />
            <span class="min-w-0 flex-1">
              <span class="flex items-center justify-between gap-2 text-sm font-semibold text-ink dark:text-slate-100">
                {{ method.label }}
                <span class="text-xs font-normal text-ink-muted dark:text-slate-400">{{ method.hint }}</span>
              </span>
              <span class="mt-0.5 block text-xs text-ink-muted dark:text-slate-400">{{ method.desc }}</span>
            </span>
          </label>
        </div>

        <div v-if="form.payMethod === 'card'" class="grid gap-4 rounded-xl bg-surface-elevated p-4 sm:grid-cols-2 dark:bg-slate-950/50">
          <div class="sm:col-span-2">
            <label for="ms-card" class="tw-label">Номер карты</label>
            <input id="ms-card" v-model.trim="form.card" type="text" inputmode="numeric" placeholder="0000 0000 0000 0000" class="tw-input font-mono" :class="errors.card ? '!border-rose-500' : ''" :aria-invalid="!!errors.card" @blur="touch('card')" />
            <p v-if="errors.card" class="mt-1 text-xs text-rose-600 dark:text-rose-400">{{ errors.card }}</p>
          </div>
          <div>
            <label for="ms-exp" class="tw-label">Срок действия</label>
            <input id="ms-exp" v-model.trim="form.exp" type="text" inputmode="numeric" placeholder="ММ/ГГ" maxlength="5" class="tw-input" />
          </div>
          <div>
            <label for="ms-cvc" class="tw-label">CVC</label>
            <input id="ms-cvc" v-model.trim="form.cvc" type="password" inputmode="numeric" maxlength="4" placeholder="•••" class="tw-input" />
          </div>
        </div>

        <div class="rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
          <p class="flex items-center justify-between text-sm text-ink dark:text-slate-200">
            <span>Тариф «Frontend Pro», {{ form.plan === 'year' ? '12 месяцев' : '1 месяц' }}</span>
            <strong class="text-base text-ink dark:text-white">{{ total }} BYN</strong>
          </p>
          <label class="mt-2 flex cursor-pointer items-center gap-2 text-xs text-ink-muted dark:text-slate-400">
            <input v-model="form.plan" type="checkbox" true-value="year" false-value="month" class="size-4 accent-brand-600" />
            Годовая оплата со скидкой 20%
          </label>
        </div>
      </fieldset>

      <!-- Шаг 4: Подтверждение -->
      <fieldset v-show="step === 3" class="space-y-4">
        <legend class="mb-4 text-lg font-bold text-ink dark:text-white">Проверьте данные</legend>
        <dl class="divide-y divide-line overflow-hidden rounded-xl border border-line text-sm dark:divide-white/10 dark:border-white/10">
          <div v-for="row in summary" :key="row.label" class="flex items-start justify-between gap-4 px-4 py-3">
            <dt class="text-ink-muted dark:text-slate-400">{{ row.label }}</dt>
            <dd class="max-w-[60%] truncate text-right font-medium text-ink dark:text-slate-100">{{ row.value || '—' }}</dd>
          </div>
        </dl>
        <label class="flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition" :class="form.agree ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10' : 'border-line dark:border-white/10'">
          <input v-model="form.agree" type="checkbox" class="mt-0.5 size-4 accent-emerald-600" />
          <span class="text-ink dark:text-slate-200">Подтверждаю корректность данных и согласен с условиями оферты</span>
        </label>

        <div v-if="status === 'success'" class="flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200" role="status">
          <svg class="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span>Заявка отправлена! Письмо с деталями придёт на <strong>{{ form.email }}</strong>.</span>
        </div>
        <div v-if="status === 'error'" class="flex items-center gap-3 rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200" role="alert">
          <svg class="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12h8" stroke-linecap="round" /></svg>
          <span>Сервис недоступен. Попробуйте ещё раз через минуту.</span>
          <button type="button" class="ml-auto text-xs font-bold underline" @click="submitForm">Повторить</button>
        </div>
      </fieldset>
    </div>

    <!-- Навигация -->
    <footer class="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface-elevated px-4 py-4 sm:px-8 dark:border-white/10 dark:bg-slate-950/40">
      <button type="button" class="tw-btn-secondary" :disabled="step === 0" @click="back">
        ← Назад
      </button>
      <div class="ml-auto flex items-center gap-2">
        <p class="mr-2 hidden text-xs text-ink-muted sm:block dark:text-slate-500" aria-live="polite">
          <span v-if="status === 'loading'">Отправляем…</span>
          <span v-else-if="status === 'success'">Готово</span>
        </p>
        <button v-if="step < steps.length - 1" type="button" class="tw-btn-primary" :disabled="!canNext" @click="next">
          Далее →
        </button>
        <button v-else type="submit" class="tw-btn-primary min-w-40" :class="status === 'success' ? '!bg-emerald-600' : ''" :disabled="!form.agree || status === 'loading' || status === 'success'">
          <svg v-if="status === 'loading'" class="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.3" stroke-width="3" /><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
          {{ status === 'loading' ? 'Отправка…' : status === 'success' ? 'Отправлено ✓' : 'Отправить заявку' }}
        </button>
      </div>
    </footer>
  </form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const steps = [
  { title: 'Личные данные', short: 'Данные', fields: ['name', 'email'] },
  { title: 'Адрес', short: 'Адрес', fields: ['street', 'city', 'phone'] },
  { title: 'Оплата', short: 'Оплата', fields: [] },
  { title: 'Подтверждение', short: 'Готово', fields: [] },
]

const formats = ['Онлайн в группе', 'Индивидуально']
const payMethods = [
  { id: 'card', label: 'Банковская карта', hint: 'Visa · Mastercard · БЕЛКАРТ', desc: 'Оплата спишется сразу после отправки' },
  { id: 'invoice', label: 'Счёт от компании', hint: 'Для юрлиц', desc: 'Счёт придёт на email в течение дня' },
  { id: 'installments', label: 'Рассрочка 12 месяцев', hint: '0%', desc: 'Без переплаты, одобрение онлайн' },
]

const form = reactive({
  name: '',
  email: '',
  format: 'Онлайн в группе',
  street: '',
  city: 'Минск',
  zip: '',
  phone: '',
  saveAddress: false,
  payMethod: 'card',
  card: '',
  exp: '',
  cvc: '',
  plan: 'month',
  agree: false,
})

const touched = reactive({})
const step = ref(0)
const status = ref('idle') // idle | loading | success | error

const errors = computed(() => {
  const e = {}
  if (touched.name && form.name.length < 2) e.name = 'Укажите имя и фамилию'
  if (touched.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Некорректный email'
  if (touched.street && form.street.length < 5) e.street = 'Укажите улицу и дом'
  if (touched.city && !form.city) e.city = 'Укажите город'
  if (touched.phone && !/^\+?[\d\s()-]{9,}$/.test(form.phone)) e.phone = 'Введите телефон'
  if (touched.card && form.payMethod === 'card' && form.card.replace(/\s/g, '').length < 16) e.card = 'Номер карты — 16 цифр'
  return e
})

const progress = computed(() => ((step.value + (status.value === 'success' ? 1 : 0.15)) / steps.length) * 100)
const total = computed(() => (form.plan === 'year' ? 1590 * 12 * 0.8 : 1590).toFixed(0))

const canNext = computed(() => {
  if (step.value === 0) return form.name.length >= 2 && /^\S+@\S+\.\S+$/.test(form.email)
  if (step.value === 1) return form.street.length >= 5 && !!form.city && !!form.phone
  if (step.value === 2) return form.payMethod !== 'card' || form.card.replace(/\s/g, '').length >= 16
  return form.agree
})

const summary = computed(() => [
  { label: 'Имя', value: form.name },
  { label: 'Email', value: form.email },
  { label: 'Формат', value: form.format },
  { label: 'Адрес', value: [form.city, form.street].filter(Boolean).join(', ') },
  { label: 'Телефон', value: form.phone },
  { label: 'Оплата', value: payMethods.find((m) => m.id === form.payMethod)?.label },
  { label: 'Сумма', value: `${total.value} BYN` },
])

function touch(field) {
  touched[field] = true
}

function next() {
  if (!canNext.value) {
    steps[step.value].fields.forEach((f) => (touched[f] = true))
    return
  }
  step.value = Math.min(step.value + 1, steps.length - 1)
}

function back() {
  step.value = Math.max(step.value - 1, 0)
}

function submitForm() {
  status.value = 'loading'
  setTimeout(() => {
    status.value = form.card === '0000' ? 'error' : 'success'
  }, 1400)
}

function onSubmit() {
  if (!canNext.value || status.value === 'success') return
  submitForm()
}
</script>
