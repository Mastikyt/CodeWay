<template>
  <div>
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 class="text-lg font-bold text-ink dark:text-white">Tailwind-спринт · 28–31 октября</h3>
        <p class="text-xs text-ink-muted dark:text-slate-400">Карточки можно перетаскивать между колонками</p>
      </div>
      <div class="flex items-center gap-2 text-xs text-ink-muted dark:text-slate-400">
        <span class="rounded-full bg-ink/5 px-2.5 py-1 dark:bg-white/5">{{ total }} задач · {{ doneCount }} готово</span>
        <button type="button" class="tw-btn-secondary px-3 py-1.5 text-xs">+ Новая задача</button>
      </div>
    </div>

    <!-- Горизонтальный скролл + snap -->
    <div
      class="scrollbar-thin -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 sm:mx-0 sm:px-0"
      role="region"
      aria-label="Kanban-доска"
    >
      <section
        v-for="column in board"
        :key="column.id"
        class="flex w-[86vw] max-w-[340px] shrink-0 snap-start flex-col rounded-2xl bg-ink/[0.03] p-3 ring-1 ring-line dark:bg-white/[0.03] dark:ring-white/10 sm:w-auto sm:min-w-[300px] sm:flex-1"
        :aria-labelledby="`col-${column.id}`"
        @dragover.prevent
        @drop="dropOn(column.id)"
      >
        <header class="mb-3 flex items-center justify-between px-1">
          <h4 :id="`col-${column.id}`" class="flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
            <span class="size-2.5 rounded-full" :class="column.dot" aria-hidden="true" />
            {{ column.title }}
          </h4>
          <span class="rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-ink-muted ring-1 ring-line dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10">
            {{ column.tasks.length }}
          </span>
        </header>

        <div class="flex-1 space-y-3">
          <article
            v-for="task in column.tasks"
            :key="task.id"
            draggable="true"
            class="group cursor-grab rounded-xl border-l-4 bg-surface p-3.5 shadow-sm ring-1 ring-line transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing dark:bg-slate-900 dark:ring-white/10"
            :class="[priorityStyles[task.priority].border, draggingId === task.id ? 'rotate-1 opacity-50 ring-2 ring-brand-400' : '']"
            @dragstart="startDrag(task, column.id)"
            @dragend="draggingId = null"
          >
            <div class="mb-2 flex items-start justify-between gap-2">
              <span class="tw-badge" :class="priorityStyles[task.priority].badge">
                <span class="size-1.5 rounded-full" :class="priorityStyles[task.priority].dot" aria-hidden="true" />
                {{ priorityStyles[task.priority].label }}
              </span>
              <!-- drag-handle -->
              <span
                class="grid size-6 place-items-center rounded text-ink-muted/50 opacity-100 transition group-hover:text-ink-muted sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100 dark:text-slate-500"
                aria-hidden="true"
                title="Перетащить"
              >
                <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6" /><circle cx="15" cy="6" r="1.6" /><circle cx="9" cy="12" r="1.6" /><circle cx="15" cy="12" r="1.6" /><circle cx="9" cy="18" r="1.6" /><circle cx="15" cy="18" r="1.6" /></svg>
              </span>
            </div>

            <h5 class="line-clamp-2 text-sm leading-snug font-semibold text-ink transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
              {{ task.title }}
            </h5>

            <ul class="mt-2.5 flex flex-wrap gap-1.5">
              <li v-for="tag in task.tags" :key="tag" class="rounded px-1.5 py-0.5 text-[11px] font-medium" :class="tagStyles[tag] || 'bg-ink/5 text-ink-muted dark:bg-white/5 dark:text-slate-400'">
                {{ tag }}
              </li>
            </ul>

            <footer class="mt-3 flex items-center justify-between border-t border-line pt-2.5 dark:border-white/10">
              <img :src="task.assignee" alt="Исполнитель" width="24" height="24" class="size-6 rounded-full ring-2 ring-surface dark:ring-slate-900" />
              <div class="flex items-center gap-3 text-[11px] text-ink-muted dark:text-slate-500">
                <span class="flex items-center gap-1">
                  <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  {{ task.comments }}
                </span>
                <span class="flex items-center gap-1" :class="task.due === 'сегодня' ? 'font-semibold text-rose-500' : ''">
                  <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" stroke-linecap="round" /></svg>
                  {{ task.due }}
                </span>
              </div>
            </footer>
          </article>

          <p v-if="!column.tasks.length" class="rounded-xl border-2 border-dashed border-line p-6 text-center text-xs text-ink-muted dark:border-white/10 dark:text-slate-500">
            Перетащите задачу сюда
          </p>
        </div>

        <button type="button" class="mt-3 w-full rounded-lg border border-dashed border-line py-2 text-xs font-semibold text-ink-muted transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-brand-300">
          + Добавить задачу
        </button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { columns, priorityStyles, tagStyles } from '../../data/kanban.js'

const board = ref(columns.map((c) => ({ ...c, tasks: [...c.tasks] })))
const draggingId = ref(null)

const total = computed(() => board.value.reduce((n, c) => n + c.tasks.length, 0))
const doneCount = computed(() => board.value.find((c) => c.id === 'done')?.tasks.length ?? 0)

let dragged = null

function startDrag(task, fromColumn) {
  draggingId.value = task.id
  dragged = { task, fromColumn }
}

function dropOn(toColumn) {
  if (!dragged) return
  const { task, fromColumn } = dragged
  if (fromColumn === toColumn) return
  const source = board.value.find((c) => c.id === fromColumn)
  const target = board.value.find((c) => c.id === toColumn)
  source.tasks = source.tasks.filter((t) => t.id !== task.id)
  target.tasks.push(task)
  dragged = null
  draggingId.value = null
}
</script>
