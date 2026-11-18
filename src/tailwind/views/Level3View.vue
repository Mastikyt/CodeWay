<template>
  <LevelShell
    level="3"
    title="Продвинутый: реальные интерфейсы"
    lead="Мессенджер со стилизованными скроллбарами, Kanban с drag-and-drop и snap-скроллом, полный лендинг из секций и тёмная тема по классу."
    :chips="['[&::-webkit-scrollbar]:*', 'snap-x snap-mandatory', 'group-open:*', 'darkMode: class', '@apply']"
  >
    <section id="task-3-1" aria-labelledby="t31">
      <TaskHead
        number="3.1"
        title="Мессенджер (макет)"
        note="Список диалогов с unread-бейджами, область сообщений (свои — справа синие, чужие — слева серые), поле ввода с кнопкой отправки, стилизованные скроллбары."
        :tags="['flex', 'overflow-y-auto', 'sticky bottom-0', 'scrollbar-thin', '[&::-webkit-scrollbar]:w-2']"
        heading-id="t31"
      />
      <Messenger />
    </section>

    <section id="task-3-2" aria-labelledby="t32">
      <TaskHead
        number="3.2"
        title="Kanban-доска"
        note="Три колонки с карточками, тегами, приоритетом и аватарами. На мобильных — горизонтальный скролл со snap, drag-handle появляется при наведении/фокусе, drag-and-drop работает."
        :tags="['snap-x snap-mandatory', 'min-w-[300px]', 'group-hover:*', 'line-clamp-2', 'overflow-x-auto']"
        heading-id="t32"
      />
      <KanbanBoard />
    </section>

    <section id="task-3-3" aria-labelledby="t33">
      <TaskHead
        number="3.3"
        title="Комплексный лендинг"
        note="Navbar (sticky внутри скролла), Hero с CTA, Features в 3 колонки, Testimonials-карусель на snap без JS, Pricing, FAQ-аккордеон на <details> + group-open, Footer из 4 колонок. Повторяющиеся классы — в @apply."
        :tags="['@apply', '@layer components', 'details + group-open:*', 'snap carousel']"
        heading-id="t33"
      />
      <LandingPage />
    </section>

    <section id="task-3-4" aria-labelledby="t34">
      <TaskHead
        number="3.4"
        title="Dark mode с переключателем"
        note="Тема переключается кнопкой с иконками солнца/луны, класс dark висит на <html> (darkMode: 'class' в терминах v4 — @custom-variant). Кнопка в шапке страницы тоже работает."
        :tags="['@custom-variant dark', 'dark:bg-slate-900', 'dark:text-slate-100', 'transition-colors']"
        heading-id="t34"
      />
      <DarkModeShowcase />
    </section>
  </LevelShell>
</template>

<script setup>
import LevelShell from '../components/ui/LevelShell.vue'
import TaskHead from '../components/ui/TaskHead.vue'
import Messenger from '../components/l3/Messenger.vue'
import KanbanBoard from '../components/l3/KanbanBoard.vue'
import LandingPage from '../components/l3/LandingPage.vue'
import DarkModeShowcase from '../components/l3/DarkModeShowcase.vue'
</script>
