import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001
const DB_FILE = path.join(__dirname, 'db.json')

// Увеличенный лимит для base64 файлов Excel
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Expose-Headers', 'X-Total-Count, Content-Range')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// Хелперы работы с БД
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = { data: [], logs: [], files: [], users: [] }
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8')
      return initial
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(content || '{}')
  } catch (err) {
    console.error('Ошибка чтения db.json:', err)
    return { data: [], logs: [], files: [], users: [] }
  }
}

function writeDb(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8')
  } catch (err) {
    console.error('Ошибка записи db.json:', err)
  }
}

// ==========================================
// АУТЕНТИФИКАЦИЯ И ПРАВА ДОСТУПА
// ==========================================
// Модель прав:
//   admin   — видит и меняет всё
//   user    — видит и меняет ТОЛЬКО свои записи (ownerId === свой id)
// Токен — не настоящий JWT (учебный проект), но теперь он проверяется:
// формат jwt_token_<userId>_<timestamp>, userId должен совпадать с записью в БД.

// Отозванные токены (хранятся в памяти сервера до перезапуска)
const revokedTokens = new Set()

function parseToken(req) {
  const header = req.headers.authorization || ''
  const match = header.match(/^Bearer\s+jwt_token_(\d+)_(\d+)$/)
  if (!match) return null
  const raw = header.replace(/^Bearer\s+/, '').trim()
  if (revokedTokens.has(raw)) return null
  return { id: Number(match[1]) }
}

// Загружает пользователя по токену. Возвращает null, если токена нет или он невалиден.
function currentUser(req) {
  const token = parseToken(req)
  if (!token) return null
  const db = readDb()
  const user = (db.users || []).find(u => u.id === token.id)
  if (!user) return null
  return { id: user.id, name: user.name, email: user.email, role: user.role || 'user' }
}

function isAdmin(req) {
  const user = currentUser(req)
  return !!user && user.role === 'admin'
}

// Владелец ли это записи (или админ)
function canTouch(req, item) {
  const user = currentUser(req)
  if (!user) return false
  if (user.role === 'admin') return true
  return item.ownerId != null && Number(item.ownerId) === Number(user.id)
}

// Фильтр «вижу только своё», если не админ. Записи без ownerId видит только админ.
function visibleTo(req, items) {
  const user = currentUser(req)
  if (!user) return []
  if (user.role === 'admin') return items
  return items.filter(item => item.ownerId != null && Number(item.ownerId) === Number(user.id))
}

// Middleware: требуем авторизованного пользователя
function requireAuth(req, res, next) {
  const user = currentUser(req)
  if (!user) {
    return res.status(401).json({ error: 'Требуется авторизация' })
  }
  req.authUser = user
  next()
}

// Middleware: требуем админа
function requireAdmin(req, res, next) {
  const user = currentUser(req)
  if (!user) return res.status(401).json({ error: 'Требуется авторизация' })
  if (user.role !== 'admin') return res.status(403).json({ error: 'Недостаточно прав' })
  req.authUser = user
  next()
}

// Миграция старых записей без ownerId: привязываем к admin-аккаунту (или к первому админу),
// чтобы данные не осиротели и не стали невидимыми после включения проверок.
function migrateOwnership() {
  const db = readDb()
  const users = db.users || []
  if (users.length === 0) return

  const owner = users.find(u => u.role === 'admin') || users[0]
  let changed = 0

  const assign = (list) => (list || []).forEach(item => {
    if (item && item.ownerId == null) {
      item.ownerId = owner.id
      changed++
    }
  })

  assign(db.data)
  assign(db.files)
  if (changed > 0) {
    writeDb(db)
    console.log(`🔧 Миграция ownerId: ${changed} записей привязано к пользователю ${owner.email || owner.id}`)
  }
}

migrateOwnership()

