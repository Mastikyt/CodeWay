<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <span class="code-icon">&lt;/&gt;</span> CodeWay <small style="font-size: 11px; color: var(--accent-cyan); font-weight: 700; margin-left: 4px; letter-spacing: 0.5px;">.BY</small>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Навигация"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Главная</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/#courses">Курсы ($)</a>
          </li>
          <li class="nav-item" v-if="user">
            <router-link class="nav-link" to="/data">Данные</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <router-link class="nav-link" to="/logs">Логи</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <router-link class="nav-link" to="/files">Файлы</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <router-link class="nav-link" to="/profile">Кабинет</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link text-warning" to="/admin">👑 Админ-панель</router-link>
          </li>
        </ul>

        <!-- Контакты Минск / Беларусь -->
        <div class="d-none d-xl-flex align-items-center mr-3 text-muted" style="font-size: 13px; gap: 8px;">
          <span>📍 Минск</span>
          <span>•</span>
          <a href="tel:+375295554242" style="color: var(--text-secondary); text-decoration: none;">+375 (29) 555-42-42</a>
        </div>

        <ul class="navbar-nav">
          <template v-if="!user">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Войти</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-primary btn-sm ml-2" to="/register">
                Регистрация
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="badge badge-primary mr-2" style="font-size: 11px;">
                  {{ user.role === 'admin' ? 'Админ' : 'Студент' }}
                </span>
                <strong>{{ user.name }}</strong>
              </a>
              <div class="dropdown-menu dropdown-menu-right shadow-lg" style="background: var(--bg-surface); border-color: var(--border-bright);">
                <span class="dropdown-item-text" style="color: var(--text-muted); font-size: 12px;">
                  {{ user.email }}
                </span>
                <span class="dropdown-item-text" style="color: var(--accent-cyan); font-size: 11px;">
                  Роль: {{ user.role }}
                </span>
                <div class="dropdown-divider" style="border-color: var(--border-subtle);"></div>
                <router-link class="dropdown-item" to="/data" style="color: var(--text-secondary);">
                  📊 Мои данные
                </router-link>
                <router-link class="dropdown-item" to="/profile" style="color: var(--text-secondary);">
                  👤 Кабинет
                </router-link>
                <router-link v-if="isAdmin" class="dropdown-item text-warning" to="/admin">
                  👑 Панель управления
                </router-link>
                <div class="dropdown-divider" style="border-color: var(--border-subtle);"></div>
                <a class="dropdown-item text-danger" href="#" @click.prevent="logout">
                  Выйти
                </a>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import authStore from '../services/authStore'

export default {
  name: 'AppNavbar',
  computed: {
    user() {
      return authStore.user
    },
    isAdmin() {
      return authStore.isAdmin
    },
  },
  methods: {
    async logout() {
      // Сообщаем серверу, что сессия закрыта: токен после этого перестаёт действовать
      await authStore.logout()
      this.$router.push('/login')
    },
  },
}
</script>
