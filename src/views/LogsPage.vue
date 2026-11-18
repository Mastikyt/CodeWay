<!-- Страница логов (Задание 2) — история действий с vue-json-compare -->
<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 style="color: var(--text-white); font-weight: 800;" class="mb-1">История действий</h2>
        <p style="color: var(--text-muted); font-size: 14px;" class="mb-0">
          Журнал всех операций (Задание 2)
        </p>
      </div>
      <button class="btn btn-outline-danger btn-sm" @click="clearLogs">Очистить логи</button>
    </div>

    <!-- Фильтры -->
    <div class="card mb-4 p-3" style="border-radius: 16px;">
      <div class="row align-items-end">
        <div class="col-md-3 mb-2">
          <label style="color: var(--text-muted); font-size: 12px; font-weight: 600;">Действие</label>
          <select class="form-control" v-model="filterAction">
            <option value="">Все</option>
            <option value="CREATE">Создание</option>
            <option value="UPDATE">Обновление</option>
            <option value="DELETE">Удаление</option>
            <option value="UPLOAD">Загрузка</option>
            <option value="LOGIN">Вход</option>
            <option value="REGISTER">Регистрация</option>
          </select>
        </div>
        <div class="col-md-3 mb-2">
          <label style="color: var(--text-muted); font-size: 12px; font-weight: 600;">Тип сущности</label>
          <select class="form-control" v-model="filterEntity">
            <option value="">Все</option>
            <option value="data">Данные</option>
            <option value="file">Файлы</option>
            <option value="user">Пользователи</option>
          </select>
        </div>
        <div class="col-md-3 mb-2">
          <label style="color: var(--text-muted); font-size: 12px; font-weight: 600;">Дата от</label>
          <input type="date" class="form-control" v-model="dateFrom" />
        </div>
        <div class="col-md-3 mb-2">
          <label style="color: var(--text-muted); font-size: 12px; font-weight: 600;">Дата до</label>
          <input type="date" class="form-control" v-model="dateTo" />
        </div>
      </div>
    </div>

    <!-- Таблица логов -->
    <div class="card" style="border-radius: 16px; overflow: hidden;">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th>Действие</th>
              <th>Тип</th>
              <th>ID объекта</th>
              <th>Пользователь</th>
              <th>Дата</th>
              <th style="width: 100px;">Сравнение</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredLogs.length === 0">
              <td colspan="7" class="text-center py-5" style="color: var(--text-muted);">
                <div style="font-size: 36px;">📝</div>
                <p class="mt-2">Нет записей в журнале</p>
              </td>
            </tr>
            <tr v-for="(log, index) in paginatedLogs" :key="log.id">
              <td style="color: var(--text-muted); font-size: 13px;">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td>
                <span class="badge" :class="actionBadgeClass(log.action)">
                  {{ actionLabel(log.action) }}
                </span>
              </td>
              <td>{{ entityLabel(log.entityType) }}</td>
              <td style="font-family: 'Fira Code', monospace; font-size: 12px; color: var(--text-muted);">
                {{ log.entityId || '—' }}
              </td>
              <td>{{ log.userName }}</td>
              <td style="font-size: 13px; color: var(--text-muted);">
                {{ formatDate(log.createdAt) }}
              </td>
              <td>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="showCompare(log)"
                  v-if="log.oldData || log.newData"
                  title="Сравнить состояния"
                >
                  🔍
                </button>
                <span v-else style="color: var(--text-muted);">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Пагинация: окно из 5 страниц, а не ссылка на каждую запись -->
    <div
      class="d-flex flex-wrap justify-content-between align-items-center mt-4"
      v-if="filteredLogs.length > 0"
    >
      <small style="color: var(--text-muted);">
        Показано {{ (currentPage - 1) * perPage + 1 }}–{{
          Math.min(currentPage * perPage, filteredLogs.length)
        }}
        из {{ filteredLogs.length }}
      </small>
      <nav aria-label="Пагинация журнала" v-if="totalPages > 1">
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">« Назад</a>
          </li>
          <li
            class="page-item"
            v-for="page in visiblePages"
            :key="page"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Вперед »</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Модальное окно сравнения JSON (vue-json-compare) -->
    <ModalDialog
      modal-id="compareModal"
      :title="'Сравнение состояний — ' + (compareLog?.action || '')"
      :show-footer="false"
      size="lg"
      ref="compareModal"
    >
      <div v-if="compareLog">
        <div class="mb-3">
          <small style="color: var(--text-muted);">
            Действие: <strong>{{ actionLabel(compareLog.action) }}</strong> |
            Пользователь: <strong>{{ compareLog.userName }}</strong> |
            Дата: <strong>{{ formatDate(compareLog.createdAt) }}</strong>
          </small>
        </div>
        <!-- Использование компонента vue-json-compare для сравнения состояний объекта до и после -->
        <vue-json-compare :old-data="compareLog.oldData" :new-data="compareLog.newData" />
      </div>
    </ModalDialog>
  </div>
