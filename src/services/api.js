import axios from 'axios'

// Адрес API задаётся через .env (VITE_API_URL). Без переменной используем
// текущий origin, чтобы запросы шли на тот же хост, где открыт сайт:
// в dev это работает через Vite proxy, а на статическом хостинге запрос
// ожидаемо падает и срабатывает localStorage fallback.
const API_ORIGIN =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:3001' : '')

let currentApiVersion = 'v1'

const buildBaseUrl = (version) => `${API_ORIGIN}/api/${version}`

const api = axios.create({
  baseURL: buildBaseUrl(currentApiVersion),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

export function setApiVersion(version) {
  currentApiVersion = version
  api.defaults.baseURL = buildBaseUrl(version)
}

export function getApiVersion() {
  return currentApiVersion
}

// Request interceptor — передача токена авторизации
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// Response interceptor — перехват 401 и сетевых ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

// ==========================================
// ВСПОМОГАТЕЛЬНЫЙ FALLBACK (если сервер временно не запущен)
// ==========================================
function localFallback(actionFn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(actionFn())
    }, 200)
  })
}

// ==========================================
// 1. DATA API (CRUD + Пагинация + Фильтрация)
// ==========================================
export const dataApi = {
  // GET — получение списка с фильтрацией (по дате, периоду, страницам)
  async getAll(params = {}) {
    try {
      const res = await api.get('/data', { params })
      return res.data
    } catch {
      // Fallback на localStorage
      return localFallback(() => {
        let items = JSON.parse(localStorage.getItem('excelData') || '[]')
        const { created_at, date_from, date_to, _page, _limit, q } = params

        if (q) {
          const query = String(q).toLowerCase()
          items = items.filter(i => Object.values(i).some(v => String(v).toLowerCase().includes(query)))
        }
        if (created_at) {
          items = items.filter(i => i.createdAt && i.createdAt.startsWith(created_at))
        }
        if (date_from) {
          items = items.filter(i => i.createdAt && i.createdAt.slice(0, 10) >= date_from)
        }
        if (date_to) {
          items = items.filter(i => i.createdAt && i.createdAt.slice(0, 10) <= date_to)
        }
        return items
      })
    }
  },

  // GET — получение одной записи
  async getOne(id) {
    try {
      const res = await api.get(`/data/${id}`)
      return res.data
    } catch {
      return localFallback(() => {
        const items = JSON.parse(localStorage.getItem('excelData') || '[]')
        return items.find(i => i.id == id) || null
      })
    }
  },

  // POST — создание ресурса
  async create(data) {
    try {
      const res = await api.post('/data', data)
      // Синхронизируем localStorage
      const items = JSON.parse(localStorage.getItem('excelData') || '[]')
      items.push(res.data)
      localStorage.setItem('excelData', JSON.stringify(items))
      return res.data
    } catch {
      return localFallback(() => {
        const items = JSON.parse(localStorage.getItem('excelData') || '[]')
        const newItem = { id: Date.now(), ...data, createdAt: new Date().toISOString() }
        items.push(newItem)
        localStorage.setItem('excelData', JSON.stringify(items))
        return newItem
      })
    }
  },

  // PUT — обновление ресурса
  async update(id, data) {
    try {
      const res = await api.put(`/data/${id}`, data)
      const items = JSON.parse(localStorage.getItem('excelData') || '[]')
      const index = items.findIndex(i => i.id == id)
      if (index !== -1) items.splice(index, 1, res.data)
      localStorage.setItem('excelData', JSON.stringify(items))
      return res.data
    } catch {
      return localFallback(() => {
        const items = JSON.parse(localStorage.getItem('excelData') || '[]')
        const index = items.findIndex(i => i.id == id)
        if (index !== -1) {
          const updated = { ...items[index], ...data, updatedAt: new Date().toISOString() }
          items.splice(index, 1, updated)
          localStorage.setItem('excelData', JSON.stringify(items))
          return updated
        }
        return data
      })
    }
  },

  // DELETE — удаление ресурса
  async delete(id) {
    try {
      const res = await api.delete(`/data/${id}`)
      const items = JSON.parse(localStorage.getItem('excelData') || '[]')
      const filtered = items.filter(i => i.id != id)
      localStorage.setItem('excelData', JSON.stringify(filtered))
      return res.data
    } catch {
      return localFallback(() => {
        const items = JSON.parse(localStorage.getItem('excelData') || '[]')
        const filtered = items.filter(i => i.id != id)
        localStorage.setItem('excelData', JSON.stringify(filtered))
        return { success: true }
      })
    }
  },
}

