<template>
  <div>
    <section class="relative isolate overflow-hidden border-b border-line bg-surface dark:border-white/10 dark:bg-slate-950">
      <div class="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-brand-400/20 blur-3xl" aria-hidden="true" />
      <div class="pointer-events-none absolute -bottom-32 left-1/4 size-72 rounded-full bg-fuchsia-400/15 blur-3xl" aria-hidden="true" />
      <div class="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <nav aria-label="Хлебные крошки" class="mb-5">
          <ol class="flex items-center gap-2 text-xs font-medium text-ink-muted dark:text-slate-400">
            <li><RouterLink to="/tailwind" class="hover:text-brand-600 dark:hover:text-brand-300">Задания</RouterLink></li>
            <li aria-hidden="true">/</li>
            <li class="text-ink dark:text-slate-200" aria-current="page">Уровень {{ level }}</li>
          </ol>
        </nav>
        <p class="tw-section-label">Уровень {{ level }}</p>
        <h1 class="tw-section-title text-balance sm:text-4xl">{{ title }}</h1>
        <p class="tw-section-lead">{{ lead }}</p>

        <ul class="mt-6 flex flex-wrap gap-2">
          <li v-for="chip in chips" :key="chip" class="tw-badge border border-line bg-surface-elevated text-ink-muted dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            {{ chip }}
          </li>
        </ul>
      </div>
    </section>

    <div class="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  level: { type: [String, Number], required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  chips: { type: Array, default: () => [] },
})
</script>
