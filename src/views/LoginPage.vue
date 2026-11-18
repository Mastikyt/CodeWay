<!-- Страница авторизации -->
<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="text-center mb-4">
        <h2>Вход в аккаунт</h2>
        <p>IT Academy CodeWay (Беларусь)</p>
      </div>

      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="alert alert-success" v-if="success">{{ success }}</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Email (.by)</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="student@codeway.by"
            required
          />
        </div>
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Пароль</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Введите пароль"
            required
          />
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="remember" v-model="remember">
            <label class="custom-control-label" for="remember" style="color: var(--text-muted); font-size: 13px;">
              Запомнить меня
            </label>
          </div>
          <router-link to="/forgot-password" style="color: var(--accent-primary); font-size: 13px; text-decoration: none;">
            Забыли пароль?
          </router-link>
        </div>
        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status"></span>
          <span>Войти</span>
        </button>
      </form>

      <div class="text-center mt-4">
        <small style="color: var(--text-muted);">
          Нет аккаунта?
          <router-link to="/register" style="color: var(--accent-primary); text-decoration: none; font-weight: 600;">
            Зарегистрируйтесь
          </router-link>
        </small>
      </div>

      <!-- Быстрый демо-вход для Беларуси -->
      <div class="mt-4 pt-3" style="border-top: 1px solid var(--border-subtle);">
        <small class="d-block text-center mb-2" style="color: var(--text-muted);">Быстрый демо-вход:</small>
        <div class="d-flex justify-content-center" style="gap: 8px;">
          <button class="btn btn-outline-warning btn-sm" @click="quickLogin('admin')" title="admin@codeway.by">
            👑 Админ (admin@codeway.by)
          </button>
          <button class="btn btn-outline-info btn-sm" @click="quickLogin('user')" title="user@codeway.by">
            👤 Студент (user@codeway.by)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authStore from '../services/authStore'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      isLoading: false,
      error: '',
      success: '',
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      this.isLoading = true

      try {
        await authStore.login({
          email: this.email,
          password: this.password,
        })

        // Перенаправление на страницу данных после авторизации
        const redirect = this.$route.query.redirect || '/data'

        // Офлайн-сессия: API недоступен, права ограничены — предупреждаем явно
        if (authStore.user?.offline) {
          this.success = 'Вход выполнен, но API недоступен: приложение работает на локальных данных, права ограничены'
          setTimeout(() => this.$router.push(redirect), 1200)
          return
        }

        this.$router.push(redirect)
      } catch (err) {
        this.error = err.response?.data?.error || err.message || 'Ошибка авторизации. Проверьте email и пароль'
      } finally {
        this.isLoading = false
      }
    },
    async quickLogin(role) {
      const demoUsers = {
        admin: {
          id: 1,
          name: 'Администратор (Беларусь)',
          email: 'admin@codeway.by',
          password: 'admin123',
          role: 'admin',
        },
        user: {
          id: 2,
          name: 'Студент (Минск)',
          email: 'user@codeway.by',
          password: 'user123',
          role: 'user',
        },
      }

      const demo = demoUsers[role]
      // Гарантируем наличие пользователя в локальном хранилище для оффлайн-режима
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const idx = users.findIndex(u => u.email === demo.email)
      if (idx === -1) {
        users.push(demo)
      } else {
        users[idx] = demo
      }
      localStorage.setItem('users', JSON.stringify(users))

      this.email = demo.email
      this.password = demo.password
      await this.handleLogin()
    },
  },
}
</script>
