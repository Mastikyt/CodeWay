<!-- Страница администратора (замена Voyager) — управление пользователями, ролями, данными -->
<template>
  <div class="container py-5">
    <div class="mb-4">
      <h2 style="color: var(--text-white); font-weight: 800;" class="mb-1">Панель администратора</h2>
      <p style="color: var(--text-muted); font-size: 14px;">
        Управление пользователями, ролями и настройками (замена Voyager)
      </p>
    </div>

    <!-- Статистика -->
    <div class="row mb-4">
      <div class="col-md-3 mb-3" v-for="stat in stats" :key="stat.label">
        <div class="card p-3 text-center" style="border-radius: 16px;">
          <div style="font-size: 28px;">{{ stat.icon }}</div>
          <h4 style="color: var(--text-white); font-weight: 800;" class="mt-2 mb-0">{{ stat.value }}</h4>
          <small style="color: var(--text-muted);">{{ stat.label }}</small>
        </div>
      </div>
    </div>

    <!-- Табы -->
    <ul class="nav nav-tabs mb-4" style="border-color: var(--border-subtle);">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'users' }" href="#"
           @click.prevent="activeTab = 'users'" style="border-radius: 12px 12px 0 0;">
          👥 Пользователи
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'data' }" href="#"
           @click.prevent="activeTab = 'data'" style="border-radius: 12px 12px 0 0;">
          📊 Данные
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'voyager' }" href="#"
           @click.prevent="activeTab = 'voyager'" style="border-radius: 12px 12px 0 0;">
          🧭 Voyager (BREAD)
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'settings' }" href="#"
           @click.prevent="activeTab = 'settings'" style="border-radius: 12px 12px 0 0;">
          ⚙️ Настройки
        </a>
      </li>
    </ul>

    <!-- Вкладка: Пользователи (управление ролями — Задание 3) -->
    <div v-if="activeTab === 'users'">
      <div class="card" style="border-radius: 16px; overflow: hidden;">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Дата регистрации</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td style="color: var(--text-muted); font-family: 'Fira Code', monospace; font-size: 12px;">
                  {{ user.id }}
                </td>
                <td style="color: var(--text-white); font-weight: 600;">{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <!-- Установка роли из административной панели -->
                  <select
                    class="form-control form-control-sm"
                    :value="user.role"
                    @change="updateRole(user, $event.target.value)"
                    style="width: 140px;"
                  >
                    <option v-for="role in availableRoles" :key="role.value" :value="role.value">
                      {{ role.label }}
                    </option>
                  </select>
                </td>
                <td style="color: var(--text-muted); font-size: 13px;">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td>
                  <button class="btn btn-outline-danger btn-sm" @click="deleteUser(user)" :disabled="user.role === 'admin'">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Вкладка: Данные -->
    <div v-if="activeTab === 'data'">
      <div class="card p-4" style="border-radius: 16px;">
        <h5 style="color: var(--text-white); font-weight: 700;" class="mb-3">Управление данными</h5>

        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="card p-3" style="border-radius: 12px;">
              <h6 style="color: var(--text-white);">📋 Записей в БД</h6>
              <h3 style="color: var(--accent-cyan);">{{ dataCount }}</h3>
              <button class="btn btn-outline-danger btn-sm mt-2" @click="clearAllData">
                Очистить все данные
              </button>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card p-3" style="border-radius: 12px;">
              <h6 style="color: var(--text-white);">📁 Файлов загружено</h6>
              <h3 style="color: var(--accent-cyan);">{{ filesCount }}</h3>
              <button class="btn btn-outline-danger btn-sm mt-2" @click="clearAllFiles">
                Удалить все файлы
              </button>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card p-3" style="border-radius: 12px;">
              <h6 style="color: var(--text-white);">📝 Записей в логах</h6>
              <h3 style="color: var(--accent-cyan);">{{ logsCount }}</h3>
              <button class="btn btn-outline-danger btn-sm mt-2" @click="clearAllLogs">
                Очистить логи
              </button>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <h6 style="color: var(--text-white);" class="mb-2">Добавить тестовые данные</h6>
          <button class="btn btn-primary btn-sm" @click="generateTestData">
            🎲 Сгенерировать 20 тестовых записей
          </button>
        </div>
      </div>
    </div>

    <!-- Вкладка: Voyager BREAD — живые таблицы, без dummy-пользователей -->
    <div v-if="activeTab === 'voyager'">
      <div class="card p-4" style="border-radius: 16px;">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h4 style="color: var(--text-white); font-weight: 800; margin-bottom: 2px;">Voyager Admin</h4>
            <small style="color: var(--text-muted);">BREAD по реальным таблицам. Пустые пользователи не показываются и удаляются.</small>
          </div>
          <button class="btn btn-outline-danger btn-sm" @click="purgeEmptyUsers">Удалить пустые записи</button>
        </div>

        <div class="row">
          <div class="col-md-4 mb-3" v-for="bread in voyagerBread" :key="bread.table">
            <button
              type="button"
              class="card p-3 h-100 w-100 text-left"
              :style="breadTable === bread.table
                ? 'border-radius: 12px; border-color: var(--accent-cyan); background: var(--bg-surface);'
                : 'border-radius: 12px; border-color: var(--border-bright); background: var(--bg-surface);'"
              @click="openBread(bread.table)"
            >
              <strong style="color: var(--text-white);">{{ bread.icon }} {{ bread.name }}</strong>
              <div class="mt-1" style="font-size: 12px; color: var(--accent-cyan);">{{ bread.ops }}</div>
              <div class="mt-1" style="font-size: 13px; color: var(--text-secondary);">Записей: {{ breadCount(bread.table) }}</div>
            </button>
          </div>
        </div>

        <div class="table-responsive mt-2" v-if="breadRows.length">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th v-for="col in breadColumns" :key="col">{{ col }}</th>
                <th v-if="breadTable === 'users'">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in breadRows" :key="row.id || row.email || row.name">
                <td v-for="col in breadColumns" :key="col" style="font-size: 13px;">{{ cell(row[col]) }}</td>
                <td v-if="breadTable === 'users'">
                  <button class="btn btn-outline-danger btn-sm" @click="deleteUser(row)" :disabled="row.role === 'admin'">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="mb-0 mt-2" style="color: var(--text-muted);">В выбранной таблице нет записей.</p>
      </div>
    </div>

    <!-- Вкладка: Настройки -->
    <div v-if="activeTab === 'settings'">
      <div class="card p-4" style="border-radius: 16px;">
        <h5 style="color: var(--text-white); font-weight: 700;" class="mb-3">Настройки системы</h5>

        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Название проекта</label>
          <input type="text" class="form-control" v-model="settings.projectName" />
        </div>
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">API версия</label>
          <select class="form-control" v-model="settings.apiVersion">
            <option value="v1">v1</option>
            <option value="v2">v2</option>
          </select>
        </div>
        <div class="form-group">
          <label style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">Записей на странице</label>
          <input type="number" class="form-control" v-model.number="settings.perPage" min="5" max="100" />
        </div>
        <button class="btn btn-primary" @click="saveSettings">Сохранить настройки</button>
      </div>
    </div>

    <!-- Уведомление -->
    <div v-if="notification" class="position-fixed" style="top: 100px; right: 20px; z-index: 1050; max-width: 400px;">
      <div :class="'alert alert-' + notification.type" class="shadow">
        {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { usersApi, dataApi, logsApi, filesApi, setApiVersion } from '../services/api'
import logService from '../services/logService'

export default {
  name: 'AdminPage',
  data() {
    return {
      activeTab: 'users',
      users: [],
      notification: null,
      availableRoles: [
        { value: 'user', label: '👤 Пользователь' },
        { value: 'editor', label: '✏️ Редактор' },
        { value: 'moderator', label: '🛡️ Модератор' },
        { value: 'admin', label: '👑 Администратор' },
      ],
      settings: {
        projectName: 'CodeWay',
        apiVersion: 'v1',
        perPage: 10,
      },
      breadTable: 'users',
      breadRows: [],
      dataRows: [],
      logRows: [],
      fileRows: [],
      voyagerBread: [
        { name: 'Пользователи (Users)', icon: '👥', table: 'users', ops: 'Browse, Read, Edit, Add, Delete', desc: 'Управление учетными записями, ролями и доступами' },
        { name: 'Роли (Roles)', icon: '🛡️', table: 'roles', ops: 'Browse, Read, Edit, Add, Delete', desc: 'Настройка прав доступа (admin, moderator, editor, user)' },
        { name: 'Данные курсов (Data)', icon: '📊', table: 'data_records', ops: 'Browse, Read, Edit, Add, Delete', desc: 'Спарсенные из Excel таблицы данных студентов и курсов' },
        { name: 'Журнал действий (Logs)', icon: '📝', table: 'activity_logs', ops: 'Browse, Read, Delete', desc: 'Аудит действий, сравнение состояний до и после изменений' },
        { name: 'Файлы (Files / Media)', icon: '📁', table: 'uploaded_files', ops: 'Browse, Read, Add, Delete', desc: 'Менеджер медиафайлов: локальное хранилище и Google Диск' },
        { name: 'Настройки (Settings)', icon: '⚙️', table: 'settings', ops: 'Browse, Read, Edit', desc: 'Конфигурация системы, версирование API и параметры пагинации' },
      ],
    }
  },
  computed: {
    stats() {
      return [
        { icon: '👥', value: this.users.length, label: 'Пользователей' },
        { icon: '📋', value: this.dataCount, label: 'Записей' },
        { icon: '📁', value: this.filesCount, label: 'Файлов' },
        { icon: '📝', value: this.logsCount, label: 'Логов' },
      ]
    },
    dataCount() {
      return JSON.parse(localStorage.getItem('excelData') || '[]').length
    },
    filesCount() {
      return JSON.parse(localStorage.getItem('uploadedFiles') || '[]').length
    },
    logsCount() {
      return JSON.parse(localStorage.getItem('logs') || '[]').length
    },
    breadColumns() {
      const row = this.breadRows[0]
      if (!row) return []
      return Object.keys(row).filter((key) => key !== 'password').slice(0, 6)
    },
  },
  mounted() {
    this.loadUsers()
    this.loadSettings()
    this.loadBreadSources()
  },
  methods: {
    async loadUsers() {
      try {
        const purged = await usersApi.purgeEmpty()
        this.users = await usersApi.getAll()
        if (this.breadTable === 'users') this.breadRows = this.users
        if (purged?.removed > 0) {
          this.showNotification(`Удалено пустых пользователей: ${purged.removed}. Осталось ${this.users.length}.`)
        }
      } catch (err) {
        console.error('Ошибка загрузки пользователей:', err)
      }
    },
    async loadBreadSources() {
      try {
        const data = await dataApi.getAll()
        this.dataRows = Array.isArray(data) ? data : (data.items || data.data || [])
      } catch { this.dataRows = [] }
      try {
        const logs = await logsApi.getAll()
        this.logRows = Array.isArray(logs) ? logs : []
      } catch { this.logRows = [] }
      try {
        const files = await filesApi.getAll()
        this.fileRows = Array.isArray(files) ? files : (files.items || [])
      } catch { this.fileRows = [] }
      this.openBread(this.breadTable)
    },
    breadCount(table) {
      if (table === 'users') return this.users.length
      if (table === 'roles') return this.availableRoles.length
      if (table === 'data_records') return this.dataRows.length
      if (table === 'activity_logs') return this.logRows.length
      if (table === 'uploaded_files') return this.fileRows.length
      return 1
    },
    openBread(table) {
      this.breadTable = table
      if (table === 'users') this.breadRows = this.users
      else if (table === 'roles') {
        this.breadRows = this.availableRoles.map((role) => ({ id: role.value, name: role.label, role: role.value }))
      } else if (table === 'data_records') this.breadRows = this.dataRows
      else if (table === 'activity_logs') this.breadRows = this.logRows
      else if (table === 'uploaded_files') this.breadRows = this.fileRows
      else this.breadRows = [{ id: 1, project: this.settings.projectName, api: this.settings.apiVersion, perPage: this.settings.perPage }]
    },
    cell(value) {
      if (value == null || value === '') return '—'
      if (typeof value === 'object') return JSON.stringify(value).slice(0, 80)
      return String(value).slice(0, 80)
    },
    async purgeEmptyUsers() {
      const purged = await usersApi.purgeEmpty()
      await this.loadUsers()
      this.showNotification(`Пустые записи удалены: ${purged?.removed || 0}`)
    },
    loadSettings() {
      const saved = JSON.parse(localStorage.getItem('appSettings') || 'null')
      if (saved) {
        this.settings = saved
        setApiVersion(saved.apiVersion || 'v1')
      }
    },
    saveSettings() {
      localStorage.setItem('appSettings', JSON.stringify(this.settings))
      setApiVersion(this.settings.apiVersion)
      this.showNotification(`Настройки сохранены. Активная версия API: ${this.settings.apiVersion}`)
    },
    async updateRole(user, newRole) {
      const oldRole = user.role
      try {
        await usersApi.updateRole(user.id, newRole)
        user.role = newRole

        // Обновляем текущего пользователя если это он
        const currentUser = JSON.parse(localStorage.getItem('user') || 'null')
        if (currentUser && currentUser.id === user.id) {
          currentUser.role = newRole
          localStorage.setItem('user', JSON.stringify(currentUser))
        }

        await logService.log('UPDATE', 'user', user.id, { role: oldRole }, { role: newRole })
        this.showNotification(`Роль ${user.name} успешно обновлена на "${newRole}" (PUT)`)
      } catch (err) {
        this.showNotification('Ошибка обновления роли: ' + err.message, 'danger')
      }
    },
    async deleteUser(user) {
      if (!confirm(`Удалить пользователя "${user.name}"?`)) return
      try {
        await usersApi.delete(user.id)
        await logService.log('DELETE', 'user', user.id, user, null)
        this.showNotification(`Пользователь "${user.name}" удалён`)
        await this.loadUsers()
      } catch (err) {
        this.showNotification('Ошибка удаления: ' + err.message, 'danger')
      }
    },
    clearAllData() {
      if (confirm('Удалить все данные?')) {
        localStorage.setItem('excelData', '[]')
        this.showNotification('Все данные удалены')
      }
    },
    clearAllFiles() {
      if (confirm('Удалить все файлы?')) {
        localStorage.setItem('uploadedFiles', '[]')
        this.showNotification('Все файлы удалены')
      }
    },
    clearAllLogs() {
      if (confirm('Очистить все логи?')) {
        localStorage.setItem('logs', '[]')
        this.showNotification('Все логи очищены')
      }
    },
    generateTestData() {
      const names = ['Алексей', 'Мария', 'Дмитрий', 'Екатерина', 'Иван', 'Анна', 'Сергей', 'Ольга', 'Владислав', 'Полина']
      const lastNames = ['Смирнов', 'Иванова', 'Кузнецов', 'Ковалёва', 'Козлов', 'Новикова', 'Морозов', 'Волкова', 'Лебедев', 'Павлова']
      const courses = ['Frontend-разработка', 'Backend-разработка', 'UX/UI дизайн', 'Python-разработка']
      const cities = ['Минск', 'Гомель', 'Гродно', 'Брест', 'Витебск', 'Могилёв']
      const statuses = ['активный', 'завершил', 'в процессе', 'оффер получен']
      const prices = ['$129', '$140', '$119', '$99']
      const phonePrefixes = ['29', '44', '33', '25']

      const data = JSON.parse(localStorage.getItem('excelData') || '[]')

      for (let i = 0; i < 20; i++) {
        const name = names[Math.floor(Math.random() * names.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const prefix = phonePrefixes[Math.floor(Math.random() * phonePrefixes.length)]
        const phoneRand = Math.floor(1000000 + Math.random() * 9000000)

        data.push({
          id: Date.now() + i,
          Имя: name,
          Фамилия: lastName,
          Курс: courses[Math.floor(Math.random() * courses.length)],
          Email: `student${Date.now() + i}@codeway.by`,
          Телефон: `+375 (${prefix}) ${String(phoneRand).slice(0, 3)}-${String(phoneRand).slice(3, 5)}-${String(phoneRand).slice(5, 7)}`,
          Город: cities[Math.floor(Math.random() * cities.length)],
          Стоимость: prices[Math.floor(Math.random() * prices.length)],
          Статус: statuses[Math.floor(Math.random() * statuses.length)],
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          source: 'Академия CodeWay (Минск)',
        })
      }

      localStorage.setItem('excelData', JSON.stringify(data))
      this.showNotification('Добавлено 20 тестовых записей студентов из Беларуси (цены в $)')
    },
    showNotification(message, type = 'success') {
      this.notification = { message, type }
      setTimeout(() => { this.notification = null }, 3000)
    },
    formatDate(dateStr) {
      if (!dateStr) return '—'
      return new Date(dateStr).toLocaleDateString('ru-RU')
    },
  },
}
</script>

<style scoped>
.nav-link {
  color: var(--text-muted) !important;
  border-color: var(--border-subtle) !important;
}
.nav-link.active {
  background: var(--bg-card) !important;
  color: var(--text-white) !important;
  border-color: var(--border-bright) var(--border-bright) var(--bg-card) !important;
}
</style>
