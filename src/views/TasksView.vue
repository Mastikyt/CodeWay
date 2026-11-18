<template>
  <!--
    Задания по вёрстке на чистом Tailwind.
    Стили слоя подключены в src/main.js через src/tailwind/tailwind.css (Tailwind v4).
    Разметка переиспользует компоненты из src/tailwind/components — та же, что в /tailwind.
  -->
  <div class="tw-tasks">
    <LevelShell
      level="1"
      title="Начальный: базовые строительные блоки"
      lead="Карточка профиля, навигация с бургер-меню без JS и адаптивная сетка товаров. Всё начинается с 320px и расширяется вверх."
      :chips="['mobile-first', 'flex + space-y', 'grid 1→2→4', 'sticky + backdrop-blur', 'hover / focus / active']"
    >
      <section id="task-1-1" aria-labelledby="t11">
        <TaskHead
          number="1.1"
          title="Карточка профиля"
          note="Аватар 80×80, имя, должность, bio, Follow/Message. На мобильных — на всю ширину, на десктопе — фиксированные 320px (w-80)."
          :tags="['rounded-full', 'shadow', 'space-y-*', 'flex', 'gap-*']"
          heading-id="t11"
        />
        <DemoFrame class="bg-canvas dark:bg-slate-950">
          <ProfileCard />
        </DemoFrame>
      </section>

      <section id="task-1-2" aria-labelledby="t12">
        <TaskHead
          number="1.2"
          title="Навигационная панель"
          note="Логотип слева, меню по центру, Sign In справа. Бургер на мобильных работает без JS: скрытый checkbox + peer-checked. Меню на десктопе — hidden md:flex."
          :tags="['sticky top-0', 'backdrop-blur', 'z-50', 'hidden md:flex', 'peer-checked']"
          heading-id="t12"
        />
        <DemoFrame class="bg-canvas p-0 sm:p-0 lg:p-0 dark:bg-slate-950">
          <p class="border-b border-line px-4 py-2 text-xs text-ink-muted dark:border-white/10 dark:text-slate-500">
            Прокрутите страницу — навбар прилипает к верху. Сузьте окно до &lt;768px и нажмите бургер.
          </p>
          <DemoNavbar />
          <div class="grid place-items-center px-4 py-10 text-center">
            <p class="text-sm text-ink-muted dark:text-slate-400">Демо-контент страницы под навбаром</p>
          </div>
        </DemoFrame>
      </section>

      <section id="task-1-3" aria-labelledby="t13">
        <TaskHead
          number="1.3"
          title="Сетка карточек товаров"
          note="Шесть карточек: aspect-square, название, цена, «В корзину». Колонки: 1 → 2 (sm) → 4 (lg). Наведение увеличивает карточку, transition 300ms."
          :tags="['grid', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4', 'hover:scale-[1.02]', 'transition']"
          heading-id="t13"
        />
        <DemoFrame>
          <ProductGrid />
        </DemoFrame>
      </section>
    </LevelShell>

    <LevelShell
      level="2"
      title="Средний: лендинг, тарифы, дашборд и формы"
      lead="Hero с градиентом и overlay, pricing с выделением Pro, off-canvas сайдбар и форма регистрации на peer-валидации."
      :chips="['bg-clip-text', 'blur-3xl', 'ring-2 · scale', 'fixed inset-y-0 w-64', 'peer / transition']"
    >
      <section id="task-2-1" aria-labelledby="t21">
        <TaskHead
          number="2.1"
          title="Hero-секция с градиентом"
          note="Заголовок с градиентным текстом, overlay поверх фонового изображения, два декоративных blur-круга и каскадное появление элементов."
          :tags="['bg-gradient-to-r', 'from-purple-400', 'blur-3xl', 'animate-pulse', 'backdrop-blur']"
          heading-id="t21"
        />
        <HeroSection />
      </section>

      <section id="task-2-2" aria-labelledby="t22">
        <TaskHead
          number="2.2"
          title="Pricing-таблица"
          note="Три тарифа, у Pro — бейдж Popular и ring-выделение со scale на lg. Фичи с ✅/❌, разделители divide-y. На мобильных — вертикальный стек."
          :tags="['ring-2 ring-indigo-500', 'lg:scale-105', 'divide-y', 'grid-cols-1 md:grid-cols-3']"
          heading-id="t22"
        />
        <DemoFrame>
          <PricingTable />
        </DemoFrame>
      </section>

      <section id="task-2-3" aria-labelledby="t23">
        <TaskHead
          number="2.3"
          title="Sidebar + контент"
          note="Сайдбар 256px (w-64) слева, topbar с поиском и аватаром, карточки контента. На мобильных сайдбар уезжает через translate-x-* и открывается по кнопке."
          :tags="['fixed inset-y-0 left-0 w-64', 'translate-x-*', 'overflow-y-auto', 'backdrop-blur']"
          heading-id="t23"
        />
        <DashboardSidebar />
      </section>

      <section id="task-2-4" aria-labelledby="t24">
        <TaskHead
          number="2.4"
          title="Форма регистрации"
          note="Email, пароль, подтверждение, согласие. Невалидные поля подсвечиваются через peer-invalid:, индикатор силы — полоски, кнопка имеет loading- и success-состояния."
          :tags="['peer', 'peer-invalid:border-red-500', 'focus:ring-2', 'disabled:opacity-50']"
          heading-id="t24"
        />
        <DemoFrame>
          <RegistrationForm />
        </DemoFrame>
      </section>
    </LevelShell>

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
          note="Navbar (sticky), Hero с CTA, Features в 3 колонки, Testimonials-карусель на snap без JS, Pricing, FAQ-аккордеон на <details> + group-open, Footer из 4 колонок. Подзаголовки h2."
          :tags="['@apply', '@layer components', 'details + group-open:*', 'snap carousel']"
          heading-id="t33"
        />
        <LandingSection />
      </section>

      <section id="task-3-4" aria-labelledby="t34">
        <TaskHead
          number="3.4"
          title="Dark mode с переключателем"
          note="Тема переключается кнопкой с иконками солнца/луны, класс dark висит на конкретном контейнере: настройка CodeWay остаётся тёмной, дeмo переключается независимо."
          :tags="['@custom-variant dark', 'dark:bg-slate-900', 'dark:text-slate-100', 'transition-colors']"
          heading-id="t34"
        />
        <DarkModeLocal />
      </section>
    </LevelShell>

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
  </div>
