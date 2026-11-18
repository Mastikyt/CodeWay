<template>
  <!-- Мессенджер: 2 колонки, на мобильных — переключение список/диалог -->
  <div class="flex h-[520px] overflow-hidden rounded-2xl border border-line bg-surface shadow-lg dark:border-white/10 dark:bg-slate-900 sm:h-[560px]">
    <!-- Список диалогов -->
    <aside
      class="flex w-full shrink-0 flex-col border-line sm:w-72 md:w-80 dark:border-white/10"
      :class="showDialog ? 'hidden sm:flex sm:border-r' : 'flex'"
      aria-label="Список диалогов"
    >
      <div class="border-b border-line p-3 dark:border-white/10">
        <div class="mb-3 flex items-center justify-between">
          <h3 class="text-sm font-bold text-ink dark:text-white">Сообщения</h3>
          <span class="tw-badge bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">{{ totalUnread }}</span>
        </div>
        <label class="relative block">
          <span class="sr-only">Поиск по диалогам</span>
          <svg class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" stroke-linecap="round" /></svg>
          <input v-model="query" type="search" placeholder="Поиск…" class="tw-input py-2 pl-9 text-sm" />
        </label>
      </div>

      <ul class="scrollbar-thin flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2" role="list">
        <li v-for="dialog in filteredDialogs" :key="dialog.id">
          <button
            type="button"
            class="group flex w-full items-start gap-3 border-b border-line/70 px-3 py-3 text-left transition duration-150 hover:bg-brand-50/70 focus-visible:bg-brand-50 focus-visible:outline-none dark:border-white/5 dark:hover:bg-white/5"
            :class="dialog.id === activeId ? 'bg-brand-50 dark:bg-brand-500/10' : ''"
            :aria-current="dialog.id === activeId ? 'true' : undefined"
            @click="openDialog(dialog.id)"
          >
            <span class="relative shrink-0">
              <img :src="dialog.avatar" :alt="dialog.name" width="44" height="44" loading="lazy" class="size-11 rounded-full object-cover" />
              <span v-if="dialog.online" class="absolute right-0 bottom-0 size-3 rounded-full border-2 border-surface bg-emerald-500 dark:border-slate-900" aria-label="онлайн" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="flex items-center justify-between gap-2">
                <span class="truncate text-sm font-semibold text-ink dark:text-white">{{ dialog.name }}</span>
                <span class="shrink-0 text-[11px] text-ink-muted dark:text-slate-500">{{ dialog.time }}</span>
              </span>
              <span class="mt-0.5 flex items-center justify-between gap-2">
                <span class="truncate text-xs text-ink-muted dark:text-slate-400">{{ dialog.preview }}</span>
                <span v-if="dialog.unread" class="grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">{{ dialog.unread }}</span>
              </span>
            </span>
          </button>
        </li>
        <li v-if="!filteredDialogs.length" class="p-6 text-center text-sm text-ink-muted dark:text-slate-500">
          Ничего не найдено
        </li>
      </ul>
    </aside>

    <!-- Область сообщений -->
    <section class="flex min-w-0 flex-1 flex-col" :class="showDialog ? 'flex' : 'hidden sm:flex'" aria-label="Диалог">
      <!-- Шапка диалога -->
      <header class="flex items-center gap-3 border-b border-line px-3 py-2.5 dark:border-white/10">
        <button
          type="button"
          class="grid size-9 place-items-center rounded-lg text-ink-muted hover:bg-ink/5 sm:hidden dark:hover:bg-white/10"
          aria-label="Назад к списку диалогов"
          @click="showDialog = false"
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <img :src="active.avatar" :alt="active.name" width="36" height="36" class="size-9 rounded-full object-cover" />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-bold text-ink dark:text-white">{{ active.name }}</p>
          <p class="truncate text-[11px]" :class="active.online ? 'text-emerald-600 dark:text-emerald-400' : 'text-ink-muted dark:text-slate-500'">
            {{ active.online ? 'в сети' : active.role }}
          </p>
        </div>
        <button type="button" class="grid size-9 place-items-center rounded-lg text-ink-muted hover:bg-ink/5 dark:text-slate-400 dark:hover:bg-white/10" aria-label="Информация о собеседнике">
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4m0-4h.01" stroke-linecap="round" /></svg>
        </button>
      </header>

      <!-- Сообщения -->
      <div ref="scrollBox" class="scrollbar-thin flex-1 space-y-3 overflow-y-auto bg-canvas/60 p-3 sm:p-4 dark:bg-slate-950/40">
        <p class="mx-auto w-fit rounded-full bg-ink/5 px-3 py-1 text-[11px] font-medium text-ink-muted dark:bg-white/5 dark:text-slate-400">Сегодня</p>

        <div
          v-for="(message, i) in active.messages"
          :key="message.id"
          class="flex items-end gap-2 animate-in-slow"
          :class="message.mine ? 'flex-row-reverse' : ''"
        >
          <img v-if="!message.mine" :src="active.avatar" alt="" width="28" height="28" class="size-7 shrink-0 rounded-full object-cover" />
          <div
            class="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm sm:max-w-[70%]"
            :class="message.mine
              ? 'rounded-br-md bg-blue-600 text-white'
              : 'rounded-bl-md bg-ink/5 text-ink dark:bg-white/10 dark:text-slate-100'"
          >
            <p class="leading-relaxed">{{ message.text }}</p>
            <p class="mt-1 flex items-center justify-end gap-1 text-[10px]" :class="message.mine ? 'text-blue-100/80' : 'text-ink-muted dark:text-slate-400'">
              {{ message.time }}
              <svg v-if="message.mine" class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-label="прочитано"><path d="m1 13 4 4L15 7M9 13l4 4L23 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </p>
          </div>
        </div>

        <!-- Индикатор набора -->
        <div v-if="typing" class="flex items-end gap-2">
          <img :src="active.avatar" alt="" width="28" height="28" class="size-7 rounded-full object-cover" />
          <div class="flex gap-1 rounded-2xl rounded-bl-md bg-ink/5 px-4 py-3 dark:bg-white/10" aria-label="Собеседник печатает">
            <span v-for="d in [0, 1, 2]" :key="d" class="size-1.5 animate-bounce rounded-full bg-ink-muted dark:bg-slate-400" :style="{ animationDelay: `${d * 0.15}s` }" />
          </div>
        </div>
      </div>

      <!-- Поле ввода -->
      <form class="sticky bottom-0 flex items-end gap-2 border-t border-line bg-surface p-3 dark:border-white/10 dark:bg-slate-900" @submit.prevent="send">
        <label class="min-w-0 flex-1">
          <span class="sr-only">Текст сообщения</span>
          <textarea
            v-model="draft"
            rows="1"
            placeholder="Написать сообщение…"
            class="tw-input max-h-28 resize-none py-2.5"
            @keydown.enter.exact.prevent="send"
            @input="autoGrow"
            ref="textarea"
          />
        </label>
        <button type="submit" class="tw-btn-primary grid size-11 shrink-0 place-items-center rounded-xl p-0" :disabled="!draft.trim()" aria-label="Отправить">
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4z" stroke-linecap="round" stroke-linejoin="round" /><path d="M22 2 11 13" stroke-linecap="round" /></svg>
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { dialogs } from '../../data/chat.js'

