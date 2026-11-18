<template>
  <div class="rounded-2xl border border-line bg-surface p-4 sm:p-5 dark:border-white/10 dark:bg-slate-900">
    <!-- Заголовок + сортировка -->
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 class="text-lg font-bold text-ink dark:text-white">Каталог курсов</h3>
        <p class="text-xs text-ink-muted dark:text-slate-400" aria-live="polite">
          Найдено <strong class="text-ink dark:text-white">{{ filtered.length }}</strong> из {{ products.length }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="tw-btn-secondary px-3 py-2 text-xs lg:hidden"
          :aria-expanded="drawerOpen"
          aria-controls="catalog-drawer"
          @click="drawerOpen = true"
        >
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M6 12h12M10 18h4" stroke-linecap="round" /></svg>
          Фильтры
          <span v-if="activeFilterCount" class="grid size-5 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">{{ activeFilterCount }}</span>
        </button>
        <label class="flex items-center gap-2 text-xs text-ink-muted dark:text-slate-400">
          <span class="hidden sm:inline">Сортировка:</span>
          <select v-model="sort" class="tw-input w-auto py-2 pr-8 text-xs">
            <option value="popular">По популярности</option>
            <option value="cheap">Сначала дешёвые</option>
            <option value="expensive">Сначала дорогие</option>
            <option value="rating">По рейтингу</option>
          </select>
        </label>
        <button type="button" class="tw-btn-secondary hidden px-3 py-2 text-xs sm:inline-flex" @click="toggleLoading">
          {{ loading ? 'Показано' : 'Показать skeleton' }}
        </button>
      </div>
    </div>

    <div class="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
      <!-- Фильтры (десктоп) -->
      <aside class="hidden lg:block" aria-label="Фильтры каталога">
        <FilterPanel v-model="filters" />
      </aside>

      <!-- Сетка товаров -->
      <div class="min-w-0">
        <!-- Skeleton -->
        <div v-if="loading" class="@container grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
          <div v-for="i in 6" :key="i" class="overflow-hidden rounded-xl border border-line dark:border-white/10">
            <div class="aspect-[4/3] animate-pulse bg-ink/10 dark:bg-white/10" />
            <div class="space-y-2 p-3">
              <div class="h-3 w-1/3 animate-pulse rounded bg-ink/10 dark:bg-white/10" />
              <div class="h-4 w-4/5 animate-pulse rounded bg-ink/10 dark:bg-white/10" />
              <div class="h-3 w-1/2 animate-pulse rounded bg-ink/10 dark:bg-white/10" />
            </div>
          </div>
        </div>

        <!-- Пустое состояние -->
        <div v-else-if="!filtered.length" class="grid place-items-center rounded-xl border-2 border-dashed border-line py-16 text-center dark:border-white/10">
          <svg class="size-10 text-ink-muted/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" stroke-linecap="round" /></svg>
          <p class="mt-3 text-sm font-semibold text-ink dark:text-white">Ничего не нашлось</p>
          <p class="mt-1 text-xs text-ink-muted dark:text-slate-400">Попробуйте изменить фильтры или цену</p>
          <button type="button" class="tw-btn-secondary mt-4 px-3 py-1.5 text-xs" @click="resetFilters">Сбросить фильтры</button>
        </div>

        <!-- Карточки: container queries -->
        <ul v-else class="@container grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" role="list">
          <li v-for="p in pageItems" :key="p.id">
            <article class="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/40">
              <div class="relative aspect-[4/3] overflow-hidden @sm:aspect-[16/10]">
                <img :src="p.image" :alt="p.title" width="720" height="480" loading="lazy" class="size-full object-cover transition duration-500 group-hover:scale-105" />
                <span class="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-ink backdrop-blur">{{ p.level }}</span>
                <span v-if="p.seats <= 3" class="absolute top-2 right-2 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">осталось {{ p.seats }}</span>
              </div>
              <div class="flex flex-1 flex-col p-3">
                <p class="text-[10px] font-bold tracking-widest text-brand-600 uppercase dark:text-brand-400">{{ p.tag }}</p>
                <h4 class="mt-1 line-clamp-2 text-sm font-bold text-ink transition group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">{{ p.title }}</h4>
                <p class="mt-1 flex items-center gap-1 text-xs text-ink-muted dark:text-slate-400">
                  <svg class="size-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
                  {{ p.rating }} · {{ p.reviews }} отзывов
                </p>
                <div class="mt-auto flex items-center justify-between gap-2 pt-3">
                  <p class="text-base font-extrabold text-ink dark:text-white">{{ p.price }} <span class="text-xs font-medium text-ink-muted">BYN</span></p>
                  <button type="button" class="tw-btn-primary px-3 py-1.5 text-xs">Записаться</button>
                </div>
              </div>
            </article>
          </li>
        </ul>

        <!-- Пагинация -->
        <nav v-if="!loading && pageCount > 1" class="mt-5 flex items-center justify-center gap-1" aria-label="Страницы каталога">
          <button type="button" class="grid size-8 place-items-center rounded-lg border border-line text-ink-muted transition hover:bg-ink/5 disabled:opacity-40 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5" :disabled="page === 1" aria-label="Предыдущая страница" @click="page--">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke-linecap="round" /></svg>
          </button>
          <button
            v-for="n in pageCount"
            :key="n"
            type="button"
            class="grid size-8 place-items-center rounded-lg text-xs font-semibold transition"
            :class="n === page ? 'bg-brand-600 text-white shadow-sm' : 'text-ink-muted hover:bg-ink/5 dark:text-slate-400 dark:hover:bg-white/5'"
            :aria-current="n === page ? 'page' : undefined"
            @click="page = n"
          >
            {{ n }}
          </button>
          <button type="button" class="grid size-8 place-items-center rounded-lg border border-line text-ink-muted transition hover:bg-ink/5 disabled:opacity-40 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5" :disabled="page === pageCount" aria-label="Следующая страница" @click="page++">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6" stroke-linecap="round" /></svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- Мобильный drawer -->
    <div v-if="drawerOpen" class="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity lg:hidden" aria-hidden="true" @click="drawerOpen = false" />
    <div
      id="catalog-drawer"
      class="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-line bg-surface p-5 shadow-2xl transition-transform duration-300 ease-out lg:hidden dark:border-white/10 dark:bg-slate-900"
      :class="drawerOpen ? 'translate-y-0' : 'translate-y-full'"
      role="dialog"
      aria-modal="true"
      aria-label="Фильтры каталога"
      :aria-hidden="!drawerOpen"
    >
      <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink/15 dark:bg-white/20" aria-hidden="true" />
      <div class="mb-4 flex items-center justify-between">
        <h4 class="text-base font-bold text-ink dark:text-white">Фильтры</h4>
        <button type="button" class="rounded-lg p-2 text-ink-muted hover:bg-ink/5 dark:text-slate-400 dark:hover:bg-white/10" aria-label="Закрыть фильтры" @click="drawerOpen = false">
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" /></svg>
        </button>
      </div>
      <div v-show="drawerOpen">
        <FilterPanel v-model="filters" />
      </div>
      <div class="mt-5 flex gap-2">
        <button type="button" class="tw-btn-secondary flex-1" @click="resetFilters">Сбросить</button>
        <button type="button" class="tw-btn-primary flex-1" @click="drawerOpen = false">Показать ({{ filtered.length }})</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import FilterPanel from './CatalogFilterPanel.vue'
import { products } from '../../data/catalog.js'

const DEFAULT_FILTERS = { category: 'all', tags: [], maxPrice: 2500 }

// Одно состояние фильтров для сайдбара и мобильного drawer
const filters = ref({ category: 'all', tags: [], maxPrice: 2500 })
const sort = ref('popular')
const page = ref(1)
const perPage = 6
const loading = ref(false)
const drawerOpen = ref(false)

const filtered = computed(() => {
  const { category, tags, maxPrice } = filters.value
  const list = products.filter((p) => {
    const byCategory = category === 'all' || p.category === category
    const byPrice = p.price <= maxPrice
    const byTag = !tags.length || tags.includes(p.tag)
    return byCategory && byPrice && byTag
  })
  const sorters = {
    popular: (a, b) => b.reviews - a.reviews,
    cheap: (a, b) => a.price - b.price,
    expensive: (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
  }
  return [...list].sort(sorters[sort.value])
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const pageItems = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
const activeFilterCount = computed(() => {
  const { category, tags, maxPrice } = filters.value
  return (category !== 'all' ? 1 : 0) + tags.length + (maxPrice < DEFAULT_FILTERS.maxPrice ? 1 : 0)
})

watch([filters, sort], () => (page.value = 1), { deep: true })
watch(pageCount, (n) => {
  if (n < page.value) page.value = n
})

function resetFilters() {
  filters.value = { ...DEFAULT_FILTERS, tags: [] }
  sort.value = 'popular'
}

function toggleLoading() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1200)
}
</script>
