<template>
  <div class="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-sm dark:border-white/10 dark:bg-slate-900">
    <!-- Внутренний navbar: sticky работает внутри скролл-контейнера демо -->
    <div class="scrollbar-thin h-[720px] overflow-y-auto overscroll-contain">
      <nav class="sticky top-0 z-20 border-b border-line bg-surface/85 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/85" aria-label="Навигация лендинга">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#landing-hero-title" class="flex items-center gap-2 text-sm font-extrabold tracking-tight text-ink dark:text-white">
            <span class="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 font-mono text-[10px] text-white">&lt;/&gt;</span>
            CodeWay
          </a>
          <ul class="hidden items-center gap-1 md:flex">
            <li v-for="link in navLinks" :key="link.href">
              <a :href="link.href" class="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-brand-50 hover:text-brand-700 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white">
                {{ link.label }}
              </a>
            </li>
          </ul>
          <a href="#landing-cta" class="tw-btn-primary px-4 py-2 text-xs sm:text-sm">Записаться</a>
        </div>
      </nav>

      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />

      <!-- Pricing из задания 2.2 -->
      <section id="landing-pricing" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="landing-pricing-title">
        <div class="mx-auto mb-2 max-w-2xl text-center">
          <p class="tw-section-label">Стоимость</p>
          <h2 id="landing-pricing-title" class="tw-section-title">Выберите тариф</h2>
        </div>
        <PricingTable />
      </section>

      <LandingFaq />

      <!-- финальный CTA -->
      <section id="landing-cta" class="px-4 pb-14 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-brand-600 via-violet-600 to-fuchsia-600 px-6 py-12 text-center text-white shadow-2xl shadow-brand-600/30 sm:px-12">
          <h2 class="text-2xl font-black tracking-tight sm:text-3xl">Начните бесплатно уже сегодня</h2>
          <p class="mx-auto mt-2 max-w-lg text-sm text-white/85 sm:text-base">Первый модуль и вводный вебинар — без оплаты. Оцените формат и решите спокойно.</p>
          <a href="#landing-hero-title" class="tw-btn mt-6 bg-white px-6 py-3 text-base text-brand-700 shadow-xl hover:bg-brand-50 active:scale-[0.98]">
            Попробовать бесплатно
          </a>
        </div>
      </section>

      <LandingFooter />
    </div>
  </div>
</template>

<script setup>
import LandingHero from './LandingHero.vue'
import LandingFeatures from './LandingFeatures.vue'
import LandingTestimonials from './LandingTestimonials.vue'
import LandingFaq from './LandingFaq.vue'
import LandingFooter from './LandingFooter.vue'
import PricingTable from '../l2/PricingTable.vue'

const navLinks = [
  { href: '#landing-hero-title', label: 'Курс' },
  { href: '#landing-features-title', label: 'Возможности' },
  { href: '#landing-testimonials-title', label: 'Отзывы' },
  { href: '#landing-pricing', label: 'Стоимость' },
  { href: '#landing-faq-title', label: 'FAQ' },
]
</script>
