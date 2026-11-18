<template>
  <footer class="border-t border-line bg-canvas px-4 pt-12 pb-6 sm:px-6 dark:border-white/10 dark:bg-slate-950 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-2 gap-8 lg:grid-cols-5">
        <div class="col-span-2">
          <p class="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink dark:text-white">
            <span class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 font-mono text-sm text-white shadow-lg shadow-brand-500/30">&lt;/&gt;</span>
            CodeWay
          </p>
          <p class="mt-3 max-w-xs text-sm text-ink-muted dark:text-slate-400">
            Учим веб-разработке с 2018 года. Минск, Беларусь. Работаем онлайн по всему СНГ.
          </p>
          <form class="mt-5 flex max-w-sm gap-2" @submit.prevent>
            <label class="min-w-0 flex-1">
              <span class="sr-only">Email для рассылки</span>
              <input type="email" required placeholder="Email" class="tw-input py-2.5" />
            </label>
            <button type="submit" class="tw-btn-primary px-4">Подписаться</button>
          </form>
        </div>

        <nav v-for="group in columns" :key="group.title" :aria-labelledby="`footer-${group.title}`">
          <h2 :id="`footer-${group.title}`" class="mb-3 text-xs font-bold tracking-widest text-ink uppercase dark:text-slate-300">{{ group.title }}</h2>
          <ul class="space-y-2 text-sm">
            <li v-for="link in group.links" :key="link">
              <a href="#landing-hero-title" class="text-ink-muted transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300">{{ link }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row dark:border-white/10">
        <p class="text-xs text-ink-muted dark:text-slate-500">© {{ year }} CodeWay. Все права защищены.</p>
        <ul class="flex gap-3" role="list">
          <li v-for="social in socials" :key="social.label">
            <a href="#landing-hero-title" class="grid size-9 place-items-center rounded-full bg-ink/5 text-ink-muted transition hover:bg-brand-600 hover:text-white dark:bg-white/5 dark:text-slate-400" :aria-label="social.label">
              <svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="social.path" /></svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()

const columns = [
  { title: 'Курсы', links: ['Frontend', 'Vue-разработчик', 'React-разработчик', 'Вёрстка'] },
  { title: 'Компания', links: ['О нас', 'Преподаватели', 'Отзывы', 'Вакансии'] },
  { title: 'Помощь', links: ['FAQ', 'Контакты', 'Оплата', 'Договор оферты'] },
]

const socials = [
  { label: 'Telegram', path: 'M21.5 4.5 3 12l5 1.7L19 6.3 9.5 15v4l3-3 3.5 2.5z' },
  { label: 'YouTube', path: 'M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.5 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.5 12 31 31 0 0 0 22 8.2zM10 15V9l5 3z' },
  { label: 'GitHub', path: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.7 9.7 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z' },
]
</script>
