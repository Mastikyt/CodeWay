<template>
  <section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="landing-features-title">
    <div class="mx-auto max-w-2xl text-center">
      <p class="tw-section-label">Почему CodeWay</p>
      <h2 id="landing-features-title" class="tw-section-title">Не курс, а рабочая среда</h2>
      <p class="tw-section-lead mx-auto">Три компонента, из которых складывается результат.</p>
    </div>

    <ul class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
      <li v-for="(feature, i) in features" :key="feature.title">
        <article class="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900 dark:hover:border-brand-500/40">
          <span class="absolute top-4 right-5 font-mono text-xs font-bold text-ink-muted/40 dark:text-slate-600">0{{ i + 1 }}</span>
          <span class="grid size-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:-rotate-3" :class="feature.tint">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path :d="feature.icon" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <h3 class="mt-5 text-lg font-bold text-ink dark:text-white">{{ feature.title }}</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-ink-muted dark:text-slate-400">{{ feature.text }}</p>
          <p class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
            Подробнее
            <svg class="size-4 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </p>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup>
const features = [
  {
    title: 'Проекты вместо конспектов',
    text: 'С первого модуля вы собираете интерфейсы: карточки, дашборды, каталоги. К концу курса — 3 проекта в портфолио.',
    icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    tint: 'from-brand-500 to-violet-600',
  },
  {
    title: 'Код-ревью наставника',
    text: 'Каждую неделю наставник разбирает ваш код: не только «работает/не работает», но как читается, масштабируется и верстается.',
    icon: 'M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8-18h3a2 2 0 0 1 2 2v3m0 8v3a2 2 0 0 1-2 2h-3M9 12l2 2 4-4',
    tint: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Карьерный трек',
    text: 'Резюме, портфолио, пробные собеседования и разбор вакансий — вы уходите не только с новыми навыками.',
    icon: 'M12 2 4 6v6c0 5 3.4 9.3 8 10 4.6-.7 8-5 8-10V6zM9 12l2 2 4-4',
    tint: 'from-amber-500 to-orange-600',
  },
]
</script>