</template>

<script setup>
import LevelShell from '../tailwind/components/ui/LevelShell.vue'
import TaskHead from '../tailwind/components/ui/TaskHead.vue'
import DemoFrame from '../tailwind/components/ui/DemoFrame.vue'

import ProfileCard from '../tailwind/components/l1/ProfileCard.vue'
import DemoNavbar from '../tailwind/components/l1/DemoNavbar.vue'
import ProductGrid from '../tailwind/components/l1/ProductGrid.vue'

import HeroSection from '../tailwind/components/l2/HeroSection.vue'
import PricingTable from '../tailwind/components/l2/PricingTable.vue'
import DashboardSidebar from '../tailwind/components/l2/DashboardSidebar.vue'
import RegistrationForm from '../tailwind/components/l2/RegistrationForm.vue'

import Messenger from '../tailwind/components/l3/Messenger.vue'
import KanbanBoard from '../tailwind/components/l3/KanbanBoard.vue'
import LandingSection from '../tailwind/components/l3/LandingSection.vue'
import DarkModeLocal from '../tailwind/components/l3/DarkModeLocal.vue'

import AnalyticsDashboard from '../tailwind/components/l4/AnalyticsDashboard.vue'
import MultiStepForm from '../tailwind/components/l4/MultiStepForm.vue'
import EcommerceCatalog from '../tailwind/components/l4/EcommerceCatalog.vue'
import DesignSystemShowcase from '../tailwind/components/l4/DesignSystemShowcase.vue'
</script>

<style>
/* Страница живёт внутри тёмной темы CodeWay: фон берём от приложения, а не светлый из слоя /tailwind */
.tw-tasks {
  background: var(--bg-canvas, #04070e);
  color-scheme: light;
}
</style>
