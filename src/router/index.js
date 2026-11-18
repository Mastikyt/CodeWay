import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ForgotPasswordPage from '../views/ForgotPasswordPage.vue'
import DataPage from '../views/DataPage.vue'
import AdminPage from '../views/AdminPage.vue'
import LogsPage from '../views/LogsPage.vue'
import FilesPage from '../views/FilesPage.vue'
import TasksView from '../views/TasksView.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPasswordPage },
  { path: '/data', name: 'data', component: DataPage, meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin', component: AdminPage, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/logs', name: 'logs', component: LogsPage, meta: { requiresAuth: true } },
  { path: '/files', name: 'files', component: FilesPage, meta: { requiresAuth: true } },
  { path: '/tasks', name: 'tasks', component: TasksView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  
  if (to.meta.requiresAuth && !user) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresAdmin && user?.role !== 'admin') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
