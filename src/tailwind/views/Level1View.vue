<template>
  <LevelShell
    level="1"
    title="Начальный: базовые строительные блоки"
    lead="Карточка профиля, навигация с бургер-меню без JS и адаптивная сетка товаров. Всё начинается с 320px и расширяется вверх."
    :chips="['mobile-first', 'flex + space-y', 'grid 1→2→4', 'sticky + backdrop-blur', 'hover / focus / active']"
  >
    <!-- 1.1 -->
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

    <!-- 1.2 -->
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

    <!-- 1.3 -->
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
</template>

<script setup>
import LevelShell from '../components/ui/LevelShell.vue'
import TaskHead from '../components/ui/TaskHead.vue'
import DemoFrame from '../components/ui/DemoFrame.vue'
import ProfileCard from '../components/l1/ProfileCard.vue'
import DemoNavbar from '../components/l1/DemoNavbar.vue'
import ProductGrid from '../components/l1/ProductGrid.vue'
</script>
