<template>
  <!--
    Бургер-меню — без JS: чекбокс + peer.
    На мобильных меню раскрывается под навбаром, на md+ — по центру (md:flex).
  -->
  <div class="relative">
    <input id="demo-nav-toggle" type="checkbox" class="peer sr-only" aria-label="Открыть меню" />

    <nav
      class="sticky top-16 z-50 border-b border-line bg-surface/80 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80"
      aria-label="Демонстрационный навбар"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#demo-nav-toggle" class="flex items-center gap-2 font-bold tracking-tight text-ink dark:text-white">
          <span class="grid size-8 place-items-center rounded-lg bg-ink text-xs font-black text-surface dark:bg-white dark:text-slate-900">&lt;/&gt;</span>
          Nexus
        </a>

        <!-- Меню (десктоп) -->
        <ul class="hidden items-center gap-1 md:flex">
          <li v-for="item in items" :key="item">
            <a
              :href="`#demo-nav-toggle`"
              class="relative block rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition duration-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              :aria-current="item === active ? 'page' : undefined"
              @click="active = item"
            >
              {{ item }}
              <span
                v-if="item === active"
                class="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <a href="#demo-nav-toggle" class="hidden text-sm font-medium text-ink-muted transition hover:text-ink sm:inline dark:text-slate-300 dark:hover:text-white">Войти</a>
          <a href="#demo-nav-toggle" class="tw-btn-primary px-4 py-2">Sign In</a>

          <!-- Кнопка-бургер (мобильные) -->
          <label
            for="demo-nav-toggle"
            class="grid size-10 cursor-pointer place-items-center rounded-lg border border-line text-ink transition hover:bg-ink/5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-500 md:hidden dark:border-white/10 dark:text-white dark:hover:bg-white/10"
          >
            <span class="sr-only">Открыть меню</span>
            <svg class="size-5 peer-checked:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
            </svg>
          </label>
        </div>
      </div>

    </nav>

    <!-- Выпадающее меню — сосед peer-чекбокса, иначе peer-checked не срабатывает -->
    <ul
      class="grid max-h-0 overflow-hidden border-t border-transparent bg-surface/95 pr-0 backdrop-blur-md transition-[max-height,border-color] duration-300 ease-out peer-checked:max-h-80 peer-checked:border-line md:hidden dark:bg-slate-900/95 dark:peer-checked:border-white/10"
      aria-label="Мобильное меню"
    >
      <li v-for="item in items" :key="`m-${item}`" class="border-b border-line/60 last:border-0 dark:border-white/5">
        <a
          href="#demo-nav-toggle"
          class="block px-4 py-3 text-sm font-medium text-ink-muted transition hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
          @click="active = item"
        >
          {{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ['Home', 'About', 'Services', 'Contact']
const active = ref('Home')
</script>
