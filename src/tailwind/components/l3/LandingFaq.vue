<template>
  <section class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="landing-faq-title">
    <div class="text-center">
      <p class="tw-section-label">FAQ</p>
      <h2 id="landing-faq-title" class="tw-section-title">Частые вопросы</h2>
    </div>

    <!-- Аккордеон на <details> + group-open:* — без JS -->
    <div class="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface dark:divide-white/10 dark:border-white/10 dark:bg-slate-900">
      <details v-for="(item, i) in faq" :key="item.q" class="group" :open="i === 0">
        <summary
          class="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-ink transition hover:bg-brand-50/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500 dark:text-white dark:hover:bg-white/5 [&::-webkit-details-marker]:hidden"
        >
          {{ item.q }}
          <span class="grid size-7 shrink-0 place-items-center rounded-full bg-ink/5 text-ink-muted transition duration-300 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white dark:bg-white/10 dark:text-slate-300" aria-hidden="true">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14" stroke-linecap="round" /></svg>
          </span>
        </summary>
        <div class="px-5 pb-5 text-sm leading-relaxed text-ink-muted group-open:animate-in dark:text-slate-400">
          {{ item.a }}
        </div>
      </details>
    </div>

    <p class="mt-6 text-center text-sm text-ink-muted dark:text-slate-400">
      Остались вопросы?
      <a href="#landing-faq-title" class="font-semibold text-brand-600 hover:underline dark:text-brand-400">Напишите нам</a>
    </p>
  </section>
</template>

<script setup>
const faq = [
  {
    q: 'Нужен ли опыт в программировании?',
    a: 'Нет. Первый модуль — вводный: HTML, CSS, основы JavaScript и вёрстка по макетам. Если вы уже знаете базу, можно начать со второго модуля после теста.',
  },
  {
    q: 'Сколько времени нужно в неделю?',
    a: 'Около 12–15 часов: два вебинара по 1,5 часа, самостоятельная работа над проектом и код-ревью. Все записи доступны, дедлайны можно сдвигать в рамках модуля.',
  },
  {
    q: 'Как проходит трудоустройство?',
    a: 'С четвёртого модуля стартует карьерный трек: резюме, портфолио, разбор вакансий, пробные собеседования с HR и техлидом. Партнёры проекта регулярно публикуют вакансии для выпускников.',
  },
  {
    q: 'Можно ли оплатить частями?',
    a: 'Да, есть рассрочка на 6 и 12 месяцев без процентов, а также возможность оплатить первый модуль отдельно, чтобы попробовать формат.',
  },
  {
    q: 'Что если не получится учиться в темпе группы?',
    a: 'Можно перейти на индивидуальный план с наставником или перенести обучение на следующий поток. Доступ к материалам сохраняется на год после окончания.',
  },
]
</script>
