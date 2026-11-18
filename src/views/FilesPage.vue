<!-- Страница управления файлами (Задание 3) — локальное и удалённое хранилище -->
<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 style="color: var(--text-white); font-weight: 800;" class="mb-1">Управление файлами</h2>
        <p style="color: var(--text-muted); font-size: 14px;" class="mb-0">
          Просмотр и управление загруженными файлами (Задание 3)
        </p>
      </div>
    </div>

    <!-- Табы: Локальное / Google Drive -->
    <ul class="nav nav-tabs mb-4" style="border-color: var(--border-subtle);">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'local' }"
          href="#"
          @click.prevent="activeTab = 'local'"
          style="border-radius: 12px 12px 0 0;"
        >
          📁 Локальное хранилище ({{ localFiles.length }})
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'gdrive' }"
          href="#"
          @click.prevent="activeTab = 'gdrive'"
          style="border-radius: 12px 12px 0 0;"
        >
          ☁️ Google Диск ({{ gdriveFiles.length }})
        </a>
      </li>
    </ul>

    <!-- Локальное хранилище -->
    <div v-if="activeTab === 'local'">
      <div class="card" style="border-radius: 16px; overflow: hidden;">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Название файла</th>
                <th>Размер</th>
                <th>Формат</th>
                <th>Записей</th>
                <th>Дата загрузки</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="localFiles.length === 0">
                <td colspan="7" class="text-center py-5" style="color: var(--text-muted);">
                  <div style="font-size: 36px;">📂</div>
                  <p class="mt-2">Нет загруженных файлов</p>
                  <router-link to="/" class="btn btn-primary btn-sm">Загрузить файл</router-link>
                </td>
              </tr>
              <tr v-for="(file, index) in localFiles" :key="file.id">
                <td style="color: var(--text-muted);">{{ index + 1 }}</td>
                <td>
                  <strong style="color: var(--text-white);">{{ file.name }}</strong>
                </td>
                <td style="color: var(--text-muted);">{{ formatSize(file.size) }}</td>
                <td>
                  <span class="badge badge-info">{{ file.type }}</span>
                </td>
                <td>{{ file.rowCount || '—' }}</td>
                <td style="color: var(--text-muted); font-size: 13px;">{{ formatDate(file.uploadedAt) }}</td>
                <td>
                  <div class="d-flex" style="gap: 6px;">
                    <button class="btn btn-outline-primary btn-sm" @click="uploadToGDrive(file)" title="Отправить на Google Диск">
                      ☁️
                    </button>
                    <button class="btn btn-outline-primary btn-sm" @click="downloadFile(file)" title="Скачать">
                      📥
                    </button>
                    <button class="btn btn-outline-danger btn-sm" @click="deleteLocalFile(file)" title="Удалить">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Google Drive -->
    <div v-if="activeTab === 'gdrive'">
      <div class="alert alert-info mb-4">
        <strong>ℹ️ Google Диск</strong> — имитация загрузки файлов на Google Drive.
        Файлы сохраняются в localStorage с пометкой "gdrive".
        Можно восстановить дамп обратно в базу данных.
      </div>

      <div class="card" style="border-radius: 16px; overflow: hidden;">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Название файла</th>
                <th>Размер</th>
                <th>Записей</th>
                <th>Дата загрузки</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="gdriveFiles.length === 0">
                <td colspan="6" class="text-center py-5" style="color: var(--text-muted);">
                  <div style="font-size: 36px;">☁️</div>
                  <p class="mt-2">Нет файлов на Google Диске</p>
                </td>
              </tr>
              <tr v-for="(file, index) in gdriveFiles" :key="file.id">
                <td style="color: var(--text-muted);">{{ index + 1 }}</td>
                <td>
                  <strong style="color: var(--text-white);">{{ file.name }}</strong>
                  <br><small style="color: var(--accent-cyan);">☁️ Google Drive</small>
                </td>
                <td style="color: var(--text-muted);">{{ formatSize(file.size) }}</td>
                <td>{{ file.rowCount || '—' }}</td>
                <td style="color: var(--text-muted); font-size: 13px;">{{ formatDate(file.uploadedAt) }}</td>
                <td>
                  <div class="d-flex" style="gap: 6px;">
                    <button class="btn btn-outline-primary btn-sm" @click="restoreFromGDrive(file)" title="Восстановить в БД">
                      ♻️ Восстановить
                    </button>
                    <button class="btn btn-outline-danger btn-sm" @click="deleteGDriveFile(file)" title="Удалить">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Задание 1: Кнопка отправки на почту и Google Диск -->
    <div class="card mt-4 p-4" style="border-radius: 16px;">
      <h5 style="color: var(--text-white); font-weight: 700;" class="mb-3">Быстрые действия (Задание 1)</h5>
      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card p-3" style="border-radius: 12px;">
            <h6 style="color: var(--text-white);">📧 Отправить дамп на почту</h6>
            <div class="form-group mt-2">
              <input type="email" class="form-control" v-model="emailForDump" placeholder="email@example.com" />
            </div>
            <button class="btn btn-primary btn-sm" @click="sendDumpToEmail" :disabled="!emailForDump">
              Отправить дамп
            </button>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card p-3" style="border-radius: 12px;">
            <h6 style="color: var(--text-white);">☁️ Загрузить дамп на Google Диск</h6>
            <p style="color: var(--text-muted); font-size: 13px;" class="mt-2">
              Создать дамп всех данных и загрузить на Google Диск.
              При дублировании данные обновятся.
            </p>
            <button class="btn btn-primary btn-sm" @click="dumpToGDrive">
              Загрузить дамп
            </button>
          </div>
        </div>
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
import * as XLSX from 'xlsx'
import { filesApi, gdriveApi, dataApi } from '../services/api'
import logService from '../services/logService'

