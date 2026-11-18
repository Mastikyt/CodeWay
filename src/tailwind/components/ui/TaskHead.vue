<template>
  <div class="tw-task-head">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <span class="tw-badge bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">{{ number }}</span>
          <h2 :id="headingId" class="tw-task-head-title">{{ title }}</h2>
        </div>
        <p v-if="note" class="tw-task-head-note">{{ note }}</p>
      </div>
      <ul v-if="tags?.length" class="flex flex-wrap gap-1.5" aria-label="Ключевые приёмы">
        <li v-for="tag in tags" :key="tag" class="rounded-md bg-ink/5 px-2 py-1 font-mono text-[11px] text-ink-muted dark:bg-white/5 dark:text-slate-400">
          {{ tag }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  headingId: { type: String, default: undefined },
  number: { type: String, default: '' },
  title: { type: String, required: true },
  note: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
})
</script>
