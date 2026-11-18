<template>
  <div class="min-h-dvh bg-canvas text-ink transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
    <a
      href="#tw-main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      Перейти к содержимому
    </a>

    <SiteHeader />

    <main id="tw-main" tabindex="-1" class="focus:outline-none">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
</script>