export default {
  name: 'FilesPage',
  data() {
    return {
      activeTab: 'local',
      allFiles: [],
      emailForDump: '',
      notification: null,
      isLoading: false,
    }
  },
  computed: {
    localFiles() {
      return this.allFiles.filter(f => f.storage === 'local')
    },
    gdriveFiles() {
      return this.allFiles.filter(f => f.storage === 'gdrive')
    },
  },
  mounted() {
    this.loadFiles()
  },
  methods: {
    async loadFiles() {
      this.isLoading = true
      try {
        const files = await filesApi.getAll()
        this.allFiles = files
      } catch (e) {
        console.error('Ошибка загрузки файлов:', e)
      } finally {
        this.isLoading = false
      }
    },
    formatSize(bytes) {
      if (!bytes) return '—'
      if (bytes < 1024) return bytes + ' Б'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ'
      return (bytes / (1024 * 1024)).toFixed(1) + ' МБ'
    },
    formatDate(dateStr) {
      if (!dateStr) return '—'
      return new Date(dateStr).toLocaleDateString('ru-RU', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    },
    showNotification(message, type = 'success') {
      this.notification = { message, type }
      setTimeout(() => { this.notification = null }, 3500)
    },
    async deleteLocalFile(file) {
      if (!confirm(`Удалить файл "${file.name}" из локального хранилища?`)) return
      try {
        await filesApi.delete(file.id)
        await logService.log('DELETE', 'file', file.id, file, null)
        this.showNotification(`Файл "${file.name}" удалён из локального хранилища`)
        await this.loadFiles()
      } catch (err) {
        this.showNotification('Ошибка удаления файла: ' + err.message, 'danger')
      }
    },
    async deleteGDriveFile(file) {
      if (!confirm(`Удалить файл "${file.name}" с Google Диска?`)) return
      try {
        await filesApi.delete(file.id)
        await logService.log('DELETE', 'file', file.id, { ...file, storage: 'gdrive' }, null)
        this.showNotification(`Файл "${file.name}" удалён с Google Диска`)
        await this.loadFiles()
      } catch (err) {
        this.showNotification('Ошибка удаления с Google Диска: ' + err.message, 'danger')
      }
    },
    async uploadToGDrive(file) {
      try {
        const gdriveFile = {
          ...file,
          id: Date.now(),
          storage: 'gdrive',
          uploadedAt: new Date().toISOString(),
          originalId: file.id,
        }
        await filesApi.upload(gdriveFile)
        await logService.log('UPLOAD', 'file', gdriveFile.id, null, { ...gdriveFile, storage: 'gdrive' })
        this.showNotification(`Файл "${file.name}" загружен на Google Диск`)
        await this.loadFiles()
      } catch (err) {
        this.showNotification('Ошибка отправки на Google Диск: ' + err.message, 'danger')
      }
    },
    async restoreFromGDrive(file) {
      // Восстановление данных из дампа Google Drive в БД с дедупликацией/обновлением
      if (!file.data) {
        this.showNotification('Файл не содержит данных дампа', 'danger')
        return
      }

      try {
        const binaryStr = atob(file.data)
        const bytes = new Uint8Array(binaryStr.length)
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i)
        }

        const workbook = XLSX.read(bytes, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // Вызов API восстановления с дедупликацией на сервере
        await gdriveApi.restore(jsonData)

        await logService.log('RESTORE', 'data', file.id, null, { fileName: file.name, rowCount: jsonData.length })
        this.showNotification(`Данные из "${file.name}" успешно восстановлены в БД (${jsonData.length} записей)`)
      } catch (err) {
        this.showNotification('Ошибка при восстановлении: ' + err.message, 'danger')
      }
    },
    downloadFile(file) {
      if (!file.data) {
        this.showNotification('Файл не содержит данных для скачивания', 'danger')
        return
      }
      try {
        const binaryStr = atob(file.data)
        const bytes = new Uint8Array(binaryStr.length)
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i)
        }
        const blob = new Blob([bytes], { type: file.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = file.name
        a.click()
        URL.revokeObjectURL(url)
      } catch (err) {
        this.showNotification('Ошибка скачивания: ' + err.message, 'danger')
      }
    },
    async dumpToGDrive() {
      try {
        const allData = await dataApi.getAll()
        if (allData.length === 0) {
          this.showNotification('Нет данных в таблице для создания дампа', 'danger')
          return
        }

        // Создаём Excel дамп
        const ws = XLSX.utils.json_to_sheet(allData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Dump')
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const base64 = btoa(String.fromCharCode(...new Uint8Array(wbout)))

        const dumpFile = {
          name: `dump_${new Date().toISOString().split('T')[0]}.xlsx`,
          size: wbout.byteLength,
          type: '.xlsx',
          data: base64,
          storage: 'gdrive',
          rowCount: allData.length,
        }

        await gdriveApi.dump(dumpFile)
        await logService.log('UPLOAD', 'file', Date.now(), null, { name: dumpFile.name, storage: 'gdrive', rowCount: allData.length })

        this.showNotification(`Дамп (${allData.length} записей) успешно сохранен на Google Диск`)
        await this.loadFiles()
      } catch (err) {
        this.showNotification('Ошибка создания дампа: ' + err.message, 'danger')
      }
    },
    async sendDumpToEmail() {
      if (!this.emailForDump) return
      try {
        const allData = await dataApi.getAll()
        await gdriveApi.sendEmail({
          email: this.emailForDump,
          fileName: `dump_${new Date().toISOString().slice(0, 10)}.xlsx`,
          rowCount: allData.length,
        })
        this.showNotification(`Дамп (${allData.length} записей) успешно отправлен на ${this.emailForDump}`)
        this.emailForDump = ''
      } catch (err) {
        this.showNotification('Ошибка отправки: ' + err.message, 'danger')
      }
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
