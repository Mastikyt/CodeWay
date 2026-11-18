<template>
  <form
    class="mx-auto w-full max-w-md space-y-5 rounded-2xl border border-line bg-surface p-6 shadow-lg sm:p-8 dark:border-white/10 dark:bg-slate-900"
    novalidate
    @submit.prevent="submit"
  >
    <header>
      <h3 class="text-xl font-bold tracking-tight text-ink dark:text-white">Создать аккаунт</h3>
      <p class="mt-1 text-sm text-ink-muted dark:text-slate-400">Бесплатный доступ к первым трём урокам.</p>
    </header>

    <!-- Email: валидация целиком на peer-invalid -->
    <div>
      <label for="reg-email" class="tw-label">Email</label>
      <div class="relative">
        <input
          id="reg-email"
          v-model.trim="email"
          type="email"
          required
          autocomplete="email"
          inputmode="email"
          placeholder="you@example.com"
          aria-describedby="reg-email-hint"
          class="peer tw-input pr-10 hover:peer-invalid:border-red-400 peer-invalid:border-red-500 peer-invalid:ring-4 peer-invalid:ring-red-500/10"
        />
        <svg class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-red-500 opacity-0 transition peer-invalid:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5m0 3h.01" stroke-linecap="round" /></svg>
      </div>
      <p id="reg-email-hint" class="mt-1.5 text-xs text-ink-muted dark:text-slate-500">Мы отправим письмо для подтверждения.</p>
    </div>

    <!-- Пароль + индикатор силы -->
    <div>
      <label for="reg-password" class="tw-label">Пароль</label>
      <div class="relative">
        <input
          id="reg-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          required
          minlength="8"
          autocomplete="new-password"
          placeholder="Минимум 8 символов"
          aria-describedby="reg-password-strength"
          class="peer tw-input pr-12 peer-invalid:border-red-500 peer-invalid:ring-4 peer-invalid:ring-red-500/10"
          @focus="passwordTouched = true"
        />
        <button
          type="button"
          class="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-ink-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10 dark:hover:text-white"
          :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
          :aria-pressed="showPassword"
          @click="showPassword = !showPassword"
        >
          <svg v-if="!showPassword" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
          <svg v-else class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.1 6.1A17.5 17.5 0 0 0 2 12s3.5 7 10 7a10.4 10.4 0 0 0 4.4-1" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
      </div>

      <!-- Индикатор силы: полоски -->
      <div id="reg-password-strength" class="mt-2.5 flex gap-1.5" role="meter" aria-valuemin="0" aria-valuemax="4" :aria-valuenow="strength" :aria-valuetext="strengthLabel">
        <span v-for="i in 4" :key="i" class="h-1.5 flex-1 rounded-full transition-colors duration-300" :class="i <= strength ? strengthColor : 'bg-line dark:bg-white/10'" />
      </div>
      <div class="mt-1.5 flex items-center justify-between gap-2 text-xs">
        <p class="text-ink-muted dark:text-slate-500" aria-live="polite">
          <span v-if="!password">Используйте 8+ символов</span>
          <span v-else :class="strength >= 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-ink-muted dark:text-slate-400'">Надёжность: {{ strengthLabel }}</span>
        </p>
        <ul class="flex gap-2 text-[11px] text-ink-muted dark:text-slate-500" aria-hidden="true">
          <li :class="{ 'text-emerald-600 dark:text-emerald-400': rules.length }">A-Z</li>
          <li :class="{ 'text-emerald-600 dark:text-emerald-400': rules.digit }">0-9</li>
          <li :class="{ 'text-emerald-600 dark:text-emerald-400': rules.symbol }">#!</li>
        </ul>
      </div>
    </div>

    <!-- Подтверждение пароля -->
    <div>
      <label for="reg-confirm" class="tw-label">Повторите пароль</label>
      <input
        id="reg-confirm"
        v-model="confirm"
        :type="showPassword ? 'text' : 'password'"
        required
        autocomplete="new-password"
        placeholder="Ещё раз"
        :aria-invalid="confirm.length > 0 && !passwordsMatch"
        class="tw-input peer peer-invalid:border-red-500 peer-invalid:ring-4 peer-invalid:ring-red-500/10"
        :class="confirm.length > 0 && !passwordsMatch ? '!border-red-500 !ring-4 !ring-red-500/10' : ''"
        @focus="confirmTouched = true"
      />
      <p v-if="confirmTouched && confirm.length > 0 && !passwordsMatch" class="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400" role="alert">
        <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5m0 3h.01" stroke-linecap="round" /></svg>
        Пароли не совпадают
      </p>
      <p v-else-if="confirm.length > 0 && passwordsMatch" class="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
        Пароли совпадают
      </p>
    </div>

    <!-- Согласие -->
    <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-transparent p-1 -m-1 transition has-[:focus-visible]:border-brand-500 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-500/15">
      <input v-model="agreed" type="checkbox" required class="peer mt-0.5 size-4.5 shrink-0 rounded border-line text-brand-600 accent-brand-600 focus-visible:outline-none dark:border-white/20" />
      <span class="text-sm text-ink-muted dark:text-slate-400">
        Я согласен с
        <a href="#reg-email" class="font-semibold text-brand-600 underline-offset-2 hover:underline dark:text-brand-400">условиями</a>
        и
        <a href="#reg-email" class="font-semibold text-brand-600 underline-offset-2 hover:underline dark:text-brand-400">политикой конфиденциальности</a>
        <span class="text-red-500 peer-invalid:inline hidden" aria-hidden="true">*</span>
      </span>
    </label>

    <!-- Кнопка: loading-состояние (загрузка включается при отправке) -->
    <button
      type="submit"
      class="group tw-btn-primary w-full py-3 text-base disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="!canSubmit || status === 'loading'"
    >
      <svg
        v-if="status === 'loading'"
        class="size-4.5 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.3" stroke-width="3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      </svg>
      <svg v-else-if="status === 'success'" class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <span>{{ buttonLabel }}</span>
    </button>

    <p class="text-center text-xs text-ink-muted dark:text-slate-500">
      Уже есть аккаунт?
      <a href="#reg-email" class="font-semibold text-brand-600 hover:underline dark:text-brand-400">Войти</a>
    </p>

    <p class="sr-only" role="status" aria-live="polite">{{ liveMessage }}</p>
  </form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const email = ref('')
