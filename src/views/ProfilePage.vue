<!-- «Мой кабинет» — профиль текущего пользователя, его статистика и история действий -->
<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 style="color: var(--text-white); font-weight: 800;" class="mb-1">Мой кабинет</h2>
        <p style="color: var(--text-muted); font-size: 14px;" class="mb-0">
          Профиль и статистика — видны только вам
          <span v-if="isLoading" class="spinner-border spinner-border-sm ml-2 text-primary" role="status"></span>
        </p>
      </div>
      <button class="btn btn-outline-secondary btn-sm" @click="loadAll" title="Обновить">🔄 Обновить</button>
    </div>

    <div class="row">
      <!-- Карточка профиля -->
      <div class="col-lg-4 mb-4">
        <div class="card p-4 h-100" style="border-radius: 16px;">
          <div class="d-flex align-items-center mb-3">
            <div class="avatar mr-3">{{ initials }}</div>
            <div>
              <h5 style="color: var(--text-white); font-weight: 700;" class="mb-0">{{ profile.name || '—' }}</h5>
              <small style="color: var(--text-muted);">{{ profile.email || '—' }}</small>
            </div>
          </div>

          <div class="profile-row">
            <span style="color: var(--text-muted); font-size: 12px;">Роль</span>
            <span class="badge" :class="profile.isAdmin ? 'badge-warning' : 'badge-primary'">
              {{ profile.isAdmin ? 'Администратор' : 'Студент' }}
            </span>
          </div>
          <div class="profile-row">
            <span style="color: var(--text-muted); font-size: 12px;">Курс</span>
            <span style="color: var(--text-secondary); font-size: 14px;">{{ courseLabel }}</span>
          </div>
          <div class="profile-row">
            <span style="color: var(--text-muted); font-size: 12px;">Дата регистрации</span>
            <span style="color: var(--text-secondary); font-size: 14px;">{{ formatDay(profile.createdAt) }}</span>
          </div>
          <div class="profile-row">
            <span style="color: var(--text-muted); font-size: 12px;">ID</span>
            <span style="color: var(--text-muted); font-size: 13px; font-family: 'Fira Code', monospace;">{{ profile.id ?? '—' }}</span>
          </div>

          <hr style="border-color: var(--border-subtle);" />
          <p style="color: var(--text-muted); font-size: 12px;" class="mb-0">
            Email и роль назначаются администратором и через кабинет не меняются.
          </p>
        </div>
      </div>

      <!-- Плитки-счётчики -->
      <div class="col-lg-8 mb-4">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="card stat-tile p-3 h-100" style="border-radius: 16px;">
              <small style="color: var(--text-muted); font-size: 12px; font-weight: 600;">📊 Записи</small>
              <div class="stat-value" style="color: var(--accent-cyan);">{{ counts.data }}</div>
              <small style="color: var(--text-muted); font-size: 12px;">
                +{{ stats.createdLast7 || 0 }} за 7 дней · +{{ stats.createdLast30 || 0 }} за 30 дней
              </small>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card stat-tile p-3 h-100" style="border-radius: 16px;">
              <small style="color: var(--text-muted); font-size: 12px; font-weight: 600;">📁 Файлы</small>
              <div class="stat-value" style="color: var(--accent-emerald);">{{ counts.files }}</div>
              <small style="color: var(--text-muted); font-size: 12px;">
                локально: {{ filesByStorage.local || 0 }} · GDrive: {{ filesByStorage.gdrive || 0 }}
              </small>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card stat-tile p-3 h-100" style="border-radius: 16px;">
              <small style="color: var(--text-muted); font-size: 12px; font-weight: 600;">⚡ Действия</small>
              <div class="stat-value" style="color: var(--accent-primary);">{{ counts.logs }}</div>
              <small style="color: var(--text-muted); font-size: 12px;">в журнале операций</small>
            </div>
          </div>

          <!-- Разбивка по статусу -->
          <div class="col-12">
            <div class="card p-3" style="border-radius: 16px;">
              <h6 style="color: var(--text-white); font-weight: 700;" class="mb-3">Записи по статусу</h6>
              <div v-if="statusRows.length === 0" style="color: var(--text-muted); font-size: 13px;">
                Пока нет записей
              </div>
              <div v-for="row in statusRows" :key="row.label" class="mb-2">
                <div class="d-flex justify-content-between" style="font-size: 13px;">
                  <span style="color: var(--text-secondary);">{{ row.label }}</span>
                  <span style="color: var(--text-muted);">{{ row.count }}</span>
                </div>
                <div class="status-bar">
                  <div class="status-bar-fill" :style="{ width: row.percent + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Редактирование профиля -->
      <div class="col-lg-7 mb-4">
        <div class="card p-4 h-100" style="border-radius: 16px;">
          <h6 style="color: var(--text-white); font-weight: 700;" class="mb-3">Редактирование профиля</h6>

          <div v-if="formMessage" :class="'alert alert-' + formMessage.type" class="py-2" style="font-size: 13px;">
            {{ formMessage.text }}
          </div>

          <form @submit.prevent="saveName">
            <div class="form-group">
              <label class="form-label-sm">Имя</label>
              <input type="text" class="form-control" v-model="form.name" placeholder="Ваше имя" required />
            </div>
            <button type="submit" class="btn btn-primary btn-sm" :disabled="isSavingName">
              <span v-if="isSavingName">Сохранение...</span>
              <span v-else>Сохранить имя</span>
            </button>
          </form>

          <hr style="border-color: var(--border-subtle);" class="my-4" />

          <h6 style="color: var(--text-white); font-weight: 700;" class="mb-3">Смена пароля</h6>
          <form @submit.prevent="savePassword">
            <div class="row">
              <div class="col-md-4 mb-2">
                <label class="form-label-sm">Текущий пароль</label>
                <input type="password" class="form-control" v-model="form.currentPassword" autocomplete="current-password" required />
              </div>
              <div class="col-md-4 mb-2">
                <label class="form-label-sm">Новый пароль</label>
                <input type="password" class="form-control" v-model="form.password" placeholder="Минимум 6 символов" minlength="6" autocomplete="new-password" required />
              </div>
              <div class="col-md-4 mb-2">
                <label class="form-label-sm">Повтор</label>
                <input type="password" class="form-control" v-model="form.passwordConfirm" autocomplete="new-password" required />
              </div>
            </div>
            <button type="submit" class="btn btn-outline-primary btn-sm" :disabled="isSavingPassword">
              <span v-if="isSavingPassword">Сохранение...</span>
              <span v-else>Сменить пароль</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Последние действия -->
      <div class="col-lg-5 mb-4">
        <div class="card p-4 h-100" style="border-radius: 16px;">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 style="color: var(--text-white); font-weight: 700;" class="mb-0">Последние действия</h6>
            <router-link to="/logs" style="color: var(--accent-cyan); font-size: 12px;">весь журнал →</router-link>
          </div>
          <div v-if="activity.length === 0" style="color: var(--text-muted); font-size: 13px;">
            Действий пока нет
          </div>
          <div v-for="item in activity" :key="item.id" class="activity-row">
            <span class="badge" :class="actionBadgeClass(item.action)">{{ actionLabel(item.action) }}</span>
            <span style="color: var(--text-secondary); font-size: 13px;">{{ entityLabel(item.entityType) }}</span>
            <span class="ml-auto" style="color: var(--text-muted); font-size: 12px;">{{ formatDate(item.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authApi } from '../services/api'
import authStore from '../services/authStore'

export default {
  name: 'ProfilePage',
  data() {
    return {
      profile: {},
      stats: {},
      activity: [],
      isLoading: false,
      isSavingName: false,
      isSavingPassword: false,
      formMessage: null,
      form: {
        name: '',
        currentPassword: '',
        password: '',
        passwordConfirm: '',
      },
    }
  },
  computed: {
    initials() {
      const name = this.profile.name || ''
      return name.trim() ? name.trim().charAt(0).toUpperCase() : '?'
    },
    courseLabel() {
      return this.profile.course ? `${this.profile.course} курс` : '—'
    },
    counts() {
      const s = this.profile.stats || {}
      return {
        data: s.data ?? 0,
        files: s.files ?? 0,
        logs: s.logs ?? 0,
      }
    },
    filesByStorage() {
      return this.stats.filesByStorage || {}
    },
    statusRows() {
      const byStatus = this.stats.byStatus || {}
      const total = Object.values(byStatus).reduce((sum, n) => sum + Number(n || 0), 0)
      return Object.entries(byStatus)
        .map(([label, count]) => ({
          label,
          count,
          percent: total ? Math.round((count / total) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)
    },
  },
  mounted() {
    this.loadAll()
  },
  methods: {
    async loadAll() {
      this.isLoading = true
      try {
        const [profile, stats, activity] = await Promise.all([
          authApi.getProfile(),
          authApi.getStats(),
          authApi.getRecentActivity(),
        ])
        this.profile = profile || {}
        this.stats = stats || {}
        this.activity = Array.isArray(activity) ? activity : []
        this.form.name = this.profile.name || ''
      } catch (err) {
        this.showFormMessage('Ошибка загрузки кабинета: ' + err.message, 'danger')
      } finally {
        this.isLoading = false
      }
    },

    async saveName() {
      this.formMessage = null
      if (!this.form.name.trim()) {
        this.showFormMessage('Имя не может быть пустым', 'danger')
        return
      }
      this.isSavingName = true
      try {
        await authApi.updateProfile({ name: this.form.name.trim() })
        // Шапка сайта берёт имя из authStore — обновляем и его
        if (authStore.user) authStore.setUser({ ...authStore.user, name: this.form.name.trim() })
        await this.refresh()
        this.showFormMessage('Имя обновлено', 'success')
      } catch (err) {
        this.showFormMessage(err.message || 'Не удалось сохранить имя', 'danger')
      } finally {
        this.isSavingName = false
      }
    },

    async savePassword() {
      this.formMessage = null
      if (this.form.password.length < 6) {
        this.showFormMessage('Новый пароль должен содержать минимум 6 символов', 'danger')
        return
      }
      if (this.form.password !== this.form.passwordConfirm) {
        this.showFormMessage('Новые пароли не совпадают', 'danger')
        return
      }
      this.isSavingPassword = true
      try {
        await authApi.updateProfile({
          password: this.form.password,
          currentPassword: this.form.currentPassword,
        })
        this.form.currentPassword = ''
        this.form.password = ''
        this.form.passwordConfirm = ''
        this.showFormMessage('Пароль изменён', 'success')
      } catch (err) {
        this.showFormMessage(err.message || 'Не удалось сменить пароль', 'danger')
      } finally {
        this.isSavingPassword = false
      }
    },

    async refresh() {
      try {
        const [profile, stats, activity] = await Promise.all([
          authApi.getProfile(),
          authApi.getStats(),
          authApi.getRecentActivity(),
        ])
        this.profile = profile || {}
        this.stats = stats || {}
        this.activity = Array.isArray(activity) ? activity : []
      } catch {
        // Данные уже показаны — молча оставляем как есть
      }
    },

    showFormMessage(text, type = 'success') {
      this.formMessage = { text, type }
    },

    actionBadgeClass(action) {
      const map = {
        CREATE: 'badge-success',
        UPDATE: 'badge-warning',
        DELETE: 'badge-danger',
        UPLOAD: 'badge-info',
        LOGIN: 'badge-primary',
        REGISTER: 'badge-primary',
      }
      return map[action] || 'badge-secondary'
    },
    actionLabel(action) {
      const map = {
        CREATE: 'Создание',
        UPDATE: 'Обновление',
        DELETE: 'Удаление',
        UPLOAD: 'Загрузка',
        LOGIN: 'Вход',
        REGISTER: 'Регистрация',
        RESTORE: 'Восстановление',
      }
      return map[action] || action
    },
    entityLabel(type) {
      const map = { data: 'Данные', file: 'Файл', user: 'Пользователь' }
      return map[type] || type || '—'
    },
    formatDay(str) {
      if (!str) return '—'
      return new Date(str).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
    },
    formatDate(str) {
      if (!str) return '—'
      return new Date(str).toLocaleDateString('ru-RU', {
        day: '2-digit', month: '2-digit', year: '2-digit',
        hour: '2-digit', minute: '2-digit',
      })
    },
  },
}
</script>

<style scoped>
.avatar {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: var(--accent-badge-text);
  background: var(--accent-badge-bg);
  border: 1px solid var(--border-accent);
}
.profile-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  border-bottom: 1px dashed var(--border-subtle);
}
.stat-tile {
  transition: border-color 0.2s ease;
}
.stat-tile:hover {
  border-color: var(--border-accent);
}
.stat-value {
  font-size: 34px;
  font-weight: 800;
  line-height: 1.2;
  margin: 4px 0;
}
.status-bar {
  height: 6px;
  border-radius: 3px;
  background: var(--border-subtle);
  overflow: hidden;
}
.status-bar-fill {
  height: 100%;
  background: var(--accent-primary);
  border-radius: 3px;
}
.activity-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  border-bottom: 1px dashed var(--border-subtle);
}
.form-label-sm {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
}
.badge-warning {
  background: var(--accent-amber) !important;
  color: #000 !important;
}
.badge-danger {
  background: #ef4444 !important;
}
.badge-success {
  background: var(--accent-emerald) !important;
  color: #000 !important;
}
</style>
