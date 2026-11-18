<template>
  <section
    class="relative isolate overflow-hidden rounded-3xl bg-slate-950 px-4 py-16 text-white sm:px-8 sm:py-20 lg:px-16 lg:py-28"
    aria-labelledby="hero-title"
  >
    <!-- Фоновое изображение с overlay -->
    <img
      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2000&q=70"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 -z-20 size-full object-cover opacity-40"
      loading="lazy"
    />
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-950/80 to-brand-950/70" aria-hidden="true" />

    <!-- Декоративные blur-круги -->
    <div class="pointer-events-none absolute -top-32 -left-24 -z-10 size-72 animate-pulse rounded-full bg-purple-500/40 blur-3xl sm:size-96" aria-hidden="true" />
    <div class="pointer-events-none absolute -right-24 bottom-0 -z-10 size-72 animate-pulse rounded-full bg-pink-500/35 blur-3xl [animation-delay:1.2s] sm:size-96" aria-hidden="true" />
    <div class="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden="true" />

    <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
      <p class="animate-in inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
        <span class="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
        Новая когорта стартует 12 ноября
      </p>

      <h1
        id="hero-title"
        class="animate-in mt-6 text-4xl font-black tracking-tight text-balance [animation-delay:120ms] sm:text-5xl lg:text-6xl"
      >
        Освойте веб-разработку
        <span class="mt-2 block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
          с нуля до оффера
        </span>
      </h1>

      <p class="animate-in mt-5 max-w-xl text-base leading-relaxed text-slate-300 text-pretty [animation-delay:240ms] sm:text-lg">
        Практический курс по Vue, Tailwind и REST API. Реальные проекты, код-ревью наставника и помощь с портфолио.
      </p>

      <div class="animate-in mt-8 flex w-full flex-col gap-3 [animation-delay:360ms] sm:w-auto sm:flex-row">
        <a href="#hero-title" class="tw-btn bg-white px-6 py-3 text-base text-slate-950 shadow-xl shadow-black/20 hover:bg-brand-100 active:scale-[0.98]">
          Начать бесплатно
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </a>
        <a href="#hero-title" class="tw-btn border border-white/30 bg-white/5 px-6 py-3 text-base text-white backdrop-blur-md hover:border-white/60 hover:bg-white/15 active:scale-[0.98]">
          Смотреть программу
        </a>
      </div>

      <dl class="animate-in mt-12 grid w-full max-w-lg grid-cols-3 divide-x divide-white/15 [animation-delay:480ms]">
        <div class="px-2">
          <dd class="text-2xl font-extrabold sm:text-3xl">4.9</dd>
          <dt class="mt-1 text-xs text-slate-400">рейтинг курсов</dt>
        </div>
        <div class="px-2">
          <dd class="text-2xl font-extrabold sm:text-3xl">2 400+</dd>
          <dt class="mt-1 text-xs text-slate-400">выпускников</dt>
        </div>
        <div class="px-2">
          <dd class="text-2xl font-extrabold sm:text-3xl">87%</dd>
          <dt class="mt-1 text-xs text-slate-400">нашли работу</dt>
        </div>
      </dl>
    </div>
  </section>
</template>