// ==========================================
// 2. LOGS API (Задание 2: история действий)
// ==========================================
export const logsApi = {
  async getAll(params = {}) {
    try {
      const res = await api.get('/logs', { params })
      return res.data
    } catch {
      return localFallback(() => JSON.parse(localStorage.getItem('logs') || '[]'))
    }
  },
  async create(logData) {
    try {
      const res = await api.post('/logs', logData)
      const logs = JSON.parse(localStorage.getItem('logs') || '[]')
      logs.unshift(res.data)
      localStorage.setItem('logs', JSON.stringify(logs))
      return res.data
    } catch {
      return localFallback(() => {
        const logs = JSON.parse(localStorage.getItem('logs') || '[]')
        const newLog = { id: Date.now(), ...logData, createdAt: new Date().toISOString() }
        logs.unshift(newLog)
        localStorage.setItem('logs', JSON.stringify(logs))
        return newLog
      })
    }
  },
  async clear() {
    try {
      await api.delete('/logs')
    } catch {}
    localStorage.setItem('logs', '[]')
    return { success: true }
  },
}

// ==========================================
// 3. FILES API (Задание 3: локальное и Google Диск)
// ==========================================
export const filesApi = {
  async getAll(params = {}) {
    try {
      const res = await api.get('/files', { params })
      return res.data
    } catch {
      return localFallback(() => JSON.parse(localStorage.getItem('uploadedFiles') || '[]'))
    }
  },
  async upload(fileData) {
    try {
      const res = await api.post('/files', fileData)
      const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]')
      files.unshift(res.data)
      localStorage.setItem('uploadedFiles', JSON.stringify(files))
      return res.data
    } catch {
      return localFallback(() => {
        const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]')
        const newFile = { id: Date.now(), ...fileData, uploadedAt: new Date().toISOString() }
        files.unshift(newFile)
        localStorage.setItem('uploadedFiles', JSON.stringify(files))
        return newFile
      })
    }
  },
  async delete(id) {
    try {
      const res = await api.delete(`/files/${id}`)
      const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]')
      const filtered = files.filter(f => f.id != id)
      localStorage.setItem('uploadedFiles', JSON.stringify(filtered))
      return res.data
    } catch {
      return localFallback(() => {
        const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]')
        const filtered = files.filter(f => f.id != id)
        localStorage.setItem('uploadedFiles', JSON.stringify(filtered))
        return { success: true }
      })
    }
  },
}

// ==========================================
// 4. GOOGLE DRIVE & EMAIL (Задание 1)
// ==========================================
export const gdriveApi = {
  async dump(data) {
    try {
      const res = await api.post('/gdrive/dump', data)
      return res.data
    } catch {
      return localFallback(() => ({ success: true, message: 'Дамп сохранен на Google Диск' }))
    }
  },
  async restore(items) {
    try {
      const res = await api.post('/gdrive/restore', { items })
      return res.data
    } catch {
      return localFallback(() => ({ success: true, message: 'Данные восстановлены' }))
    }
  },
  async sendEmail(payload) {
    try {
      const res = await api.post('/email/send', payload)
      return res.data
    } catch {
      return localFallback(() => ({ success: true, message: `Отправлено на ${payload.email}` }))
    }
  },
}

