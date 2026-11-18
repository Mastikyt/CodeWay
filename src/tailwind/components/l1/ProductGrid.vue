<template>
  <div>
    <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4" role="list">
      <li v-for="product in products" :key="product.id">
        <article class="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl dark:border-white/10 dark:bg-slate-900">
          <div class="relative aspect-square overflow-hidden bg-gradient-to-br" :class="product.tint">
            <img
              :src="product.image"
              :alt="product.name"
              width="400"
              height="400"
              loading="lazy"
              class="size-full object-cover transition duration-500 ease-out group-hover:scale-110"
            />
            <span
              v-if="product.badge"
              class="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur"
            >
              {{ product.badge }}
            </span>
            <button
              type="button"
              class="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition duration-200 hover:bg-white hover:text-rose-500 active:scale-90 dark:bg-slate-800/90 dark:text-slate-200"
              :aria-label="`В избранное: ${product.name}`"
              :aria-pressed="favorites.has(product.id)"
              @click="toggleFavorite(product.id)"
            >
              <svg class="size-4.5" viewBox="0 0 24 24" :fill="favorites.has(product.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div class="flex flex-1 flex-col gap-2 p-4">
            <p class="text-xs font-semibold tracking-wide text-ink-muted uppercase dark:text-slate-500">{{ product.category }}</p>
            <h3 class="line-clamp-2 text-sm font-bold text-ink transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
              {{ product.name }}
            </h3>
            <div class="mt-auto flex items-center justify-between gap-2 pt-2">
              <p class="text-base font-extrabold text-ink dark:text-white">
                {{ product.price }} <span class="text-xs font-medium text-ink-muted dark:text-slate-400">BYN</span>
              </p>
              <div class="flex items-center gap-1" :aria-label="`Рейтинг ${product.rating} из 5`">
                <svg class="size-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
                <span class="text-xs font-semibold text-ink-muted dark:text-slate-400">{{ product.rating }}</span>
              </div>
            </div>

            <button
              type="button"
              class="tw-btn mt-2 w-full bg-ink text-surface hover:bg-brand-600 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
              :class="added.has(product.id) ? '!bg-emerald-600 !text-white' : ''"
              @click="addToCart(product.id)"
            >
              <svg v-if="!added.has(product.id)" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6h15l-1.5 9h-12zM6 6 5 3H2m5 3 1.5 9m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm9 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <svg v-else class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
              {{ added.has(product.id) ? 'В корзине' : 'В корзину' }}
            </button>
          </div>
        </article>
      </li>
    </ul>

    <p class="mt-4 text-center text-xs text-ink-muted dark:text-slate-500" aria-live="polite">
      В корзине: <strong class="text-ink dark:text-white">{{ added.size }}</strong> · В избранном: <strong class="text-ink dark:text-white">{{ favorites.size }}</strong>
    </p>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const products = [
  {
    id: 1,
    name: 'Механическая клавиатура Aurora TKL',
    category: 'Периферия',
    price: 289,
    rating: 4.8,
    badge: 'Хит',
    tint: 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 2,
    name: 'Наушники Studio Pro Wireless',
    category: 'Аудио',
    price: 459,
    rating: 4.6,
    badge: null,
    tint: 'from-indigo-100 to-sky-100 dark:from-indigo-950 dark:to-sky-950',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 3,
    name: 'Монитор 27" 4K HDR',
    category: 'Мониторы',
    price: 899,
    rating: 4.9,
    badge: 'Новинка',
    tint: 'from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 4,
    name: 'Мышь Ergo Vertical',
    category: 'Периферия',
    price: 129,
    rating: 4.3,
    badge: null,
    tint: 'from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 5,
    name: 'Микрофон Condenser X2',
    category: 'Аудио',
    price: 219,
    rating: 4.7,
    badge: '-15%',
    tint: 'from-rose-100 to-pink-100 dark:from-rose-950 dark:to-pink-950',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 6,
    name: 'Веб-камера 4K Stream',
    category: 'Видео',
    price: 179,
    rating: 4.4,
    badge: null,
    tint: 'from-violet-100 to-fuchsia-100 dark:from-violet-950 dark:to-fuchsia-950',
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=600&q=70',
  },
]

const added = reactive(new Set())
const favorites = reactive(new Set())

function addToCart(id) {
  added.has(id) ? added.delete(id) : added.add(id)
}
function toggleFavorite(id) {
  favorites.has(id) ? favorites.delete(id) : favorites.add(id)
}
</script>
