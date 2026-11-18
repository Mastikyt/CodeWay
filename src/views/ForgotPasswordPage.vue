<!-- Страница восстановления пароля -->
<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="text-center mb-4">
        <h2>Восстановление пароля</h2>
        <p>Введите email для получения инструкций по сбросу пароля</p>
      </div>

      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="alert alert-success" v-if="success">{{ success }}</div>

      <form @submit.prevent="handleReset" v-if="!success">
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="student@codeway.by" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
          <span v-if="isLoading">Отправка...</span>
          <span v-else>Отправить ссылку для сброса</span>
        </button>
      </form>

      <div class="text-center mt-4">
        <router-link to="/login" style="color: var(--accent-primary); text-decoration: none; font-size: 14px;">
          ← Вернуться к авторизации
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { authApi } from '../services/api'

export default {
  name: 'ForgotPasswordPage',
  data() {
    return {
      email: '',
      isLoading: false,
      error: '',
      success: '',
    }
  },
  methods: {
    async handleReset() {
      this.error = ''
      this.isLoading = true

      try {
        const res = await authApi.forgotPassword(this.email)
        this.success = res.message || `Инструкции по сбросу пароля отправлены на ${this.email}.`
      } catch (err) {
        this.error = err.response?.data?.error || err.message || 'Ошибка сброса пароля'
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
