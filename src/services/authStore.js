import { reactive, computed } from 'vue'
import { authApi } from './api'
import logService from './logService'

// Реактивное состояние авторизации
const state = reactive({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
})

export const authStore = {
  // Текущий пользователь
  get user() {
    return state.user
  },
  // Авторизован ли
  get isAuthenticated() {
    return !!state.user
  },
  // Является ли администратором
  get isAdmin() {
    return state.user?.role === 'admin'
  },
  // Вход
  async login(credentials) {
    const userData = await authApi.login(credentials)
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    await logService.log('LOGIN', 'user', userData.id, null, { email: userData.email })
    return userData
  },
  // Регистрация
  async register(data) {
    const userData = await authApi.register(data)
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    await logService.log('REGISTER', 'user', userData.id, null, { name: userData.name, email: userData.email })
    return userData
  },
  // Выход
  async logout() {
    try {
      // Сервер инвалидирует токен — после выхода им нельзя продолжить пользоваться
      await authApi.logout()
    } catch (e) {
      // Если сервер недоступен, всё равно выходим локально
    }
    state.user = null
    localStorage.removeItem('user')
  },
  // Обновление пользователя (например, при смене роли)
  setUser(userData) {
    state.user = userData
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  },
}

export default authStore
