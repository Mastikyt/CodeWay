<!-- Страница отображения данных — таблица с CRUD, постраничной загрузкой, ленивой подгрузкой и фильтрацией -->
<template>
  <div class="container py-5">
    <!-- Заголовок страницы -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
      <div>
        <h2 style="color: var(--text-white); font-weight: 800;" class="mb-1">Данные</h2>
        <p style="color: var(--text-muted); font-size: 14px;" class="mb-0">
          Всего записей: <strong>{{ totalItems }}</strong>
          <span v-if="isLoading" class="spinner-border spinner-border-sm ml-2 text-primary" role="status"></span>
        </p>
      </div>
      <div class="d-flex flex-wrap" style="gap: 12px;">
        <button class="btn btn-primary" @click="openAddModal">
          + Добавить запись
        </button>
        <button class="btn btn-outline-primary" @click="exportToExcel">
          📥 Экспорт в Excel
        </button>
        <button class="btn btn-outline-secondary" @click="fetchData" title="Обновить">
          🔄
        </button>
      </div>
    </div>

    <!-- Блок фильтрации (Задание 3: по дате добавления, за период, по страницам) -->
    <div class="card mb-4 p-3" style="border-radius: 16px;">
      <div class="row align-items-end">
        <div class="col-md-3 mb-2">
          <label style="color: var(--text-muted); font-size: 12px; font-weight: 600;">Поиск по данным</label>
          <input
            type="text"
            class="form-control"
            v-model="searchQuery"
            placeholder="Имя, курс, email..."
            @input="debounceSearch"
          />
        </div>
        <div class="col-md-3 mb-2">
          <label style="color: var(--text-muted); font-size: 12px; font-weight: 600;">Дата добавления (точно)</label>
          <input
            type="date"
            class="form-control"
            v-model="filterDate"
            @change="fetchData"
          />
        </div>
        <div class="col-md-2 mb-2">
          <label style="color: var(--text-muted); font-size: 12px; font-weight: 600;">Период от</label>
          <input
            type="date"
            class="form-control"
            v-model="dateFrom"
            @change="fetchData"
          />
        </div>
        <div class="col-md-2 mb-2">
          <label style="color: var(--text-muted); font-size: 12px; font-weight: 600;">Период до</label>
          <input
            type="date"
            class="form-control"
            v-model="dateTo"
            @change="fetchData"
          />
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn btn-outline-primary btn-block" @click="resetFilters">
            Сбросить
          </button>
        </div>
      </div>
    </div>

    <!-- Таблица данных -->
    <div class="card shadow-sm" style="border-radius: 16px; overflow: hidden;">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th v-for="col in columns" :key="col.key" @click="sortBy(col.key)" style="cursor: pointer;">
                {{ col.label }}
                <span v-if="sortColumn === col.key">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th>Дата добавления</th>
              <th style="width: 130px; text-align: center;">Действия</th>
            </tr>
          </thead>
          <tbody>
            <!-- Состояние загрузки -->
            <tr v-if="isLoading && items.length === 0">
              <td :colspan="columns.length + 3" class="text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-muted">Асинхронная загрузка данных...</p>
              </td>
            </tr>

            <!-- Пустая таблица -->
            <tr v-else-if="items.length === 0">
              <td :colspan="columns.length + 3" class="text-center py-5" style="color: var(--text-muted);">
                <div style="font-size: 40px;">📋</div>
                <h5 class="mt-2" style="color: var(--text-white);">Данные не найдены</h5>
                <p class="text-muted">Загрузите Excel на главной или добавьте первую запись</p>
                <button class="btn btn-primary btn-sm" @click="openAddModal">+ Добавить запись</button>
              </td>
            </tr>

            <!-- Строки таблицы -->
            <tr v-else v-for="(item, index) in items" :key="item.id">
              <td style="color: var(--text-muted); font-size: 13px;">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td v-for="col in columns" :key="col.key">
                {{ item[col.key] !== undefined && item[col.key] !== null ? item[col.key] : '—' }}
              </td>
              <td style="color: var(--text-muted); font-size: 13px;">
                {{ formatDate(item.createdAt) }}
              </td>
              <td style="text-align: center;">
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-primary" @click="openEditModal(item)" title="Редактировать">
                    ✏️
                  </button>
                  <button class="btn btn-outline-danger" @click="deleteItem(item)" title="Удалить">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Нижняя панель: Пагинация (если > 10 строк) + кнопка ленивой подгрузки -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mt-4">
      <!-- Постраничная загрузка (если данных > 10 строк) -->
      <div v-if="totalItems > 10">
        <nav aria-label="Пагинация данных">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">« Назад</a>
            </li>
            <li
              class="page-item"
              v-for="p in visiblePages"
              :key="p"
              :class="{ active: p === currentPage }"
            >
              <a class="page-link" href="#" @click.prevent="goToPage(p)">{{ p }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Вперед »</a>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else></div>

      <!-- Кнопка ленивой подгрузки данных -->
      <div v-if="items.length < totalItems">
        <button
          class="btn btn-outline-primary"
          @click="loadMore"
          :disabled="isLoadingMore"
        >
          <span v-if="isLoadingMore" class="spinner-border spinner-border-sm mr-2" role="status"></span>
          <span>⚡ Загрузить ещё 10 записей (Lazy Load)</span>
        </button>
      </div>
    </div>

    <!-- Переиспользуемый компонент модального окна для добавления и обновления данных -->
    <DataFormModal
      modal-id="dataModal"
      :fields="formFields"
      :edit-data="editData"
      @submit="handleFormSubmit"
      ref="dataFormModal"
    />

    <!-- Модальное окно подтверждения удаления -->
    <ModalDialog
      modal-id="deleteModal"
      title="Подтверждение удаления"
      confirm-text="Удалить"
      cancel-text="Отмена"
      @confirm="confirmDelete"
      ref="deleteModal"
    >
      <p style="color: var(--text-secondary);">
        Вы уверены, что хотите удалить эту запись? Данное действие необратимо и будет зафиксировано в журнале логов.
      </p>
    </ModalDialog>

    <!-- Всплывающее уведомление -->
    <div v-if="notification" class="position-fixed" style="top: 90px; right: 24px; z-index: 1060; min-width: 320px;">
      <div :class="'alert alert-' + notification.type" class="shadow-lg mb-0 animate__animated animate__fadeIn">
        {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import { dataApi } from '../services/api'
import logService from '../services/logService'
import DataFormModal from '../components/DataFormModal.vue'
import ModalDialog from '../components/ModalDialog.vue'

export default {
  name: 'DataPage',
  components: {
    DataFormModal,
    ModalDialog,
  },
  data() {
    return {
      items: [],
      rawAllData: [],
      totalItems: 0,
      currentPage: 1,
      perPage: 10,
      isLoading: false,
      isLoadingMore: false,
      editData: null,
      deleteTarget: null,
      searchQuery: '',
      filterDate: '',
      dateFrom: '',
      dateTo: '',
      sortColumn: '',
      sortDirection: 'asc',
      searchTimer: null,
      notification: null,
    }
  },
  computed: {
    columns() {
      const sample = this.rawAllData[0] || this.items[0]
      if (!sample) return []
      const exclude = ['id', 'createdAt', 'source', 'updatedAt']
      return Object.keys(sample)
        .filter(k => !exclude.includes(k))
        .slice(0, 6)
        .map(k => ({ key: k, label: k }))
    },
    formFields() {
      if (this.columns.length === 0) {
        // Поля по умолчанию для создания новой таблицы
        return [
          { key: 'Имя', label: 'Имя', type: 'text', required: true, placeholder: 'Имя студента' },
          { key: 'Фамилия', label: 'Фамилия', type: 'text', required: true, placeholder: 'Фамилия' },
          { key: 'Курс', label: 'Курс', type: 'text', required: true, placeholder: 'Frontend, Python...' },
          { key: 'Email', label: 'Email', type: 'email', required: true, placeholder: 'user@example.com' },
          { key: 'Статус', label: 'Статус', type: 'text', required: false, placeholder: 'активный' },
        ]
      }
      return this.columns.map(c => ({
        key: c.key,
        label: c.label,
        type: c.key.toLowerCase().includes('email') ? 'email' : 'text',
        required: true,
        placeholder: `Введите ${c.label}`,
      }))
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.totalItems / this.perPage))
    },
    visiblePages() {
      const pages = []
      const count = Math.min(5, this.totalPages)
      let start = Math.max(1, this.currentPage - 2)
      let end = Math.min(this.totalPages, start + count - 1)
      start = Math.max(1, end - count + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      return pages
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // Асинхронный запрос к API
    async fetchData(isLoadMore = false) {
      if (isLoadMore) {
        this.isLoadingMore = true
      } else {
        this.isLoading = true
      }

      try {
        const params = {
          q: this.searchQuery || undefined,
          created_at: this.filterDate || undefined,
          date_from: this.dateFrom || undefined,
          date_to: this.dateTo || undefined,
          _sort: this.sortColumn || undefined,
          _order: this.sortDirection,
        }

        // Запрос к асинхронному API
        const allFiltered = await dataApi.getAll(params)
        this.rawAllData = allFiltered
        this.totalItems = allFiltered.length

        // Клиентская или серверная разбивка по страницам
        const start = (this.currentPage - 1) * this.perPage
        const end = start + this.perPage

        if (isLoadMore) {
          // При ленивой подгрузке добавляем к текущему списку
          const nextItems = allFiltered.slice(this.items.length, this.items.length + 10)
          this.items = [...this.items, ...nextItems]
        } else {
          // Обычная загрузка страницы
          this.items = allFiltered.slice(start, end)
        }
      } catch (err) {
        this.showNotification('Ошибка загрузки данных: ' + err.message, 'danger')
      } finally {
        this.isLoading = false
        this.isLoadingMore = false
      }
    },

    debounceSearch() {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.currentPage = 1
        this.fetchData()
      }, 300)
    },

    goToPage(p) {
      if (p < 1 || p > this.totalPages) return
      this.currentPage = p
      this.fetchData()
    },

    // Ленивая подгрузка
    async loadMore() {
      this.fetchData(true)
    },

    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = column
        this.sortDirection = 'asc'
      }
      this.fetchData()
    },

    resetFilters() {
      this.searchQuery = ''
      this.filterDate = ''
      this.dateFrom = ''
      this.dateTo = ''
      this.sortColumn = ''
      this.currentPage = 1
      this.fetchData()
    },

    // Открытие модального окна добавления (переиспользуемый компонент)
    openAddModal() {
      this.editData = null
      this.$nextTick(() => {
        this.$refs.dataFormModal.show()
      })
    },

    // Открытие модального окна редактирования (переиспользуемый компонент)
    openEditModal(item) {
      this.editData = { ...item }
      this.$nextTick(() => {
        this.$refs.dataFormModal.show()
      })
    },

    // Обработка сохранения в модальном окне (POST для создания, PUT для обновления)
    async handleFormSubmit({ data, isEdit }) {
      try {
        if (isEdit) {
          // PUT — обновление ресурса
          const oldItem = this.items.find(i => i.id === data.id)
          const updated = await dataApi.update(data.id, data)
          await logService.log('UPDATE', 'data', data.id, oldItem, updated)
          this.showNotification('Запись успешно обновлена (PUT)')
        } else {
          // POST — создание ресурса
          const created = await dataApi.create(data)
          await logService.log('CREATE', 'data', created.id, null, created)
          this.showNotification('Запись успешно добавлена (POST)')
        }
        this.$refs.dataFormModal.hide()
        await this.fetchData()
      } catch (err) {
        this.showNotification('Ошибка сохранения: ' + err.message, 'danger')
      }
    },

    // Запрос на удаление
    deleteItem(item) {
      this.deleteTarget = item
      this.$refs.deleteModal.show()
    },

    // Подтверждение удаления (DELETE — удаление ресурса)
    async confirmDelete() {
      if (!this.deleteTarget) return
      try {
        await dataApi.delete(this.deleteTarget.id)
        await logService.log('DELETE', 'data', this.deleteTarget.id, this.deleteTarget, null)
        this.showNotification('Запись успешно удалена (DELETE)')
        this.deleteTarget = null
        this.$refs.deleteModal.hide()
        await this.fetchData()
      } catch (err) {
        this.showNotification('Ошибка удаления: ' + err.message, 'danger')
      }
    },

    // Экспорт в Excel
    exportToExcel() {
      if (this.rawAllData.length === 0) {
        this.showNotification('Нет данных для экспорта', 'warning')
        return
      }
      const ws = XLSX.utils.json_to_sheet(this.rawAllData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'CodeWay_Data')
      XLSX.writeFile(wb, `codeway_export_${new Date().toISOString().slice(0, 10)}.xlsx`)
      this.showNotification('Файл Excel сформирован и скачан')
    },

    formatDate(str) {
      if (!str) return '—'
      try {
        return new Date(str).toLocaleDateString('ru-RU', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        })
      } catch {
        return str
      }
    },

    showNotification(message, type = 'success') {
      this.notification = { message, type }
      setTimeout(() => {
        if (this.notification?.message === message) {
          this.notification = null
        }
      }, 3500)
    },
  },
}
</script>

<style scoped>
.pagination .page-link {
  cursor: pointer;
}
</style>
