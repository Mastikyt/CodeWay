<template>
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
</template>

<script setup>
import LevelShell from '../components/ui/LevelShell.vue'
import TaskHead from '../components/ui/TaskHead.vue'
import DemoFrame from '../components/ui/DemoFrame.vue'
import HeroSection from '../components/l2/HeroSection.vue'
import PricingTable from '../components/l2/PricingTable.vue'
import DashboardSidebar from '../components/l2/DashboardSidebar.vue'
import RegistrationForm from '../components/l2/RegistrationForm.vue'
</script>