// Регистрация маршрутов для версий API (v1 и v2)
function createApiRouter(version) {
  const router = express.Router()

  // Информация о версии
  router.get('/info', (req, res) => {
    res.json({
      version,
      name: 'CodeWay API',
      status: 'active',
      endpoints: [
        '/data',
        '/logs',
        '/files',
        '/users',
        '/auth',
        '/gdrive',
        '/email'
      ]
    })
  })

  // ==========================================
  // ТАБЛИЦА DATA (CRUD + фильтрация + пагинация)
  // ==========================================

  // GET /api/v*/data
  // Фильтрация:
  // - по дате добавления: ?created_at=2026-10-14
  // - за период: ?date_from=2026-10-01&date_to=2026-10-14
  // - по страницам: ?_page=1&_limit=10
  // - поиск: ?q=текст
  // - сортировка: ?_sort=id&_order=asc|desc
  router.get('/data', requireAuth, (req, res) => {
    const db = readDb()
    // Пользователь видит только свои записи, админ — все
    let items = visibleTo(req, Array.isArray(db.data) ? [...db.data] : [])

    const {
      created_at,
      date_from,
      date_to,
      _page,
      _limit,
      _sort,
      _order,
      q
    } = req.query

    // Поиск
    if (q) {
      const query = String(q).toLowerCase()
      items = items.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(query)
        )
      )
    }

    // Фильтрация по конкретной дате добавления
    if (created_at) {
      items = items.filter(item => {
        if (!item.createdAt) return false
        return item.createdAt.startsWith(created_at)
      })
    }

    // Фильтрация за период
    if (date_from) {
      items = items.filter(item => {
        if (!item.createdAt) return false
        return item.createdAt.slice(0, 10) >= date_from
      })
    }
    if (date_to) {
      items = items.filter(item => {
        if (!item.createdAt) return false
        return item.createdAt.slice(0, 10) <= date_to
      })
    }

    // Сортировка
    if (_sort) {
      const order = _order === 'desc' ? -1 : 1
      items.sort((a, b) => {
        const valA = a[_sort] || ''
        const valB = b[_sort] || ''
        return String(valA).localeCompare(String(valB), 'ru') * order
      })
    }

    const totalCount = items.length
    res.setHeader('X-Total-Count', totalCount)

    // Постраничная загрузка
    if (_page && _limit) {
      const page = parseInt(_page, 10) || 1
      const limit = parseInt(_limit, 10) || 10
      const startIndex = (page - 1) * limit
      const paginated = items.slice(startIndex, startIndex + limit)
      return res.json({
        data: paginated,
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      })
    }

    res.json(items)
  })

  // GET /api/v*/data/:id — получение одной записи
  router.get('/data/:id', requireAuth, (req, res) => {
    const db = readDb()
    const id = Number(req.params.id) || req.params.id
    const item = (db.data || []).find(d => d.id == id)
    if (!item) {
      return res.status(404).json({ error: 'Запись не найдена' })
    }
    if (!canTouch(req, item)) {
      return res.status(403).json({ error: 'Это чужая запись' })
    }
    res.json(item)
  })

  // POST /api/v*/data — создание ресурса
  router.post('/data', requireAuth, (req, res) => {
    const db = readDb()
    db.data = db.data || []

    const newItem = {
      id: Date.now(),
      ...req.body,
      // Владелец всегда берётся из токена, подменить через тело запроса нельзя
      ownerId: req.authUser.id,
      ownerName: req.authUser.name,
      createdAt: req.body.createdAt || new Date().toISOString()
    }

    db.data.push(newItem)
    writeDb(db)
    res.status(201).json(newItem)
  })

  // PUT /api/v*/data/:id — обновление ресурса
  router.put('/data/:id', requireAuth, (req, res) => {
    const db = readDb()
    db.data = db.data || []
    const id = req.params.id
    const index = db.data.findIndex(d => d.id == id)

    if (index === -1) {
      return res.status(404).json({ error: 'Запись не найдена для обновления' })
    }

    if (!canTouch(req, db.data[index])) {
      return res.status(403).json({ error: 'Можно изменять только свои записи' })
    }

    const updatedItem = {
      ...db.data[index],
      ...req.body,
      id: db.data[index].id,
      ownerId: db.data[index].ownerId,
      updatedAt: new Date().toISOString()
    }

    db.data[index] = updatedItem
    writeDb(db)
    res.json(updatedItem)
  })

  // DELETE /api/v*/data/:id — удаление ресурса
  router.delete('/data/:id', requireAuth, (req, res) => {
    const db = readDb()
    db.data = db.data || []
    const id = req.params.id
    const index = db.data.findIndex(d => d.id == id)

    if (index === -1) {
      return res.status(404).json({ error: 'Запись не найдена' })
    }

    if (!canTouch(req, db.data[index])) {
      return res.status(403).json({ error: 'Можно удалять только свои записи' })
    }

    const [deletedItem] = db.data.splice(index, 1)
    writeDb(db)
    res.json({ success: true, message: 'Запись успешно удалена', deletedItem })
  })

  // ==========================================
  // ТАБЛИЦА LOG (Задание 2: история действий)
  // ==========================================

  // GET /api/v*/logs — фильтрация по типу, дате, действию
  router.get('/logs', requireAuth, (req, res) => {
    const db = readDb()
    // Пользователь видит только свои действия, админ — журнал целиком
    let logs = visibleTo(req, Array.isArray(db.logs) ? [...db.logs] : [])

    const { action, entityType, date_from, date_to } = req.query
    if (action) logs = logs.filter(l => l.action === action)
    if (entityType) logs = logs.filter(l => l.entityType === entityType)
    if (date_from) logs = logs.filter(l => l.createdAt && l.createdAt.slice(0, 10) >= date_from)
    if (date_to) logs = logs.filter(l => l.createdAt && l.createdAt.slice(0, 10) <= date_to)

    // Новые первыми
    logs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    res.json(logs)
  })

  // POST /api/v*/logs — запись в лог
  router.post('/logs', requireAuth, (req, res) => {
    const db = readDb()
    db.logs = db.logs || []

    const newLog = {
      id: Date.now(),
      ...req.body,
      // Автор и владелец лога — из токена, клиент их не назначает
      userId: req.authUser.id,
      userName: req.authUser.name,
      ownerId: req.authUser.id,
      createdAt: req.body.createdAt || new Date().toISOString()
    }

    db.logs.push(newLog)
    writeDb(db)
    res.status(201).json(newLog)
  })

  // DELETE /api/v*/logs — очистка журнала (только админ)
  router.delete('/logs', requireAdmin, (req, res) => {
    const db = readDb()
    db.logs = []
    writeDb(db)
    res.json({ success: true, message: 'Логи очищены' })
  })

  // ==========================================
  // УПРАВЛЕНИЕ ФАЙЛАМИ (Задание 3: локальное и Google Drive)
  // ==========================================

  // GET /api/v*/files — список файлов
  router.get('/files', requireAuth, (req, res) => {
    const db = readDb()
    const storageType = req.query.storage
    // Пользователь видит только свои файлы, админ — все
    let files = visibleTo(req, db.files || [])
    if (storageType) {
      files = files.filter(f => f.storage === storageType)
    }
    res.json(files)
  })

  // POST /api/v*/files — сохранение файла в локальное или облачное хранилище
  router.post('/files', requireAuth, (req, res) => {
    const db = readDb()
    db.files = db.files || []

    const file = {
      id: Date.now(),
      name: req.body.name,
      size: req.body.size,
      type: req.body.type,
      rowCount: req.body.rowCount || 0,
      storage: req.body.storage || 'local', // 'local' или 'gdrive'
      data: req.body.data || '',
      ownerId: req.authUser.id,
      ownerName: req.authUser.name,
      uploadedAt: new Date().toISOString()
    }

    db.files.push(file)
    writeDb(db)
    res.status(201).json(file)
  })

  // DELETE /api/v*/files/:id — удаление файла
  router.delete('/files/:id', requireAuth, (req, res) => {
    const db = readDb()
    db.files = db.files || []
    const id = req.params.id
    const index = db.files.findIndex(f => f.id == id)

    if (index === -1) {
      return res.status(404).json({ error: 'Файл не найден' })
    }

    if (!canTouch(req, db.files[index])) {
      return res.status(403).json({ error: 'Можно удалять только свои файлы' })
    }

    const [deletedFile] = db.files.splice(index, 1)
    writeDb(db)
    res.json({ success: true, message: `Файл ${deletedFile.name} удален`, file: deletedFile })
  })

  // ==========================================
  // ЗАДАНИЕ 1: Google Диск и отправка на почту
  // ==========================================

  // POST /api/v*/gdrive/dump — выгрузка дампа на Google Диск
  router.post('/gdrive/dump', requireAuth, (req, res) => {
    const db = readDb()
    db.files = db.files || []

    // В дамп попадают только записи, которые пользователь имеет право видеть
    const ownRecords = visibleTo(req, db.data || [])

    const dumpFile = {
      id: Date.now(),
      name: req.body.name || `dump_${new Date().toISOString().slice(0, 10)}.xlsx`,
      size: req.body.size || 1024,
      type: '.xlsx',
      storage: 'gdrive',
      rowCount: ownRecords.length,
      data: req.body.data || '',
      ownerId: req.authUser.id,
      ownerName: req.authUser.name,
      uploadedAt: new Date().toISOString()
    }

    db.files.push(dumpFile)
    writeDb(db)
    res.json({ success: true, message: 'Дамп успешно загружен на Google Диск', dumpFile })
  })

  // POST /api/v*/gdrive/restore — считывание обратно в БД с обновлением дубликатов
  // Доступно только админу: восстановление перезаписывает записи других пользователей.
  router.post('/gdrive/restore', requireAdmin, (req, res) => {
    const db = readDb()
    db.data = db.data || []
    const incomingItems = req.body.items || []

    let updatedCount = 0
    let insertedCount = 0

    incomingItems.forEach(item => {
      // Ищем дубликат по совпадению ключевых полей (Email или Имя+Фамилия)
      const existingIndex = db.data.findIndex(d => {
        if (item.Email && d.Email && item.Email.toLowerCase() === d.Email.toLowerCase()) return true
        if (item.id && d.id == item.id) return true
        return false
      })

      if (existingIndex !== -1) {
        // При дублировании данных — обновить
        db.data[existingIndex] = {
          ...db.data[existingIndex],
          ...item,
          updatedAt: new Date().toISOString()
        }
        updatedCount++
      } else {
        // Добавление новой записи
        db.data.push({
          id: Date.now() + Math.floor(Math.random() * 1000),
          ...item,
          ownerId: req.authUser.id,
          ownerName: req.authUser.name,
          createdAt: new Date().toISOString(),
          source: 'Google Drive Restore'
        })
        insertedCount++
      }
    })

    writeDb(db)
    res.json({
      success: true,
      message: 'Данные с Google Диска успешно восстановлены в БД',
      updatedCount,
      insertedCount,
      totalInDb: db.data.length
    })
  })

  // POST /api/v*/email/send — отправка дампа на почту
  router.post('/email/send', requireAuth, (req, res) => {
    const { email, fileName, rowCount } = req.body
    if (!email) {
      return res.status(400).json({ error: 'Email обязателен' })
    }
    res.json({
      success: true,
      message: `Дамп "${fileName || 'экспорт'}" (${rowCount || 0} записей) успешно отправлен на ${email}`
    })
  })

  // ==========================================
  // АВТОРИЗАЦИЯ И ПОЛЬЗОВАТЕЛИ (Voyager Admin)
  // ==========================================

  // POST /api/v*/auth/login
  router.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    const db = readDb()
    const reqEmail = (email || '').toLowerCase().trim()
    const user = (db.users || []).find(u => {
      const dbEmail = (u.email || '').toLowerCase().trim()
      const matchEmail = (dbEmail === reqEmail) ||
                         (dbEmail.replace('.by', '.ru') === reqEmail) ||
                         (dbEmail.replace('.ru', '.by') === reqEmail)
      return matchEmail && u.password === password
    })

    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      token: `jwt_token_${user.id}_${Date.now()}`
    })
  })

  // POST /api/v*/auth/register
  router.post('/auth/register', (req, res) => {
    const { name, email, password } = req.body
    const db = readDb()
    db.users = db.users || []

    if (db.users.some(u => u.email === email)) {
      return res.status(400).json({ error: 'Пользователь с таким email уже зарегистрирован' })
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString()
    }

    db.users.push(newUser)
    writeDb(db)

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: `jwt_token_${newUser.id}_${Date.now()}`
    })
  })

  // POST /api/v*/auth/logout — отзыв токена
  router.post('/auth/logout', (req, res) => {
    const header = req.headers.authorization || ''
    const raw = header.replace(/^Bearer\s+/, '').trim()
    if (raw) revokedTokens.add(raw)
    if (req.body?.token) revokedTokens.add(req.body.token)
    res.json({ success: true, message: 'Сессия завершена' })
  })

  // POST /api/v*/auth/forgot
  router.post('/auth/forgot', (req, res) => {
    const { email } = req.body
    const db = readDb()
    const user = (db.users || []).find(u => u.email === email)
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' })
    }
    res.json({ success: true, message: `Инструкция по сбросу пароля отправлена на ${email}` })
  })

  const isRealUser = (u) => {
    if (!u || typeof u !== 'object') return false
    return String(u.name || '').trim().length > 0 && String(u.email || '').trim().length > 0
  }

  // GET /api/v*/users — только реальные учётные записи, без пустых объектов (только админ)
  router.get('/users', requireAdmin, (req, res) => {
    const db = readDb()
    const safeUsers = (db.users || [])
      .filter(isRealUser)
      .map(({ password, ...u }) => u)
    res.json(safeUsers)
  })

  // DELETE /api/v*/users/purge-empty — вычистить пустые записи (до /users/:id) (только админ)
  router.delete('/users/purge-empty', requireAdmin, (req, res) => {
    const db = readDb()
    const before = (db.users || []).length
    db.users = (db.users || []).filter(isRealUser)
    writeDb(db)
    res.json({
      success: true,
      removed: before - db.users.length,
      total: db.users.length,
    })
  })

  // PUT /api/v*/users/:id/role — установка роли из админки (только админ)
  router.put('/users/:id/role', requireAdmin, (req, res) => {
    const db = readDb()
    db.users = db.users || []
    const user = db.users.find(u => u.id == req.params.id)

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' })
    }

    // Нельзя менять собственную роль — иначе админ может случайно снять с себя права
    if (Number(user.id) === Number(req.authUser.id)) {
      return res.status(400).json({ error: 'Нельзя изменить собственную роль' })
    }

    const { role } = req.body
    const allowedRoles = ['admin', 'moderator', 'editor', 'user']
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: `Недопустимая роль. Доступны: ${allowedRoles.join(', ')}` })
    }

    user.role = role
    user.updatedAt = new Date().toISOString()
    writeDb(db)

    const { password, ...safeUser } = user
    res.json({ success: true, message: `Роль пользователя ${user.name} обновлена на ${role}`, user: safeUser })
  })

  // DELETE /api/v*/users/:id (только админ)
  router.delete('/users/:id', requireAdmin, (req, res) => {
    const db = readDb()
    db.users = db.users || []
    const index = db.users.findIndex(u => u.id == req.params.id)

    if (index === -1) {
      return res.status(404).json({ error: 'Пользователь не найден' })
    }

    // Нельзя удалить самого себя и последнего админа — иначе проект останется без управления
    const target = db.users[index]
    if (Number(target.id) === Number(req.authUser.id)) {
      return res.status(400).json({ error: 'Нельзя удалить собственную учётную запись' })
    }
    if ((target.role || 'user') === 'admin' && db.users.filter(u => (u.role || 'user') === 'admin').length <= 1) {
      return res.status(400).json({ error: 'Нельзя удалить последнего администратора' })
    }

    const [deleted] = db.users.splice(index, 1)
    writeDb(db)
    res.json({ success: true, message: `Пользователь ${deleted.name} удален` })
  })

  return router
}

