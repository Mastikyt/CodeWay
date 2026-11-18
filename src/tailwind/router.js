import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from './views/OverviewView.vue'

const routes = [
  { path: '/tailwind', name: 'tw-overview', component: OverviewView, meta: { title: 'Обзор' } },
  {
    path: '/tailwind/level-1',
    name: 'tw-level-1',
    component: () => import('./views/Level1View.vue'),
    meta: { title: 'Уровень 1: Начальный' },
  },
  {
    path: '/tailwind/level-2',
    name: 'tw-level-2',
    component: () => import('./views/Level2View.vue'),
    meta: { title: 'Уровень 2: Средний' },
  },
  {
    path: '/tailwind/level-3',
    name: 'tw-level-3',
    component: () => import('./views/Level3View.vue'),
    meta: { title: 'Уровень 3: Продвинутый' },
  },
  {
    path: '/tailwind/level-4',
    name: 'tw-level-4',
    component: () => import('./views/Level4View.vue'),
    meta: { title: 'Уровень 4: Экспертный' },
  },
  { path: '/tailwind/:pathMatch(.*)*', redirect: '/tailwind' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 88, behavior: 'smooth' }
    return { top: 0 }
  },
})

const BASE = 'Tailwind-задания — CodeWay'

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · ${BASE}` : BASE
})

export default router