</template>

<script>
import ModalDialog from '../components/ModalDialog.vue'
import JsonCompare from '../components/JsonCompare.vue'
import { logsApi } from '../services/api'

export default {
  name: 'LogsPage',
  components: { ModalDialog, JsonCompare },
  data() {
    return {
      logs: [],
      currentPage: 1,
      perPage: 10,
      filterAction: '',
      filterEntity: '',
      dateFrom: '',
      dateTo: '',
      compareLog: null,
      isLoading: false,
    }
  },
  computed: {
    filteredLogs() {
      let data = [...this.logs]

      if (this.filterAction) {
        data = data.filter(l => l.action === this.filterAction)
      }
      if (this.filterEntity) {
        data = data.filter(l => l.entityType === this.filterEntity)
      }
      if (this.dateFrom) {
        data = data.filter(l => l.createdAt?.split('T')[0] >= this.dateFrom)
      }
      if (this.dateTo) {
        data = data.filter(l => l.createdAt?.split('T')[0] <= this.dateTo)
      }

      return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredLogs.length / this.perPage))
    },
    visiblePages() {
      const pages = []
      const count = Math.min(5, this.totalPages)
      let start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, start + count - 1)
      start = Math.max(1, end - count + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      return pages
    },
    paginatedLogs() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filteredLogs.slice(start, start + this.perPage)
    },
  },
  watch: {
    // Сброс на первую страницу, когда фильтр уменьшает список
    filterAction() { this.currentPage = 1 },
    filterEntity() { this.currentPage = 1 },
    dateFrom() { this.currentPage = 1 },
    dateTo() { this.currentPage = 1 },
  },
  mounted() {
    this.loadLogs()
  },
  methods: {
    async loadLogs() {
      this.isLoading = true
      try {
        const data = await logsApi.getAll({
          action: this.filterAction || undefined,
          entityType: this.filterEntity || undefined,
          date_from: this.dateFrom || undefined,
          date_to: this.dateTo || undefined,
        })
        this.logs = data
      } catch (e) {
        console.error('Ошибка загрузки логов:', e)
      } finally {
        this.isLoading = false
      }
    },
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return
      this.currentPage = page
    },
    async clearLogs() {
      if (confirm('Вы уверены, что хотите очистить все логи?')) {
        await logsApi.clear()
        this.logs = []
      }
    },
    showCompare(log) {
      this.compareLog = log
      this.$nextTick(() => this.$refs.compareModal.show())
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
      }
      return map[action] || action
    },
    entityLabel(type) {
      const map = { data: 'Данные', file: 'Файл', user: 'Пользователь' }
      return map[type] || type
    },
    formatDate(dateStr) {
      if (!dateStr) return '—'
      return new Date(dateStr).toLocaleDateString('ru-RU', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      })
    },
  },
}
</script>

<style scoped>
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
