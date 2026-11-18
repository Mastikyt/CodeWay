<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Mobile Nav Toggle -->
    <button
      class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-300 transition-all hover:bg-indigo-700 active:scale-95 lg:hidden"
      @click="navOpen = !navOpen"
      aria-label="Навигация по компонентам"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    </button>

    <!-- Mobile Nav Overlay -->
    <div
      v-if="navOpen"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      @click="navOpen = false"
    ></div>

    <!-- Sidebar Navigation -->
    <nav
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto border-r border-color: var(--border) bg-transparent p-6 transition-transform duration-300 lg:static lg:translate-x-0',
        navOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
      aria-label="Навигация по компонентам"
    >
      <div class="mb-6">
        <h2 class="text-lg font-bold color: var(--text-h)">Дизайн-система</h2>
        <p class="text-xs text-gray-500">CodeWay UI Kit</p>
      </div>
      <ul class="space-y-1">
        <li v-for="section in sections" :key="section.id">
          <a
            :href="'#' + section.id"
            :class="[
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
              activeSection === section.id
                ? 'bg-indigo-50 text-indigo-700'
                : 'color: var(--text) hover:bg-gray-50 hover:color: var(--text-h)'
            ]"
            @click="activeSection = section.id; navOpen = false"
          >
            <span>{{ section.icon }}</span>
            <span>{{ section.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-10">
          <h1 class="text-3xl font-extrabold color: var(--text-h) sm:text-4xl">Дизайн-система CodeWay</h1>
          <p class="mt-2 text-gray-500">Полная документация UI компонентов и стилей</p>
        </div>

        <!-- Section 1: Colors -->
        <section id="colors" class="border-b border-color: var(--border) pb-12">
          <h2 class="mb-2 text-2xl font-bold color: var(--text-h)">Цветовая палитра</h2>
          <p class="mb-8 text-sm text-gray-500">Основные и семантические цвета дизайн-системы</p>

          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Бренд</h3>
          <div class="mb-8 flex flex-wrap gap-4">
            <div v-for="color in brandColors" :key="color.name" class="text-center">
              <div
                class="h-16 w-16 rounded-lg shadow-md transition-transform hover:scale-110"
                :style="{ backgroundColor: color.hex }"
              ></div>
              <div class="mt-2 text-xs font-semibold text-gray-700">{{ color.name }}</div>
              <div class="text-[10px] text-gray-400">{{ color.hex }}</div>
            </div>
          </div>

          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Семантические</h3>
          <div class="flex flex-wrap gap-4">
            <div v-for="color in semanticColors" :key="color.name" class="text-center">
              <div
                class="h-16 w-16 rounded-lg shadow-md transition-transform hover:scale-110"
                :style="{ backgroundColor: color.hex }"
              ></div>
              <div class="mt-2 text-xs font-semibold text-gray-700">{{ color.name }}</div>
              <div class="text-[10px] text-gray-400">{{ color.hex }}</div>
            </div>
          </div>
        </section>

        <!-- Section 2: Typography -->
        <section id="typography" class="border-b border-color: var(--border) py-12">
          <h2 class="mb-2 text-2xl font-bold color: var(--text-h)">Типографика</h2>
          <p class="mb-8 text-sm text-gray-500">Иерархия заголовков и текстовые стили</p>

          <div class="space-y-6 rounded-2xl bg-transparent p-6 shadow-sm sm:p-8">
            <div class="border-b border-gray-100 pb-4">
              <span class="mb-1 inline-block rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500">text-4xl md:text-5xl font-extrabold</span>
              <h1 class="text-4xl font-extrabold color: var(--text-h) md:text-5xl">Заголовок H1</h1>
            </div>
            <div class="border-b border-gray-100 pb-4">
              <span class="mb-1 inline-block rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500">text-3xl font-bold</span>
              <h2 class="text-3xl font-bold color: var(--text-h)">Заголовок H2</h2>
            </div>
            <div class="border-b border-gray-100 pb-4">
              <span class="mb-1 inline-block rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500">text-2xl font-semibold</span>
              <h3 class="text-2xl font-semibold color: var(--text-h)">Заголовок H3</h3>
            </div>
            <div class="border-b border-gray-100 pb-4">
              <span class="mb-1 inline-block rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500">text-base</span>
              <p class="text-base text-gray-700">Основной текст параграфа. Используется для описания контента, статей и документации. CodeWay — ведущая IT-академия в Беларуси, обучающая современным технологиям.</p>
            </div>
            <div>
              <span class="mb-1 inline-block rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500">text-sm text-gray-500</span>
              <p class="text-sm text-gray-500">Мелкий вспомогательный текст для подписей, дат и мета-информации.</p>
            </div>
          </div>
        </section>

        <!-- Section 3: Buttons -->
        <section id="buttons" class="border-b border-color: var(--border) py-12">
          <h2 class="mb-2 text-2xl font-bold color: var(--text-h)">Кнопки</h2>
          <p class="mb-8 text-sm text-gray-500">Варианты, размеры и состояния кнопок</p>

          <!-- Button Matrix -->
          <div class="overflow-x-auto rounded-2xl bg-transparent p-6 shadow-sm sm:p-8">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="pb-4 pr-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Вариант</th>
                  <th class="pb-4 px-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Small</th>
                  <th class="pb-4 px-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Medium</th>
                  <th class="pb-4 px-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Large</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="variant in buttonVariants" :key="variant.name">
                  <td class="py-4 pr-6 text-sm font-medium text-gray-700">{{ variant.name }}</td>
                  <td class="px-3 py-4 text-center">
                    <button
                      :class="[variant.classes, 'rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', variant.ring]"
                    >
                      Кнопка
                    </button>
                  </td>
                  <td class="px-3 py-4 text-center">
                    <button
                      :class="[variant.classes, 'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', variant.ring]"
                    >
                      Кнопка
                    </button>
                  </td>
                  <td class="px-3 py-4 text-center">
                    <button
                      :class="[variant.classes, 'rounded-lg px-6 py-3 text-lg font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', variant.ring]"
                    >
                      Кнопка
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Disabled Buttons -->
            <div class="mt-6 border-t border-gray-100 pt-6">
              <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Disabled</h4>
              <div class="flex flex-wrap gap-3">
                <button disabled class="cursor-not-allowed rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white opacity-50">Primary</button>
                <button disabled class="cursor-not-allowed rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white opacity-50">Secondary</button>
                <button disabled class="cursor-not-allowed rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 opacity-50">Ghost</button>
                <button disabled class="cursor-not-allowed rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white opacity-50">Danger</button>
              </div>
            </div>

            <!-- Loading Button -->
            <div class="mt-6 border-t border-gray-100 pt-6">
              <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Loading</h4>
              <button class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700">
                <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Загрузка...
              </button>
            </div>
          </div>
        </section>

        <!-- Section 4: Forms -->
        <section id="forms" class="border-b border-color: var(--border) py-12">
          <h2 class="mb-2 text-2xl font-bold color: var(--text-h)">Формы</h2>
          <p class="mb-8 text-sm text-gray-500">Поля ввода, чекбоксы, переключатели и другие элементы форм</p>

          <div class="rounded-2xl bg-transparent p-6 shadow-sm sm:p-8">
            <div class="grid gap-8 sm:grid-cols-2">
              <!-- Text Input States -->
              <div>
                <h4 class="mb-4 text-sm font-semibold text-gray-700">Text Input</h4>
                <div class="space-y-4">
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700">По умолчанию</label>
                    <input
                      type="text"
                      placeholder="Введите текст"
                      class="w-full rounded-xl border border-color: var(--border) bg-gray-50 px-4 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700">С фокусом</label>
                    <input
                      type="text"
                      value="Текст с фокусом"
                      class="w-full rounded-xl border border-indigo-500 bg-transparent px-4 py-2.5 text-sm ring-2 ring-indigo-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-red-600">С ошибкой</label>
                    <input
                      type="text"
                      value="Неверные данные"
                      class="w-full rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                    />
                    <p class="mt-1 text-xs text-red-500">Это поле обязательно для заполнения</p>
                  </div>
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-400">Отключено</label>
                    <input
                      type="text"
                      value="Отключённое поле"
                      disabled
                      class="w-full cursor-not-allowed rounded-xl border border-color: var(--border) bg-gray-100 px-4 py-2.5 text-sm text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <!-- Checkbox, Toggle, Select, Textarea -->
              <div>
                <h4 class="mb-4 text-sm font-semibold text-gray-700">Другие элементы</h4>
                <div class="space-y-5">
                  <!-- Custom Checkbox -->
                  <div>
                    <label class="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">Checkbox</label>
                    <div class="space-y-2">
                      <label class="flex cursor-pointer items-center gap-3">
                        <input type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span class="text-sm text-gray-700">Выбранный вариант</span>
                      </label>
                      <label class="flex cursor-pointer items-center gap-3">
                        <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span class="text-sm text-gray-700">Невыбранный вариант</span>
                      </label>
                    </div>
                  </div>

                  <!-- Toggle Switch -->
                  <div>
                    <label class="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">Toggle</label>
                    <div class="space-y-3">
                      <label class="inline-flex cursor-pointer items-center gap-3">
                        <div class="relative">
                          <input type="checkbox" v-model="toggleValue" class="peer sr-only" />
                          <div class="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-300"></div>
                          <div class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-transparent shadow-md transition-transform peer-checked:translate-x-5"></div>
                        </div>
                        <span class="text-sm text-gray-700">{{ toggleValue ? 'Включено' : 'Выключено' }}</span>
                      </label>
                    </div>
                  </div>

                  <!-- Select -->
                  <div>
                    <label class="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">Select</label>
                    <select class="w-full rounded-xl border border-color: var(--border) bg-gray-50 px-4 py-2.5 text-sm transition-all focus:border-indigo-500 focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-200">
                      <option>Выберите вариант</option>
                      <option>Frontend разработка</option>
                      <option>Backend разработка</option>
                      <option>UX/UI дизайн</option>
                    </select>
                  </div>

                  <!-- Textarea -->
                  <div>
                    <label class="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">Textarea</label>
                    <textarea
                      rows="3"
                      placeholder="Введите описание..."
                      class="w-full resize-none rounded-xl border border-color: var(--border) bg-gray-50 px-4 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 5: Components -->
        <section id="components" class="py-12">
          <h2 class="mb-2 text-2xl font-bold color: var(--text-h)">Компоненты</h2>
          <p class="mb-8 text-sm text-gray-500">Бейджи, алерты, карточки и модальные окна</p>

          <!-- Badges -->
          <div class="mb-10">
            <h3 class="mb-4 text-lg font-semibold color: var(--text-h)">Бейджи</h3>
            <div class="rounded-2xl bg-transparent p-6 shadow-sm">
              <div class="mb-4">
                <span class="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">Small</span>
                <div class="flex flex-wrap gap-2">
                  <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">Success</span>
                  <span class="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-semibold text-yellow-700">Warning</span>
                  <span class="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">Danger</span>
                  <span class="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">Info</span>
                  <span class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold color: var(--text)">Neutral</span>
                </div>
              </div>
              <div>
                <span class="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">Medium</span>
                <div class="flex flex-wrap gap-2">
                  <span class="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                    <span class="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>Success
                  </span>
                  <span class="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
                    <span class="mr-1.5 h-1.5 w-1.5 rounded-full bg-yellow-500"></span>Warning
                  </span>
                  <span class="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                    <span class="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></span>Danger
                  </span>
                  <span class="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    <span class="mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></span>Info
                  </span>
                  <span class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold color: var(--text)">
                    <span class="mr-1.5 h-1.5 w-1.5 rounded-full bg-gray-400"></span>Neutral
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Alerts -->
          <div class="mb-10">
            <h3 class="mb-4 text-lg font-semibold color: var(--text-h)">Алерты</h3>
            <div class="space-y-4">
              <!-- Success Alert -->
              <div class="flex items-start gap-3 rounded-xl border-l-4 border-green-500 bg-green-50 p-4">
                <span class="mt-0.5 text-lg text-green-600">✓</span>
                <div class="flex-1">
                  <h4 class="text-sm font-bold text-green-800">Успешно</h4>
                  <p class="mt-0.5 text-sm text-green-700">Ваши данные успешно сохранены. Изменения вступят в силу в течение минуты.</p>
                </div>
                <button class="shrink-0 rounded-lg p-1 text-green-500 transition-colors hover:bg-green-100 hover:text-green-700" aria-label="Закрыть">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <!-- Info Alert -->
              <div class="flex items-start gap-3 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-4">
                <span class="mt-0.5 text-lg text-blue-600">ℹ</span>
                <div class="flex-1">
                  <h4 class="text-sm font-bold text-blue-800">Информация</h4>
                  <p class="mt-0.5 text-sm text-blue-700">Новый курс по Vue.js 3 доступен для записи. Количество мест ограничено.</p>
                </div>
                <button class="shrink-0 rounded-lg p-1 text-blue-500 transition-colors hover:bg-blue-100 hover:text-blue-700" aria-label="Закрыть">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <!-- Warning Alert -->
              <div class="flex items-start gap-3 rounded-xl border-l-4 border-yellow-500 bg-yellow-50 p-4">
                <span class="mt-0.5 text-lg text-yellow-600">⚠</span>
                <div class="flex-1">
                  <h4 class="text-sm font-bold text-yellow-800">Внимание</h4>
                  <p class="mt-0.5 text-sm text-yellow-700">Срок действия вашей подписки истекает через 3 дня. Продлите подписку, чтобы сохранить доступ.</p>
                </div>
                <button class="shrink-0 rounded-lg p-1 text-yellow-500 transition-colors hover:bg-yellow-100 hover:text-yellow-700" aria-label="Закрыть">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <!-- Danger Alert -->
              <div class="flex items-start gap-3 rounded-xl border-l-4 border-red-500 bg-red-50 p-4">
                <span class="mt-0.5 text-lg text-red-600">✕</span>
                <div class="flex-1">
                  <h4 class="text-sm font-bold text-red-800">Ошибка</h4>
                  <p class="mt-0.5 text-sm text-red-700">Не удалось обработать платёж. Проверьте данные карты и попробуйте снова.</p>
                </div>
                <button class="shrink-0 rounded-lg p-1 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700" aria-label="Закрыть">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Card -->
          <div class="mb-10">
            <h3 class="mb-4 text-lg font-semibold color: var(--text-h)">Карточка</h3>
            <div class="max-w-sm overflow-hidden rounded-2xl bg-transparent shadow-lg transition-all hover:shadow-xl">
              <div class="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600">
                <span class="text-6xl drop-shadow-lg">🚀</span>
              </div>
              <div class="p-6">
                <div class="mb-2 flex items-center gap-2">
                  <span class="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">Frontend</span>
                  <span class="text-xs text-gray-400">Средний</span>
                </div>
                <h4 class="mb-2 text-lg font-bold color: var(--text-h)">Vue.js 3 Полный курс</h4>
                <p class="mb-4 text-sm text-gray-500">Изучите Vue 3, Composition API, Pinia, Vue Router и создайте полноценные приложения.</p>
                <div class="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span class="text-xl font-extrabold color: var(--text-h)">$149</span>
                  <button class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 active:scale-95">
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal -->
          <div>
            <h3 class="mb-4 text-lg font-semibold color: var(--text-h)">Модальное окно</h3>
            <button
              @click="modalOpen = true"
              class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Открыть модальное окно
            </button>

            <!-- Modal -->
            <div
              v-if="modalOpen"
              class="fixed inset-0 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <!-- Backdrop -->
              <div
                class="absolute inset-0 bg-black/50 backdrop-blur-sm"
                @click="modalOpen = false"
              ></div>

              <!-- Content -->
              <div
                :class="[
                  'relative mx-4 w-full max-w-lg rounded-2xl bg-transparent p-6 shadow-2xl transition-all duration-300',
                  modalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                ]"
              >
                <!-- Header -->
                <div class="mb-4 flex items-center justify-between">
                  <h3 id="modal-title" class="text-lg font-bold color: var(--text-h)">Подтверждение действия</h3>
                  <button
                    @click="modalOpen = false"
                    class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:color: var(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    aria-label="Закрыть"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <!-- Body -->
                <div class="mb-6">
                  <p class="text-sm color: var(--text)">Вы уверены, что хотите записаться на курс «Vue.js 3 Полный курс»? После подтверждения оплата будет списана с вашей карты.</p>
                  <div class="mt-4 flex items-center gap-3 rounded-xl bg-indigo-50 p-4">
                    <span class="text-2xl">🚀</span>
                    <div>
                      <div class="text-sm font-bold color: var(--text-h)">Vue.js 3 Полный курс</div>
                      <div class="text-sm text-gray-500">Стоимость: <span class="font-bold text-indigo-600">$149</span></div>
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div class="flex gap-3 sm:justify-end">
                  <button
                    @click="modalOpen = false"
                    class="flex-1 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 active:scale-95 sm:flex-initial"
                  >
                    Отмена
                  </button>
                  <button
                    @click="modalOpen = false"
                    class="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 sm:flex-initial"
                  >
                    Подтвердить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Task4_4_DesignSystem',
  data() {
    return {
      navOpen: false,
      modalOpen: false,
      toggleValue: true,
      activeSection: 'colors',
      sections: [
        { id: 'colors', label: 'Цветовая палитра', icon: '🎨' },
        { id: 'typography', label: 'Типографика', icon: '🔤' },
        { id: 'buttons', label: 'Кнопки', icon: '🔘' },
        { id: 'forms', label: 'Формы', icon: '📝' },
        { id: 'components', label: 'Компоненты', icon: '🧩' }
      ],
      brandColors: [
        { name: 'Primary', hex: '#4F46E5' },
        { name: 'Secondary', hex: '#7C3AED' },
        { name: 'Accent', hex: '#06B6D4' }
      ],
      semanticColors: [
        { name: 'Success', hex: '#10B981' },
        { name: 'Warning', hex: '#F59E0B' },
        { name: 'Danger', hex: '#EF4444' },
        { name: 'Info', hex: '#3B82F6' }
      ],
      buttonVariants: [
        {
          name: 'Primary',
          classes: 'bg-indigo-600 text-white hover:bg-indigo-700',
          ring: 'focus-visible:ring-indigo-500'
        },
        {
          name: 'Secondary',
          classes: 'bg-gray-600 text-white hover:bg-gray-700',
          ring: 'focus-visible:ring-gray-500'
        },
        {
          name: 'Ghost',
          classes: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
          ring: 'focus-visible:ring-gray-500'
        },
        {
          name: 'Danger',
          classes: 'bg-red-600 text-white hover:bg-red-700',
          ring: 'focus-visible:ring-red-500'
        }
      ]
    };
  }
};
</script>