const password = ref('')
const confirm = ref('')
const agreed = ref(false)
const showPassword = ref(false)
const passwordTouched = ref(false)
const confirmTouched = ref(false)
const status = ref('idle')

const rules = reactive({ length: false, upper: false, digit: false, symbol: false })

const strength = computed(() => {
  const p = password.value
  rules.length = p.length >= 8
  rules.upper = /[A-ZА-Я]/.test(p)
  rules.digit = /\d/.test(p)
  rules.symbol = /[^\wа-яА-ЯёЁ]/.test(p)
  if (!p) return 0
  let score = [rules.length, rules.upper, rules.digit, rules.symbol].filter(Boolean).length
  if (p.length >= 12) score = Math.min(4, score + 1)
  return Math.max(1, Math.min(4, score))
})

const strengthLabel = computed(() => ['пусто', 'слабый', 'средний', 'хороший', 'отличный'][strength.value])
const strengthColor = computed(() => ['', 'bg-red-500', 'bg-amber-500', 'bg-lime-500', 'bg-emerald-500'][strength.value])

const passwordsMatch = computed(() => password.value === confirm.value)
const canSubmit = computed(
  () => /^\S+@\S+\.\S+$/.test(email.value) && strength.value >= 3 && passwordsMatch.value && agreed.value,
)

const buttonLabel = computed(() => {
  if (status.value === 'loading') return 'Создаём аккаунт…'
  if (status.value === 'success') return 'Готово!'
  return 'Зарегистрироваться'
})

const liveMessage = computed(() => {
  if (status.value === 'success') return `Аккаунт ${email.value} успешно создан`
  return ''
})

function submit() {
  if (!canSubmit.value) return
  status.value = 'loading'
  setTimeout(() => (status.value = 'success'), 1600)
}
</script>
