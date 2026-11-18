<!-- Страница регистрации -->
<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="text-center mb-4">
        <h2>Регистрация</h2>
        <p>Создайте аккаунт для доступа к платформе</p>
      </div>

      <div class="alert alert-danger" v-if="error">{{ error }}</div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Имя</label>
          <input type="text" class="form-control" v-model="name" placeholder="Ваше имя" required />
        </div>
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="user@example.com" required />
        </div>
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Пароль</label>
          <input type="password" class="form-control" v-model="password" placeholder="Минимум 6 символов" required minlength="6" />
        </div>
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Курс обучения</label>
          <select class="form-control" v-model="course">
            <option :value="null">Не указывать</option>
            <option :value="1">1 курс</option>
            <option :value="2">2 курс</option>
            <option :value="3">3 курс</option>
            <option :value="4">4 курс</option>
          </select>
        </div>
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Подтверждение пароля</label>
          <input type="password" class="form-control" v-model="passwordConfirm" placeholder="Повторите пароль" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
          <span v-if="isLoading">Регистрация...</span>
          <span v-else>Зарегистрироваться</span>
        </button>
      </form>

      <div class="text-center mt-4">
        <small style="color: var(--text-muted);">
          Уже есть аккаунт?
          <router-link to="/login" style="color: var(--accent-primary); text-decoration: none; font-weight: 600;">
            Войдите
          </router-link>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import authStore from '../services/authStore'

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      course: null,
      isLoading: false,
      error: '',
    }
  },
  methods: {
    async handleRegister() {
      this.error = ''

      if (this.password !== this.passwordConfirm) {
        this.error = 'Пароли не совпадают'
        return
      }

      if (this.password.length < 6) {
        this.error = 'Пароль должен содержать минимум 6 символов'
        return
      }

      this.isLoading = true

      try {
        await authStore.register({
          name: this.name,
          email: this.email,
          password: this.password,
          course: this.course,
        })

        this.$router.push('/data')
      } catch (err) {
        this.error = err.response?.data?.error || err.message || 'Ошибка регистрации'
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
