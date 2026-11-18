<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl">
      <!-- Page Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl font-bold color: var(--text-h) sm:text-3xl">Каталог курсов</h1>
        <p class="mt-1 text-sm text-gray-500">Выберите курс и начните обучение уже сегодня</p>
      </div>

      <!-- Mobile Filter Button -->
      <button
        class="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-transparent px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 lg:hidden"
        @click="filtersOpen = true"
      >
        <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Фильтры
        <span v-if="activeFilterCount > 0" class="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
          {{ activeFilterCount }}
        </span>
      </button>

      <!-- Mobile Filter Drawer Backdrop -->
      <div
        v-if="filtersOpen"
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
        @click="filtersOpen = false"
      ></div>

      <!-- Mobile Filter Drawer -->
      <div
        :class="[
          'fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-transparent p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden',
          filtersOpen ? 'translate-y-0' : 'translate-y-full'
        ]"
      >
        <!-- Drawer Handle -->
        <div class="mb-4 flex justify-center">
          <div class="h-1.5 w-12 rounded-full bg-gray-300"></div>
        </div>
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-bold color: var(--text-h)">Фильтры</h2>
          <button @click="filtersOpen = false" class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:color: var(--text)">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Render filter content inside drawer for mobile -->
        <div>
          <!-- Category -->
          <div class="mb-6">
            <h3 class="mb-3 text-sm font-semibold color: var(--text-h)">Категория</h3>
            <div class="space-y-2">
              <label v-for="cat in categories" :key="cat" class="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  :value="cat"
                  v-model="selectedCategories"
                  class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700">{{ cat }}</span>
              </label>
            </div>
          </div>
          <!-- Price -->
          <div class="mb-6">
            <h3 class="mb-3 text-sm font-semibold color: var(--text-h)">Цена: до ${{ priceRange }}</h3>
            <input type="range" min="0" max="300" v-model.number="priceRange" class="w-full accent-blue-600" />
            <div class="mt-1 flex justify-between text-xs text-gray-400">
              <span>$0</span><span>$300</span>
            </div>
          </div>
          <!-- Level -->
          <div class="mb-6">
            <h3 class="mb-3 text-sm font-semibold color: var(--text-h)">Уровень</h3>
            <div class="space-y-2">
              <label v-for="level in levels" :key="level" class="flex cursor-pointer items-center gap-3">
                <input type="radio" :value="level" v-model="selectedLevel" name="level-mobile" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span class="text-sm text-gray-700">{{ level }}</span>
              </label>
            </div>
          </div>
          <!-- Tags -->
          <div class="mb-6">
            <h3 class="mb-3 text-sm font-semibold color: var(--text-h)">Теги</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in tags"
                :key="tag"
                @click="toggleTag(tag)"
                :class="[
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
                  selectedTags.includes(tag) ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-300' : 'bg-gray-100 color: var(--text) hover:bg-gray-200'
                ]"
              >
                {{ tag }}
              </button>
            </div>
          </div>
          <div class="flex gap-3">
            <button @click="resetFilters" class="flex-1 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
              Сбросить
            </button>
            <button @click="filtersOpen = false" class="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Показать ({{ filteredCourses.length }})
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6 lg:flex-row">
        <!-- Desktop Filters Sidebar -->
        <aside class="hidden w-72 shrink-0 lg:block" aria-label="Фильтры">
          <div class="sticky top-6 space-y-6 rounded-2xl bg-transparent p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold color: var(--text-h)">Фильтры</h2>
              <span class="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600">{{ filteredCourses.length }}</span>
            </div>

            <!-- Category -->
            <div>
              <h3 class="mb-3 text-sm font-semibold color: var(--text-h)">Категория</h3>
              <div class="space-y-2.5">
                <label v-for="cat in categories" :key="cat" class="flex cursor-pointer items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50">
                  <input
                    type="checkbox"
                    :value="cat"
                    v-model="selectedCategories"
                    class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-sm text-gray-700">{{ cat }}</span>
                </label>
              </div>
            </div>

            <!-- Price -->
            <div>
              <h3 class="mb-3 text-sm font-semibold color: var(--text-h)">Цена: до ${{ priceRange }}</h3>
              <input type="range" min="0" max="300" v-model.number="priceRange" class="w-full accent-blue-600" />
              <div class="mt-1 flex justify-between text-xs text-gray-400">
                <span>$0</span><span>$300</span>
              </div>
            </div>

            <!-- Level -->
            <div>
              <h3 class="mb-3 text-sm font-semibold color: var(--text-h)">Уровень</h3>
              <div class="space-y-2.5">
                <label v-for="level in levels" :key="level" class="flex cursor-pointer items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50">
                  <input type="radio" :value="level" v-model="selectedLevel" name="level-desktop" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span class="text-sm text-gray-700">{{ level }}</span>
                </label>
              </div>
            </div>

            <!-- Tags -->
            <div>
              <h3 class="mb-3 text-sm font-semibold color: var(--text-h)">Теги</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in tags"
                  :key="tag"
                  @click="toggleTag(tag)"
                  :class="[
                    'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
                    selectedTags.includes(tag) ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-300' : 'bg-gray-100 color: var(--text) hover:bg-gray-200'
                  ]"
                >
                  {{ tag }}
                </button>
              </div>
            </div>

            <!-- Reset -->
            <button
              @click="resetFilters"
              class="w-full rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium color: var(--text) transition-colors hover:bg-gray-200"
            >
              Сбросить фильтры
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Top Bar -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-transparent p-4 shadow-sm">
            <span class="text-sm color: var(--text)">
              Найдено <span class="font-bold color: var(--text-h)">{{ filteredCourses.length }}</span> курсов
            </span>

            <div class="flex items-center gap-3">
              <select
                v-model="sortBy"
                class="rounded-lg border border-color: var(--border) bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="popular">По популярности</option>
                <option value="price-asc">По цене ↑</option>
                <option value="price-desc">По цене ↓</option>
                <option value="rating">По рейтингу</option>
              </select>

              <!-- Grid/List Toggle -->
              <div class="hidden gap-1 rounded-lg bg-gray-100 p-1 sm:flex">
                <button
                  @click="viewMode = 'grid'"
                  :class="['rounded-md p-1.5 transition-all', viewMode === 'grid' ? 'bg-transparent color: var(--text-h) shadow-sm' : 'text-gray-400 hover:color: var(--text)']"
                  aria-label="Отображение сеткой"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                    <rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" />
                    <rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" />
                  </svg>
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="['rounded-md p-1.5 transition-all', viewMode === 'list' ? 'bg-transparent color: var(--text-h) shadow-sm' : 'text-gray-400 hover:color: var(--text)']"
                  aria-label="Отображение списком"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                    <rect x="1" y="1" width="14" height="3" rx="1" /><rect x="1" y="6" width="14" height="3" rx="1" />
                    <rect x="1" y="11" width="14" height="3" rx="1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Skeleton Loading -->
          <div v-if="isLoading" :class="viewMode === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-4'">
            <div v-for="n in 6" :key="'skeleton-' + n" class="animate-pulse overflow-hidden rounded-2xl bg-transparent shadow-sm">
              <div :class="viewMode === 'list' ? 'flex' : ''">
                <div :class="[viewMode === 'list' ? 'h-40 w-48 shrink-0' : 'h-44', 'bg-gray-200']"></div>
                <div class="flex-1 p-5">
                  <div class="mb-3 h-4 w-20 rounded bg-gray-200"></div>
                  <div class="mb-2 h-5 w-3/4 rounded bg-gray-200"></div>
                  <div class="mb-4 h-3 w-full rounded bg-gray-200"></div>
                  <div class="flex items-center justify-between">
                    <div class="h-6 w-16 rounded bg-gray-200"></div>
                    <div class="h-8 w-24 rounded-lg bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Grid -->
          <div v-else>
            <div :class="viewMode === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-4'">
              <article
                v-for="course in paginatedCourses"
                :key="course.id"
                :class="[
                  'group overflow-hidden rounded-2xl bg-transparent shadow-sm transition-all duration-300 hover:shadow-lg',
                  viewMode === 'list' ? 'flex' : ''
                ]"
              >
                <!-- Image -->
                <div
                  :class="[
                    'relative overflow-hidden',
                    viewMode === 'list' ? 'hidden h-full w-48 shrink-0 sm:block' : 'h-44'
                  ]"
                >
                  <div
                    :class="[
                      'flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105',
                      course.gradient
                    ]"
                  >
                    <span class="text-5xl drop-shadow-lg">{{ course.icon }}</span>
                  </div>
                  <span
                    v-if="course.badge"
                    :class="[
                      'absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-md',
                      course.badge === 'Новинка' ? 'bg-emerald-500' : 'bg-orange-500'
                    ]"
                  >
                    {{ course.badge }}
                  </span>
                </div>

                <!-- Content -->
                <div class="flex flex-1 flex-col p-5">
                  <div class="mb-2 flex items-center gap-2">
                    <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium color: var(--text)">{{ course.category }}</span>
                    <span class="text-xs text-gray-400">{{ course.level }}</span>
                  </div>
                  <h3 class="mb-1 text-base font-bold color: var(--text-h) transition-colors group-hover:text-blue-600">
                    {{ course.title }}
                  </h3>
                  <p class="mb-4 line-clamp-2 text-sm text-gray-500">{{ course.description }}</p>

                  <!-- Rating -->
                  <div class="mb-4 flex items-center gap-2">
                    <div class="flex items-center gap-0.5">
                      <span
                        v-for="star in 5"
                        :key="star"
                        :class="star <= Math.floor(course.rating) ? 'text-amber-400' : 'text-gray-200'"
                        class="text-sm"
                      >★</span>
                    </div>
                    <span class="text-sm font-medium text-gray-700">{{ course.rating }}</span>
                    <span class="text-xs text-gray-400">({{ course.reviews }})</span>
                  </div>

                  <!-- Price + Button -->
                  <div class="mt-auto flex items-center justify-between">
                    <div class="flex items-baseline gap-2">
                      <span class="text-xl font-extrabold color: var(--text-h)">${{ course.price }}</span>
                      <span v-if="course.oldPrice" class="text-sm text-gray-400 line-through">${{ course.oldPrice }}</span>
                    </div>
                    <button class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                      Подробнее
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <!-- Empty State -->
            <div v-if="filteredCourses.length === 0" class="py-16 text-center">
              <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">🔍</div>
              <h3 class="text-lg font-bold color: var(--text-h)">Курсы не найдены</h3>
              <p class="mt-1 text-sm text-gray-500">Попробуйте изменить параметры фильтрации</p>
              <button @click="resetFilters" class="mt-4 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Сбросить фильтры
              </button>
            </div>

            <!-- Pagination -->
            <nav v-if="totalPages > 1" class="mt-8 flex items-center justify-center gap-2" aria-label="Навигация по страницам">
              <button
                @click="currentPage > 1 && (currentPage--)"
                :disabled="currentPage === 1"
                :class="[
                  'flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-all',
                  currentPage === 1 ? 'cursor-not-allowed bg-gray-50 text-gray-300' : 'bg-gray-100 color: var(--text) hover:bg-gray-200'
                ]"
                aria-label="Предыдущая страница"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <template v-for="page in paginationPages" :key="'page-' + page">
                <span v-if="page === '...'" class="flex h-10 w-10 items-center justify-center text-sm text-gray-400">...</span>
                <button
                  v-else
                  @click="currentPage = page"
                  :class="[
                    'flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all',
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-gray-100 color: var(--text) hover:bg-gray-200'
                  ]"
                  :aria-current="currentPage === page ? 'page' : undefined"
                >
                  {{ page }}
                </button>
              </template>

              <button
                @click="currentPage < totalPages && (currentPage++)"
                :disabled="currentPage === totalPages"
                :class="[
                  'flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-all',
                  currentPage === totalPages ? 'cursor-not-allowed bg-gray-50 text-gray-300' : 'bg-gray-100 color: var(--text) hover:bg-gray-200'
                ]"
                aria-label="Следующая страница"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task4_3_ECommerceCatalog',
  data() {
    return {
      filtersOpen: false,
      isLoading: false,
      viewMode: 'grid',
      sortBy: 'popular',
      currentPage: 1,
      perPage: 6,
      selectedCategories: [],
      priceRange: 300,
      selectedLevel: 'Все',
      selectedTags: [],
      categories: ['Frontend', 'Backend', 'UX/UI', 'DevOps', 'Data Science'],
      levels: ['Все', 'Начальный', 'Средний', 'Продвинутый'],
      tags: ['Vue.js', 'React', 'Python', 'Node.js', 'Figma', 'Docker'],
      courses: [
        {
          id: 1, title: 'Vue.js 3 с нуля до профи', description: 'Изучите Vue 3, Composition API, Pinia и создайте полноценное SPA-приложение с нуля.',
          category: 'Frontend', level: 'Средний', price: 149, oldPrice: 199, rating: 4.8, reviews: 342,
          icon: '💚', gradient: 'bg-gradient-to-br from-emerald-400 to-teal-500', badge: 'Хит',
          tags: ['Vue.js'], popularity: 98
        },
        {
          id: 2, title: 'React + TypeScript', description: 'Профессиональная разработка на React с TypeScript. Hooks, Redux Toolkit, тестирование.',
          category: 'Frontend', level: 'Средний', price: 169, oldPrice: 219, rating: 4.7, reviews: 287,
          icon: '⚛️', gradient: 'bg-gradient-to-br from-blue-400 to-cyan-500', badge: null,
          tags: ['React'], popularity: 95
        },
        {
          id: 3, title: 'Python для Data Science', description: 'NumPy, Pandas, Matplotlib, машинное обучение с scikit-learn и нейросети на TensorFlow.',
          category: 'Data Science', level: 'Продвинутый', price: 199, oldPrice: 249, rating: 4.9, reviews: 156,
          icon: '🐍', gradient: 'bg-gradient-to-br from-yellow-400 to-amber-500', badge: 'Новинка',
          tags: ['Python'], popularity: 90
        },
        {
          id: 4, title: 'Node.js Backend Мастер', description: 'Express, NestJS, MongoDB, PostgreSQL, WebSockets, микросервисы и деплой.',
          category: 'Backend', level: 'Средний', price: 159, oldPrice: null, rating: 4.6, reviews: 198,
          icon: '🟢', gradient: 'bg-gradient-to-br from-green-500 to-emerald-600', badge: null,
          tags: ['Node.js'], popularity: 85
        },
        {
          id: 5, title: 'UX/UI Design Pro', description: 'Проектирование интерфейсов в Figma. Дизайн-системы, прототипирование, юзабилити-тестирование.',
          category: 'UX/UI', level: 'Начальный', price: 129, oldPrice: 179, rating: 4.8, reviews: 423,
          icon: '🎨', gradient: 'bg-gradient-to-br from-violet-400 to-purple-500', badge: 'Хит',
          tags: ['Figma'], popularity: 92
        },
        {
          id: 6, title: 'DevOps с Docker и K8s', description: 'Docker, Kubernetes, CI/CD, мониторинг, инфраструктура как код с Terraform.',
          category: 'DevOps', level: 'Продвинутый', price: 219, oldPrice: 279, rating: 4.5, reviews: 112,
          icon: '🐳', gradient: 'bg-gradient-to-br from-sky-400 to-blue-600', badge: 'Новинка',
          tags: ['Docker'], popularity: 78
        },
        {
          id: 7, title: 'Fullstack на Vue + Node', description: 'Создайте полный стек приложения: Vue 3 фронтенд + Node.js бэкенд + PostgreSQL.',
          category: 'Frontend', level: 'Продвинутый', price: 249, oldPrice: 299, rating: 4.7, reviews: 89,
          icon: '🔥', gradient: 'bg-gradient-to-br from-orange-400 to-red-500', badge: null,
          tags: ['Vue.js', 'Node.js'], popularity: 82
        },
        {
          id: 8, title: 'Frontend с нуля', description: 'HTML, CSS, JavaScript — всё для старта карьеры в веб-разработке. Практические проекты.',
          category: 'Frontend', level: 'Начальный', price: 79, oldPrice: 129, rating: 4.9, reviews: 567,
          icon: '🌐', gradient: 'bg-gradient-to-br from-pink-400 to-rose-500', badge: 'Хит',
          tags: ['React', 'Vue.js'], popularity: 99
        }
      ]
    };
  },
  computed: {
    activeFilterCount() {
      let count = 0;
      if (this.selectedCategories.length > 0) count++;
      if (this.priceRange < 300) count++;
      if (this.selectedLevel !== 'Все') count++;
      if (this.selectedTags.length > 0) count++;
      return count;
    },
    filteredCourses() {
      let result = [...this.courses];

      if (this.selectedCategories.length > 0) {
        result = result.filter(c => this.selectedCategories.includes(c.category));
      }
      result = result.filter(c => c.price <= this.priceRange);
      if (this.selectedLevel !== 'Все') {
        result = result.filter(c => c.level === this.selectedLevel);
      }
      if (this.selectedTags.length > 0) {
        result = result.filter(c => c.tags.some(t => this.selectedTags.includes(t)));
      }

      switch (this.sortBy) {
        case 'price-asc': result.sort((a, b) => a.price - b.price); break;
        case 'price-desc': result.sort((a, b) => b.price - a.price); break;
        case 'rating': result.sort((a, b) => b.rating - a.rating); break;
        default: result.sort((a, b) => b.popularity - a.popularity);
      }

      return result;
    },
    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.perPage);
    },
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredCourses.slice(start, start + this.perPage);
    },
    paginationPages() {
      const total = this.totalPages;
      const current = this.currentPage;
      if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
      const pages = [];
      pages.push(1);
      if (current > 3) pages.push('...');
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        pages.push(i);
      }
      if (current < total - 2) pages.push('...');
      pages.push(total);
      return pages;
    }
  },
  watch: {
    selectedCategories() { this.currentPage = 1; },
    priceRange() { this.currentPage = 1; },
    selectedLevel() { this.currentPage = 1; },
    selectedTags() { this.currentPage = 1; },
    sortBy() { this.currentPage = 1; }
  },
  methods: {
    toggleTag(tag) {
      const idx = this.selectedTags.indexOf(tag);
      if (idx >= 0) {
        this.selectedTags.splice(idx, 1);
      } else {
        this.selectedTags.push(tag);
      }
    },
    resetFilters() {
      this.selectedCategories = [];
      this.priceRange = 300;
      this.selectedLevel = 'Все';
      this.selectedTags = [];
      this.currentPage = 1;
    }
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => { this.isLoading = false; }, 1200);
  }
};
</script>
