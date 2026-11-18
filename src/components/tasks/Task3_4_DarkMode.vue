<template>
  <div>
    <!-- Dark mode wrapper -->
    <div :class="isDark ? 'dark' : ''">
      <div class="bg-gray-100 dark:bg-slate-900 rounded-2xl p-6 md:p-8 transition-colors duration-300 min-h-[600px]">
        <!-- Top bar with toggle -->
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold color: var(--text-h) dark:text-slate-100 transition-colors duration-300">
            Панель управления
          </h2>

          <!-- Dark mode toggle -->
          <button
            @click="isDark = !isDark"
            :class="[
              'p-3 rounded-full transition-all duration-300',
              isDark
                ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            ]"
            :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
          >
            <span class="text-xl leading-none block w-6 h-6 flex items-center justify-center">
              {{ isDark ? '☀️' : '🌙' }}
            </span>
          </button>
        </div>

        <!-- Profile Card -->
        <div class="bg-transparent dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-color: var(--border) dark:border-slate-700 transition-colors duration-300 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              АС
            </div>
            <div>
              <h3 class="text-lg font-bold color: var(--text-h) dark:text-slate-100 transition-colors duration-300">
                Алексей Смирнов
              </h3>
              <p class="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
                Fullstack-разработчик · Студент CodeWay
              </p>
              <div class="flex items-center gap-2 mt-1">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="text-xs text-gray-400 dark:text-slate-500 transition-colors duration-300">В сети</span>
              </div>
            </div>
            <button class="ml-auto bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300 hidden sm:block">
              Редактировать
            </button>
          </div>
          <p class="mt-4 text-sm color: var(--text) dark:text-slate-300 transition-colors duration-300 leading-relaxed">
            Увлечённый веб-разработкой, изучаю Vue.js и Node.js на платформе CodeWay. Стремлюсь к чистому коду и современным практикам разработки.
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-transparent dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-color: var(--border) dark:border-slate-700 transition-colors duration-300"
          >
            <div class="flex items-center gap-3 mb-2">
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center text-lg', stat.iconBg]">
                {{ stat.icon }}
              </div>
              <span class="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">{{ stat.label }}</span>
            </div>
            <p class="text-2xl font-bold color: var(--text-h) dark:text-slate-100 transition-colors duration-300">
              {{ stat.value }}
            </p>
            <p class="text-xs text-green-600 dark:text-green-400 mt-1 transition-colors duration-300">
              {{ stat.change }}
            </p>
          </div>
        </div>

        <!-- Form Section -->
        <div class="bg-transparent dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-color: var(--border) dark:border-slate-700 transition-colors duration-300">
          <h3 class="text-lg font-bold color: var(--text-h) dark:text-slate-100 transition-colors duration-300 mb-4">
            Настройки профиля
          </h3>

          <form @submit.prevent class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors duration-300">
                  Имя
                </label>
                <input
                  type="text"
                  v-model="form.firstName"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent dark:bg-slate-700 color: var(--text-h) dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors duration-300">
                  Фамилия
                </label>
                <input
                  type="text"
                  v-model="form.lastName"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent dark:bg-slate-700 color: var(--text-h) dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors duration-300">
                Email
              </label>
              <input
                type="email"
                v-model="form.email"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent dark:bg-slate-700 color: var(--text-h) dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors duration-300">
                О себе
              </label>
              <textarea
                v-model="form.bio"
                rows="3"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent dark:bg-slate-700 color: var(--text-h) dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-colors duration-300 resize-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors duration-300">
                Уровень подготовки
              </label>
              <select
                v-model="form.level"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-transparent dark:bg-slate-700 color: var(--text-h) dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-colors duration-300"
              >
                <option value="beginner">Начинающий</option>
                <option value="intermediate">Средний</option>
                <option value="advanced">Продвинутый</option>
              </select>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <button
                type="submit"
                class="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 outline-none"
              >
                Сохранить
              </button>
              <button
                type="button"
                class="px-6 py-2.5 rounded-lg font-medium border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-300"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task3_4_DarkMode',
  data() {
    return {
      isDark: false,
      stats: [
        {
          icon: '📚',
          iconBg: 'bg-blue-100 dark:bg-blue-900/40',
          label: 'Пройдено уроков',
          value: '47',
          change: '+5 за неделю'
        },
        {
          icon: '⏱️',
          iconBg: 'bg-purple-100 dark:bg-purple-900/40',
          label: 'Часов обучения',
          value: '128',
          change: '+12 за неделю'
        },
        {
          icon: '🏆',
          iconBg: 'bg-amber-100 dark:bg-amber-900/40',
          label: 'Достижений',
          value: '12',
          change: '+2 новых'
        }
      ],
      form: {
        firstName: 'Алексей',
        lastName: 'Смирнов',
        email: 'alexey@codeway.by',
        bio: 'Увлечённый веб-разработкой, изучаю Vue.js и Node.js.',
        level: 'intermediate'
      }
    };
  },
  mounted() {
    // Configure Tailwind dark mode via CDN script config
    if (window.tailwind) {
      window.tailwind.config = {
        ...(window.tailwind.config || {}),
        darkMode: 'class'
      };
    }
  }
};
</script>