const list = ref(dialogs.map((d) => ({ ...d, messages: [...d.messages] })))
const activeId = ref(1)
const showDialog = ref(false)
const query = ref('')
const draft = ref('')
const typing = ref(false)
const scrollBox = ref(null)
const textarea = ref(null)

const active = computed(() => list.value.find((d) => d.id === activeId.value) ?? list.value[0])
const totalUnread = computed(() => list.value.reduce((sum, d) => sum + d.unread, 0))
const filteredDialogs = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return list.value
  return list.value.filter((d) => d.name.toLowerCase().includes(q) || d.preview.toLowerCase().includes(q))
})

function scrollToBottom() {
  nextTick(() => {
    if (scrollBox.value) scrollBox.value.scrollTop = scrollBox.value.scrollHeight
  })
}

function openDialog(id) {
  activeId.value = id
  showDialog.value = true
  const dialog = list.value.find((d) => d.id === id)
  if (dialog) dialog.unread = 0
  scrollToBottom()
}

function send() {
  const text = draft.value.trim()
  if (!text) return
  active.value.messages.push({ id: Date.now(), mine: true, text, time: 'сейчас' })
  active.value.preview = text
  draft.value = ''
  if (textarea.value) textarea.value.style.height = 'auto'
  scrollToBottom()

  typing.value = true
  setTimeout(() => {
    typing.value = false
    active.value.messages.push({ id: Date.now() + 1, mine: false, text: 'Принято 👍', time: 'сейчас' })
    scrollToBottom()
  }, 1400)
}

function autoGrow(event) {
  const el = event.target
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 112)}px`
}

watch(activeId, scrollToBottom)
onMounted(scrollToBottom)
</script>
