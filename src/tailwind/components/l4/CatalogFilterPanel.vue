<template>
  <div class="space-y-5">
    <fieldset>
      <legend class="mb-2 text-xs font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Категория</legend>
      <ul class="space-y-1" role="list">
        <li v-for="c in categories" :key="c.id">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition"
            :class="modelValue.category === c.id
              ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
              : 'text-ink-muted hover:bg-ink/5 hover:text-ink dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'"
            :aria-pressed="modelValue.category === c.id"
            @click="update('category', c.id)"
          >
            <span>{{ c.label }}</span>
            <span class="text-[11px] opacity-70">{{ c.count }}</span>
          </button>
        </li>
      </ul>
    </fieldset>

    <div>
      <p class="mb-2 flex items-center justify-between text-xs font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">
        Цена до
        <span class="font-mono text-[11px] normal-case text-brand-600 dark:text-brand-400">{{ modelValue.maxPrice }} BYN</span>
      </p>
      <input
        :value="modelValue.maxPrice"
        type="range"
        min="200"
        max="2500"
        step="50"
        aria-label="Максимальная цена"
        class="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-brand-600 dark:bg-white/10"
        @input="update('maxPrice', Number($event.target.value))"
      />
      <div class="mt-1 flex justify-between text-[10px] text-ink-muted dark:text-slate-500">
        <span>200</span><span>2500</span>
      </div>
    </div>

    <fieldset>
      <legend class="mb-2 text-xs font-bold tracking-widest text-ink-muted uppercase dark:text-slate-500">Теги</legend>
      <div class="flex flex-wrap gap-1.5">
        <label
          v-for="t in tags"
          :key="t"
          class="cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500/40"
          :class="modelValue.tags.includes(t)
            ? 'border-brand-500 bg-brand-500 text-white'
            : 'border-line text-ink-muted hover:border-brand-300 hover:text-ink dark:border-white/10 dark:text-slate-400'"
        >
          <input
            type="checkbox"
            :value="t"
            :checked="modelValue.tags.includes(t)"
            class="sr-only"
            @change="toggleTag(t)"
          />
          {{ t }}
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { categories, tags } from '../../data/catalog.js'

const props = defineProps({
  modelValue: { type: Object, required: true },
})
const emit = defineEmits(['update:modelValue'])

function update(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function toggleTag(tag) {
  const current = props.modelValue.tags
  const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]
  update('tags', next)
}
</script>