// Подключаем версии API (версирование v1 и v2)
app.use('/api/v1', createApiRouter('v1'))
app.use('/api/v2', createApiRouter('v2'))

// Локальный dev-сервер: раздаём собранный фронтенд (npm run build) и SPA-fallback.
// /api/* при этом обслуживают маршруты выше.
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get(/^\/(?!api\/).*/, (req, res, next) => {
    if (req.method !== 'GET') return next()
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

const server = app.listen(PORT, () => {
  console.log(`===============================================`)
  console.log(`🚀 CodeWay API Сервер запущен на http://localhost:${PORT}`)
  console.log(`📌 Версии API:`)
  console.log(`   - v1: http://localhost:${PORT}/api/v1/info`)
  console.log(`   - v2: http://localhost:${PORT}/api/v2/info`)
  console.log(`📌 Эндпоинты данных:`)
  console.log(`   - GET/POST/PUT/DELETE http://localhost:${PORT}/api/v1/data`)
  console.log(`   - GET/POST/DELETE    http://localhost:${PORT}/api/v1/logs`)
  console.log(`   - GET/POST/DELETE    http://localhost:${PORT}/api/v1/files`)
  console.log(`   - GET/PUT            http://localhost:${PORT}/api/v1/users`)
  console.log(`===============================================`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n⚠️  Порт ${PORT} уже занят другим процессом!`)
    console.error(`Чтобы освободить порт, выполните в PowerShell:`)
    console.error(`Get-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess | Stop-Process -Force\n`)
  } else {
    console.error('Ошибка запуска сервера:', err)
  }
})
