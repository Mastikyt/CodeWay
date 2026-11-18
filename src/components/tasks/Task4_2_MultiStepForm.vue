<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8 sm:py-12">
    <div class="mx-auto max-w-2xl">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold color: var(--text-h) sm:text-3xl">Регистрация на курс</h1>
        <p class="mt-2 text-sm text-gray-500">Заполните все шаги для записи на курс</p>
      </div>

      <!-- Progress Stepper -->
      <div class="relative mb-10 px-4">
        <!-- Connecting Line Background -->
        <div class="absolute left-0 right-0 top-5 mx-auto h-0.5 bg-gray-200" style="width: calc(100% - 80px); left: 40px;"></div>
        <!-- Connecting Line Progress -->
        <div
          class="absolute top-5 h-0.5 bg-green-500 transition-all duration-500 ease-in-out"
          :style="{
            width: ((currentStep - 1) / (steps.length - 1)) * (100 - (80 / containerWidth * 100)) + '%',
            left: '40px'
          }"
        ></div>

        <div class="relative flex justify-between">
          <div
            v-for="(step, idx) in steps"
            :key="idx"
            class="flex flex-col items-center"
            :data-state="idx + 1 < currentStep ? 'completed' : idx + 1 === currentStep ? 'current' : 'upcoming'"
            :aria-current="idx + 1 === currentStep ? 'step' : undefined"
          >
            <!-- Circle -->
            <div
              :class="[
                'relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                idx + 1 < currentStep
                  ? 'bg-green-500 text-white shadow-md shadow-green-200'
                  : idx + 1 === currentStep
                    ? 'bg-blue-600 text-white ring-4 ring-blue-200 shadow-md shadow-blue-200'
                    : 'bg-gray-200 text-gray-500'
              ]"
            >
              <svg v-if="idx + 1 < currentStep" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span v-else>{{ idx + 1 }}</span>
            </div>
            <!-- Label -->
            <span
              :class="[
                'mt-2 text-xs font-medium transition-colors sm:text-sm',
                idx + 1 <= currentStep ? 'color: var(--text-h)' : 'text-gray-400'
              ]"
            >
              {{ step }}
            </span>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="overflow-hidden rounded-2xl bg-transparent shadow-lg shadow-gray-200/50">
        <div class="p-6 sm:p-8">
          <!-- Step 1: Personal Data -->
          <div v-if="currentStep === 1">
            <h2 class="mb-1 text-xl font-bold color: var(--text-h)">Личные данные</h2>
            <p class="mb-6 text-sm text-gray-500">Укажите ваши контактные данные</p>

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="firstName" class="mb-1.5 block text-sm font-medium text-gray-700">
                  Имя <span class="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  v-model="formData.firstName"
                  type="text"
                  placeholder="Введите имя"
                  :class="[
                    'w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2',
                    errors.firstName
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                      : 'border-color: var(--border) bg-gray-50 focus:border-blue-500 focus:bg-transparent focus:ring-blue-200'
                  ]"
                  required
                />
                <p v-if="errors.firstName" class="mt-1 text-xs text-red-500">{{ errors.firstName }}</p>
              </div>

              <div>
                <label for="lastName" class="mb-1.5 block text-sm font-medium text-gray-700">
                  Фамилия <span class="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  v-model="formData.lastName"
                  type="text"
                  placeholder="Введите фамилию"
                  :class="[
                    'w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2',
                    errors.lastName
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                      : 'border-color: var(--border) bg-gray-50 focus:border-blue-500 focus:bg-transparent focus:ring-blue-200'
                  ]"
                  required
                />
                <p v-if="errors.lastName" class="mt-1 text-xs text-red-500">{{ errors.lastName }}</p>
              </div>

              <div class="sm:col-span-2">
                <label for="email" class="mb-1.5 block text-sm font-medium text-gray-700">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="example@email.com"
                  :class="[
                    'w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2',
                    errors.email
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                      : 'border-color: var(--border) bg-gray-50 focus:border-blue-500 focus:bg-transparent focus:ring-blue-200'
                  ]"
                  required
                />
                <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
              </div>

              <div class="sm:col-span-2">
                <label for="phone" class="mb-1.5 block text-sm font-medium text-gray-700">
                  Телефон <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">+375</span>
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    placeholder="(29) 123-45-67"
                    :class="[
                      'w-full rounded-xl border py-2.5 pl-14 pr-4 text-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2',
                      errors.phone
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : 'border-color: var(--border) bg-gray-50 focus:border-blue-500 focus:bg-transparent focus:ring-blue-200'
                    ]"
                    required
                  />
                </div>
                <p v-if="errors.phone" class="mt-1 text-xs text-red-500">{{ errors.phone }}</p>
              </div>
            </div>
          </div>

          <!-- Step 2: Address -->
          <div v-if="currentStep === 2">
            <h2 class="mb-1 text-xl font-bold color: var(--text-h)">Адрес</h2>
            <p class="mb-6 text-sm text-gray-500">Укажите ваш адрес проживания</p>

            <div class="grid gap-5 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label for="country" class="mb-1.5 block text-sm font-medium text-gray-700">
                  Страна <span class="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  v-model="formData.country"
                  class="w-full rounded-xl border border-color: var(--border) bg-gray-50 px-4 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="" disabled>Выберите страну</option>
                  <option value="BY">Беларусь</option>
                  <option value="RU">Россия</option>
                  <option value="UA">Украина</option>
                  <option value="KZ">Казахстан</option>
                  <option value="PL">Польша</option>
                </select>
              </div>

              <div>
                <label for="city" class="mb-1.5 block text-sm font-medium text-gray-700">
                  Город <span class="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  v-model="formData.city"
                  type="text"
                  placeholder="Минск"
                  class="w-full rounded-xl border border-color: var(--border) bg-gray-50 px-4 py-2.5 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label for="zip" class="mb-1.5 block text-sm font-medium text-gray-700">
                  Индекс
                </label>
                <input
                  id="zip"
                  v-model="formData.zip"
                  type="text"
                  placeholder="220000"
                  class="w-full rounded-xl border border-color: var(--border) bg-gray-50 px-4 py-2.5 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div class="sm:col-span-2">
                <label for="street" class="mb-1.5 block text-sm font-medium text-gray-700">
                  Улица
                </label>
                <input
                  id="street"
                  v-model="formData.street"
                  type="text"
                  placeholder="ул. Примерная, д. 1, кв. 10"
                  class="w-full rounded-xl border border-color: var(--border) bg-gray-50 px-4 py-2.5 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </div>

          <!-- Step 3: Payment -->
          <div v-if="currentStep === 3">
            <h2 class="mb-1 text-xl font-bold color: var(--text-h)">Оплата</h2>
            <p class="mb-6 text-sm text-gray-500">Выберите тариф и способ оплаты</p>

            <!-- Tariff Selection -->
            <div class="mb-6">
              <label class="mb-3 block text-sm font-medium text-gray-700">Выберите тариф</label>
              <div class="grid gap-3 sm:grid-cols-3">
                <label
                  v-for="tariff in tariffs"
                  :key="tariff.name"
                  :class="[
                    'relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200',
                    formData.tariff === tariff.name
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                      : 'border-color: var(--border) hover:border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  <input
                    type="radio"
                    :value="tariff.name"
                    v-model="formData.tariff"
                    class="sr-only"
                    :name="'tariff'"
                  />
                  <div v-if="tariff.popular" class="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span class="rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      Популярный
                    </span>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl">{{ tariff.icon }}</div>
                    <div class="mt-2 text-sm font-bold color: var(--text-h)">{{ tariff.name }}</div>
                    <div class="mt-1 text-2xl font-extrabold color: var(--text-h)">${{ tariff.price }}</div>
                    <ul class="mt-3 space-y-1">
                      <li v-for="feature in tariff.features" :key="feature" class="text-xs text-gray-500">
                        ✓ {{ feature }}
                      </li>
                    </ul>
                  </div>
                  <!-- Check indicator -->
                  <div
                    v-if="formData.tariff === tariff.name"
                    class="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white"
                  >
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </label>
              </div>
            </div>

            <!-- Payment Method -->
            <div>
              <label class="mb-3 block text-sm font-medium text-gray-700">Способ оплаты</label>
              <div class="space-y-2">
                <label
                  v-for="method in paymentMethods"
                  :key="method.value"
                  :class="[
                    'flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200',
                    formData.paymentMethod === method.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-color: var(--border) hover:border-gray-300'
                  ]"
                >
                  <input
                    type="radio"
                    :value="method.value"
                    v-model="formData.paymentMethod"
                    class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    :name="'paymentMethod'"
                  />
                  <span class="text-lg">{{ method.icon }}</span>
                  <div>
                    <div class="text-sm font-medium color: var(--text-h)">{{ method.label }}</div>
                    <div class="text-xs text-gray-500">{{ method.desc }}</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Step 4: Confirmation -->
          <div v-if="currentStep === 4">
            <h2 class="mb-1 text-xl font-bold color: var(--text-h)">Подтверждение</h2>
            <p class="mb-6 text-sm text-gray-500">Проверьте данные перед отправкой</p>

            <!-- Summary Card -->
            <div class="space-y-4 rounded-xl border border-color: var(--border) bg-gray-50 p-5">
              <div class="border-b border-color: var(--border) pb-4">
                <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Личные данные</h3>
                <div class="grid gap-2 text-sm sm:grid-cols-2">
                  <div><span class="text-gray-500">Имя:</span> <span class="font-medium color: var(--text-h)">{{ formData.firstName }} {{ formData.lastName }}</span></div>
                  <div><span class="text-gray-500">Email:</span> <span class="font-medium color: var(--text-h)">{{ formData.email }}</span></div>
                  <div><span class="text-gray-500">Телефон:</span> <span class="font-medium color: var(--text-h)">+375 {{ formData.phone }}</span></div>
                </div>
              </div>

              <div class="border-b border-color: var(--border) pb-4">
                <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Адрес</h3>
                <div class="text-sm">
                  <span class="font-medium color: var(--text-h)">
                    {{ countryName }}, {{ formData.city }}<span v-if="formData.street">, {{ formData.street }}</span><span v-if="formData.zip">, {{ formData.zip }}</span>
                  </span>
                </div>
              </div>

              <div>
                <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Оплата</h3>
                <div class="grid gap-2 text-sm sm:grid-cols-2">
                  <div><span class="text-gray-500">Тариф:</span> <span class="font-medium color: var(--text-h)">{{ formData.tariff }}</span></div>
                  <div><span class="text-gray-500">Сумма:</span> <span class="text-lg font-bold text-blue-600">${{ selectedTariffPrice }}</span></div>
                  <div><span class="text-gray-500">Способ:</span> <span class="font-medium color: var(--text-h)">{{ selectedPaymentLabel }}</span></div>
                </div>
              </div>
            </div>

            <!-- Checkboxes -->
            <div class="mt-6 space-y-3">
              <label class="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  v-model="formData.confirmData"
                  class="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700">Подтверждаю правильность введённых данных</span>
              </label>
              <label class="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  v-model="formData.agreeTerms"
                  class="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700">
                  Согласен с
                  <a href="#" class="font-medium text-blue-600 underline hover:text-blue-700">условиями использования</a>
                  и
                  <a href="#" class="font-medium text-blue-600 underline hover:text-blue-700">политикой конфиденциальности</a>
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-6 py-4 sm:px-8">
          <button
            @click="prevStep"
            :disabled="currentStep === 1"
            :aria-disabled="currentStep === 1"
            :class="[
              'flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200',
              currentStep === 1
                ? 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-50'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
            ]"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>

          <button
            v-if="currentStep < 4"
            @click="nextStep"
            class="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Далее
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            v-else
            @click="submitForm"
            :disabled="!canSubmit || loading"
            :aria-disabled="!canSubmit || loading"
            :class="[
              'flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
              canSubmit && !loading
                ? 'bg-green-600 shadow-green-200 hover:bg-green-700 active:scale-95'
                : 'cursor-not-allowed bg-green-400 opacity-70'
            ]"
          >
            <svg
              v-if="loading"
              class="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span>{{ loading ? 'Отправка...' : 'Записаться на курс' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task4_2_MultiStepForm',
  data() {
    return {
      currentStep: 1,
      loading: false,
      containerWidth: 600,
      steps: ['Личные данные', 'Адрес', 'Оплата', 'Подтверждение'],
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        street: '',
        zip: '',
        tariff: 'Про',
        paymentMethod: 'card',
        confirmData: false,
        agreeTerms: false
      },
      errors: {},
      tariffs: [
        {
          name: 'Базовый',
          price: 99,
          icon: '📘',
          popular: false,
          features: ['Видеоуроки', 'Тесты', 'Сертификат']
        },
        {
          name: 'Про',
          price: 149,
          icon: '🚀',
          popular: true,
          features: ['Всё из Базового', 'Менторство', 'Проекты', 'Код-ревью']
        },
        {
          name: 'Корпоративный',
          price: 249,
          icon: '🏢',
          popular: false,
          features: ['Всё из Про', 'Команда до 10', 'Аналитика', 'Приоритет']
        }
      ],
      paymentMethods: [
        { value: 'card', label: 'Банковская карта', icon: '💳', desc: 'Visa, Mastercard, МИР' },
        { value: 'paypal', label: 'PayPal', icon: '🅿️', desc: 'Оплата через PayPal' },
        { value: 'installment', label: 'Рассрочка', icon: '📅', desc: 'Без переплат на 6 месяцев' }
      ],
      countries: {
        BY: 'Беларусь',
        RU: 'Россия',
        UA: 'Украина',
        KZ: 'Казахстан',
        PL: 'Польша'
      }
    };
  },
  computed: {
    canSubmit() {
      return this.formData.confirmData && this.formData.agreeTerms;
    },
    countryName() {
      return this.countries[this.formData.country] || this.formData.country;
    },
    selectedTariffPrice() {
      const t = this.tariffs.find(t => t.name === this.formData.tariff);
      return t ? t.price : 0;
    },
    selectedPaymentLabel() {
      const m = this.paymentMethods.find(m => m.value === this.formData.paymentMethod);
      return m ? m.label : '';
    }
  },
  methods: {
    validateStep(step) {
      this.errors = {};
      if (step === 1) {
        if (!this.formData.firstName.trim()) this.errors.firstName = 'Введите имя';
        if (!this.formData.lastName.trim()) this.errors.lastName = 'Введите фамилию';
        if (!this.formData.email.trim()) {
          this.errors.email = 'Введите email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
          this.errors.email = 'Некорректный email';
        }
        if (!this.formData.phone.trim()) this.errors.phone = 'Введите телефон';
      }
      return Object.keys(this.errors).length === 0;
    },
    nextStep() {
      if (this.validateStep(this.currentStep)) {
        if (this.currentStep < 4) this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
    submitForm() {
      if (!this.canSubmit || this.loading) return;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        alert('Вы успешно записаны на курс!');
      }, 2000);
    }
  }
};
</script>
