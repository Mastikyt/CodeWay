<template>
  <LevelShell
    level="4"
    title="Экспертный: сложные интерфейсы"
    lead="Аналитический дашборд на grid-cols-12, многошаговая форма с aria и has-[:checked], e-commerce каталог с container queries и drawer, мини-дизайн-система с документацией."
    :chips="['grid-cols-12 · col-span-*', 'min-w-0 · truncate', 'has-[:checked]:*', '@container', 'translate-y-full']"
  >
    <section id="task-4-1" aria-labelledby="t41">
      <TaskHead
        number="4.1"
        title="Дашборд аналитики"
        note="Sidebar + Topbar + контент. 4 stat-карточки с трендами, график-заглушка из цветных ячеек, таблица транзакций с фильтрами и поиском. Адаптив от 320px до 4K."
        :tags="['grid-cols-12', 'col-span-*', 'min-w-0', 'truncate', 'scrollbar-thin']"
        heading-id="t41"
      />
      <AnalyticsDashboard />
    </section>

    <section id="task-4-2" aria-labelledby="t42">
      <TaskHead
        number="4.2"
        title="Многошаговая форма"
        note="Степпер с прогресс-баром, 4 шага, навигация Back/Next с блокировкой, валидация по blur, состояния disabled / loading / success / error."
        :tags="['aria-*', 'has-[:checked]:*', 'data-[state=*]', 'progressbar']"
        heading-id="t42"
      />
      <MultiStepForm />
    </section>

    <section id="task-4-3" aria-labelledby="t43">
      <TaskHead
        number="4.3"
        title="E-commerce каталог с фильтрами"
        note="Категории, слайдер цены, теги, сортировка, пагинация. На мобильных фильтры — drawer снизу с backdrop-blur. Skeleton-загрузка через animate-pulse, сетка на container queries."
        :tags="['@container', 'translate-y-full', 'backdrop-blur-sm', 'animate-pulse']"
        heading-id="t43"
      />
      <EcommerceCatalog />
    </section>

    <section id="task-4-4" aria-labelledby="t44">
      <TaskHead
        number="4.4"
        title="Дизайн-система на Tailwind"
        note="Токены, типографика, кнопки 4×3, инпуты, чекбоксы, toggle, Badge, Alert, Card, Modal. Всё через @layer components + @apply, документация в стиле Storybook."
        :tags="['@theme', '@layer components', '@apply', '@utility']"
        heading-id="t44"
      />
      <DesignSystemShowcase />
    </section>
  </LevelShell>
</template>

<script setup>
import LevelShell from '../components/ui/LevelShell.vue'
import TaskHead from '../components/ui/TaskHead.vue'
import AnalyticsDashboard from '../components/l4/AnalyticsDashboard.vue'
import MultiStepForm from '../components/l4/MultiStepForm.vue'
import EcommerceCatalog from '../components/l4/EcommerceCatalog.vue'
import DesignSystemShowcase from '../components/l4/DesignSystemShowcase.vue'
</script>
