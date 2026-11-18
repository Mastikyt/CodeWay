<template>
  <section class="bg-surface px-4 py-14 sm:px-6 dark:bg-slate-900/60 lg:px-8" aria-labelledby="landing-testimonials-title">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p class="tw-section-label">Отзывы</p>
          <h2 id="landing-testimonials-title" class="tw-section-title">Что говорят выпускники</h2>
        </div>
        <p class="text-xs text-ink-muted dark:text-slate-500">Пролистайте вбок или переходите по номерам</p>
      </div>

      <ul
        class="scrollbar-thin -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0"
        role="list"
        aria-label="Карусель отзывов"
      >
        <li
          v-for="(item, i) in testimonials"
          :id="`review-${i + 1}`"
          :key="item.name"
          class="w-[85vw] max-w-sm shrink-0 snap-center first:scroll-ml-4 sm:w-[22rem]"
        >
          <figure class="flex h-full flex-col rounded-2xl border border-line bg-canvas p-5 shadow-sm transition duration-300 hover:shadow-md dark:border-white/10 dark:bg-slate-950">
            <div class="flex gap-0.5 text-amber-400" aria-label="Оценка 5 из 5">
              <svg v-for="s in 5" :key="s" class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
            </div>
            <blockquote class="mt-3 flex-1 text-sm leading-relaxed text-ink dark:text-slate-200">
              <p>«{{ item.quote }}»</p>
            </blockquote>
            <figcaption class="mt-4 flex items-center gap-3 border-t border-line pt-4 dark:border-white/10">
              <img :src="item.avatar" :alt="item.name" width="40" height="40" loading="lazy" class="size-10 rounded-full" />
              <div class="min-w-0">
                <p class="truncate text-sm font-bold text-ink dark:text-white">{{ item.name }}</p>
                <p class="truncate text-xs text-ink-muted dark:text-slate-400">{{ item.role }}</p>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>

      <nav class="mt-2 flex justify-center gap-2" aria-label="Перейти к отзыву">
        <a
          v-for="(item, i) in testimonials"
          :key="item.name"
          :href="`#review-${i + 1}`"
          class="grid size-8 place-items-center rounded-full bg-ink/5 text-xs font-bold text-ink-muted transition hover:bg-brand-100 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-brand-500/20 dark:hover:text-brand-300"
          :aria-label="`Отзыв ${i + 1}: ${item.name}`"
        >
          {{ i + 1 }}
        </a>
      </nav>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'Игорь Мельник',
    role: 'Junior Frontend · Wargaming',
    avatar: 'https://ui-avatars.com/api/?name=Igor+Melnik&size=80&background=6366f1&color=fff',
    quote: 'Пришёл с нулевыми знаниями по вёрстке. Через полгода — оффер. Больше всего помогли код-ревью: наставник показывал, как думать о компонентах, а не просто «сделай красиво».',
  },
  {
    name: 'Екатерина Волкова',
    role: 'Frontend Developer · EPAM',
    avatar: 'https://ui-avatars.com/api/?name=Ekaterina+Volkova&size=80&background=ec4899&color=fff',
    quote: 'Формат проектов — главное преимущество. Моё портфолио на собеседовании обсуждали дольше, чем резюме. Ни одного вопроса «а что вы делали в учебных задачах?».',
  },
  {
    name: 'Павел Гринь',
    role: 'Перешёл из поддержки',
    avatar: 'https://ui-avatars.com/api/?name=Pavel+Grin&size=80&background=0ea5e9&color=fff',
    quote: 'Учился по вечерам после работы. Расписание гибкое, все записи доступны, а дедлайны держат в тонусе. Самое ценное — карьерный трек и разбор вакансий.',
  },
  {
    name: 'Наталья Романова',
    role: 'Vue-разработчик · стартап',
    avatar: 'https://ui-avatars.com/api/?name=Natalia+Romanova&size=80&background=10b981&color=fff',
    quote: 'После курса я не просто умею верстать — понимаю, почему так. Tailwind, доступность, адаптив от 320px — всё это теперь естественная часть работы.',
  },
]
</script>
