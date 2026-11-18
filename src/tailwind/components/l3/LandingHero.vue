<template>
  <section class="relative isolate overflow-hidden px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8" aria-labelledby="landing-hero-title">
    <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-brand-100/70 via-transparent to-transparent dark:from-brand-500/10" aria-hidden="true" />
    <div class="pointer-events-none absolute top-16 -left-24 -z-10 size-72 rounded-full bg-violet-400/30 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -right-24 top-32 -z-10 size-72 rounded-full bg-sky-400/30 blur-3xl" aria-hidden="true" />

    <div class="mx-auto max-w-3xl text-center">
      <p class="tw-badge mx-auto bg-brand-100 text-brand-700 ring-1 ring-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
        <span class="size-1.5 animate-pulse rounded-full bg-brand-500" aria-hidden="true" />
        Набор на зимний поток открыт
      </p>
      <h2 id="landing-hero-title" class="tw-section-title mt-5 text-balance text-3xl sm:text-4xl lg:text-5xl">
        Профессия <span class="text-gradient">frontend-разработчик</span> за 6 месяцев
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-base text-ink-muted text-pretty dark:text-slate-400">
        Практика на реальных проектах, код-ревью наставника и портфолио, которое заметят. Без воды и «просто посмотреть видео».
      </p>
      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a href="#landing-hero-title" class="tw-btn-primary px-6 py-3 text-base">Записаться на курс</a>
        <a href="#landing-hero-title" class="tw-btn-secondary px-6 py-3 text-base">Узнать программу</a>
      </div>

      <ul class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-ink-muted dark:text-slate-500" role="list">
        <li v-for="item in proof" :key="item" class="flex items-center gap-1.5">
          <svg class="size-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const proof = ['2 400+ выпускников', '87% нашли работу', 'Личный наставник', 'Оплата частями']
</script>
