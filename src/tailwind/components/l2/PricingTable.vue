<template>
  <div>
    <div class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h3 class="text-xl font-bold text-ink dark:text-white">Тарифы на обучение</h3>
        <p class="mt-1 text-sm text-ink-muted dark:text-slate-400">Оплата за курс целиком. Первый модуль — бесплатно.</p>
      </div>

      <!-- Переключатель периода: peer + hidden radio, без JS -->
      <fieldset class="relative inline-flex rounded-full bg-ink/5 p-1 dark:bg-white/10">
        <legend class="sr-only">Период оплаты</legend>
        <input id="billing-month" v-model="billing" type="radio" value="month" class="peer/m sr-only" />
        <input id="billing-year" v-model="billing" type="radio" value="year" class="peer/y sr-only" />
        <label
          for="billing-month"
          class="relative z-10 cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold text-ink-muted transition peer-checked/m:bg-surface peer-checked/m:text-ink peer-checked/m:shadow peer-focus-visible/m:outline-2 peer-focus-visible/m:outline-brand-500 dark:text-slate-400 dark:peer-checked/m:bg-slate-700 dark:peer-checked/m:text-white"
        >Месяц</label>
        <label
          for="billing-year"
          class="relative z-10 cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold text-ink-muted transition peer-checked/y:bg-surface peer-checked/y:text-ink peer-checked/y:shadow peer-focus-visible/y:outline-2 peer-focus-visible/y:outline-brand-500 dark:text-slate-400 dark:peer-checked/y:bg-slate-700 dark:peer-checked/y:text-white"
        >Год <span class="text-emerald-500">−20%</span></label>
      </fieldset>
    </div>

    <ul class="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-center" role="list">
      <li v-for="plan in plans" :key="plan.name">
        <article
          class="relative flex h-full flex-col rounded-2xl border p-6 transition duration-300 ease-out hover:-translate-y-1"
          :class="plan.popular
            ? 'border-transparent bg-white shadow-2xl shadow-indigo-500/20 ring-2 ring-indigo-500 lg:scale-105 dark:bg-slate-900'
            : 'border-line bg-surface shadow-sm hover:shadow-lg dark:border-white/10 dark:bg-slate-900'"
          :aria-labelledby="`plan-${plan.id}`"
        >
          <span
            v-if="plan.popular"
            class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-lg shadow-indigo-500/40"
          >
            Popular
          </span>

          <h4 :id="`plan-${plan.id}`" class="text-sm font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">{{ plan.name }}</h4>
          <p class="mt-1 text-xs text-ink-muted dark:text-slate-400">{{ plan.tagline }}</p>

          <p class="mt-5 flex items-baseline gap-1">
            <span class="text-4xl font-extrabold tracking-tight text-ink dark:text-white">{{ price(plan) }}</span>
            <span class="text-sm font-medium text-ink-muted dark:text-slate-400">BYN / {{ billing === 'month' ? 'мес.' : 'год' }}</span>
          </p>
          <p class="mt-1 text-xs text-ink-muted dark:text-slate-500">
            <template v-if="billing === 'year'">экономия {{ plan.monthly * 12 - plan.monthly * 12 * 0.8 }} BYN в год</template>
            <template v-else>без обязательств, отмена в один клик</template>
          </p>

          <ul class="mt-6 flex-1 divide-y divide-line dark:divide-white/10" role="list">
            <li
              v-for="feature in plan.features"
              :key="feature.label"
              class="flex items-start gap-3 py-2.5 text-sm"
            >
              <span
                class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-xs"
                :class="feature.included ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400' : 'bg-ink/5 text-ink-muted dark:bg-white/5 dark:text-slate-500'"
                aria-hidden="true"
              >
                <svg v-if="feature.included" class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <svg v-else class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" /></svg>
              </span>
              <span :class="feature.included ? 'text-ink dark:text-slate-200' : 'text-ink-muted line-through decoration-ink-muted/40 dark:text-slate-500'">
                {{ feature.label }}
              </span>
              <span class="sr-only">{{ feature.included ? 'включено' : 'не включено' }}</span>
            </li>
          </ul>

          <button
            type="button"
            class="tw-btn mt-6 w-full py-3"
            :class="plan.popular ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700' : 'tw-btn-secondary'"
          >
            {{ plan.cta }}
          </button>
        </article>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { plans } from '../l3/landingPlans.js'

const billing = ref('month')

function price(plan) {
  const value = billing.value === 'year' ? plan.monthly * 12 * 0.8 : plan.monthly
  return Math.round(value)
}
</script>