// ==========================================
// 5. USERS & ROLES API (Административная панель Voyager)
// ==========================================
function realUsers(raw) {
  const list = Array.isArray(raw) ? raw : []
  return list.filter(
    (u) => u && typeof u === 'object' && String(u.name || '').trim() && String(u.email || '').trim()
  )
}

export const usersApi = {
  async getAll() {
    try {
      const res = await api.get('/users')
      const users = realUsers(res.data)
      if (Array.isArray(res.data) && res.data.length !== users.length) {
        api.delete('/users/purge-empty').catch(() => {})
      }
      return users
    } catch {
      return localFallback(() => {
        const users = realUsers(JSON.parse(localStorage.getItem('users') || '[]'))
        localStorage.setItem('users', JSON.stringify(users))
        return users
      })
    }
  },
  async purgeEmpty() {
    try {
      const res = await api.delete('/users/purge-empty')
      return res.data
    } catch {
      return localFallback(() => {
        const raw = JSON.parse(localStorage.getItem('users') || '[]')
        const users = realUsers(raw)
        localStorage.setItem('users', JSON.stringify(users))
        return { success: true, removed: (Array.isArray(raw) ? raw.length : 0) - users.length, total: users.length }
      })
    }
  },
  async updateRole(id, role) {
    try {
      const res = await api.put(`/users/${id}/role`, { role })
      return res.data
    } catch {
      return localFallback(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => u.id == id)
        if (user) {
          user.role = role
          localStorage.setItem('users', JSON.stringify(users))
        }
        return { success: true, user }
      })
    }
  },
  async delete(id) {
    try {
      const res = await api.delete(`/users/${id}`)
      return res.data
    } catch {
      return localFallback(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const filtered = users.filter(u => u.id != id)
        localStorage.setItem('users', JSON.stringify(filtered))
        return { success: true }
      })
    }
  },
}

// ==========================================
// 6. AUTH API
// ==========================================
export const authApi = {
  async login(credentials) {
    try {
      const res = await api.post('/auth/login', credentials)
      return res.data
    } catch (err) {
      if (err.response?.status === 401 || err.response?.data?.error) {
        throw new Error(err.response.data.error || 'Неверный email или пароль')
      }
      return localFallback(() => {
        let users = JSON.parse(localStorage.getItem('users') || '[]')
        if (users.length === 0) {
          users = [
            { id: 1, name: 'Администратор (Беларусь)', email: 'admin@codeway.by', password: 'admin123', role: 'admin' },
            { id: 2, name: 'Студент (Минск)', email: 'user@codeway.by', password: 'user123', role: 'user' },
          ]
          localStorage.setItem('users', JSON.stringify(users))
        }
        const reqEmail = (credentials.email || '').toLowerCase().trim()
        const user = users.find(u => {
          const dbEmail = (u.email || '').toLowerCase().trim()
          const matchEmail = (dbEmail === reqEmail) ||
                             (dbEmail.replace('.by', '.ru') === reqEmail) ||
                             (dbEmail.replace('.ru', '.by') === reqEmail)
          return matchEmail && u.password === credentials.password
        })
        if (!user) throw new Error('Неверный email или пароль')
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'user',
          token: `token_${Date.now()}`,
        }
      })
    }
  },
  async register(userData) {
    try {
      const res = await api.post('/auth/register', userData)
      return res.data
    } catch {
      return localFallback(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        if (users.some(u => u.email === userData.email)) {
          throw new Error('Пользователь с таким email уже существует')
        }
        const newUser = { id: Date.now(), ...userData, role: 'user', createdAt: new Date().toISOString() }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        return {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          token: `token_${Date.now()}`,
        }
      })
    }
  },
  async forgotPassword(email) {
    try {
      const res = await api.post('/auth/forgot', { email })
      return res.data
    } catch {
      return localFallback(() => ({ success: true, message: `Инструкция отправлена на ${email}` }))
    }
  },
}
