<template>
  <article
    class="mx-auto flex w-full flex-col items-center rounded-2xl bg-surface p-6 text-center shadow-lg ring-1 ring-line transition duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl focus-within:ring-2 focus-within:ring-brand-400 sm:w-80 md:mx-0 dark:bg-slate-900 dark:ring-white/10"
    aria-labelledby="profile-card-name"
  >
    <div class="relative">
      <img
        src="https://ui-avatars.com/api/?name=Anna+Kovaleva&size=160&background=6366f1&color=fff&bold=true"
        alt="Анна Ковалёва, frontend-разработчик"
        width="80"
        height="80"
        loading="lazy"
        class="size-20 rounded-full object-cover ring-4 ring-brand-100 ring-offset-2 ring-offset-surface dark:ring-brand-500/30 dark:ring-offset-slate-900"
      />
      <span class="absolute right-1 bottom-1 size-3.5 rounded-full border-2 border-surface bg-emerald-500 dark:border-slate-900" aria-hidden="true" />
      <span class="sr-only">Онлайн</span>
    </div>

    <div class="mt-4 space-y-1">
      <h2 id="profile-card-name" class="text-xl font-bold tracking-tight text-ink dark:text-white">Анна Ковалёва</h2>
      <p class="text-sm font-medium text-brand-600 dark:text-brand-400">Frontend Developer</p>
    </div>

    <p class="mt-3 text-sm leading-relaxed text-ink-muted dark:text-slate-400">
      Делаю адаптивные интерфейсы на Vue и Tailwind. Люблю дизайн-системы, доступность и чистые классы.
    </p>

    <dl class="mt-4 flex items-center gap-5 text-sm">
      <div class="flex flex-col">
        <dd class="font-bold text-ink dark:text-white">1.2k</dd>
        <dt class="text-xs text-ink-muted dark:text-slate-400">followers</dt>
      </div>
      <div class="h-8 w-px bg-line dark:bg-white/10" aria-hidden="true" />
      <div class="flex flex-col">
        <dd class="font-bold text-ink dark:text-white">128</dd>
        <dt class="text-xs text-ink-muted dark:text-slate-400">following</dt>
      </div>
    </dl>

    <div class="mt-5 flex w-full gap-3">
      <button
        type="button"
        class="tw-btn-primary flex-1"
        :aria-pressed="following"
        @click="following = !following"
      >
        <svg v-if="!following" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-linecap="round" /></svg>
        <svg v-else class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
        {{ following ? 'Following' : 'Follow' }}
      </button>
      <a href="#profile-card-name" class="tw-btn-secondary flex-1">
        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-linecap="round" stroke-linejoin="round" /></svg>
        Message
      </a>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

const following = ref(false)
</script>
