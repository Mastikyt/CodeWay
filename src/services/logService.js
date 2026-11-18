// Сервис логирования всех действий (Задание 2)
import api from './api'

const logService = {
  async log(action, entityType, entityId, oldData = null, newData = null) {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const logEntry = {
      id: Date.now(),
      action,
      entityType,
      entityId,
      userId: user?.id || null,
      userName: user?.name || 'Гость',
      oldData: oldData ? JSON.parse(JSON.stringify(oldData)) : null,
      newData: newData ? JSON.parse(JSON.stringify(newData)) : null,
      createdAt: new Date().toISOString(),
    }
    
    try {
      await api.post('/logs', logEntry)
    } catch (e) {
      // Fallback: save to localStorage
      const logs = JSON.parse(localStorage.getItem('logs') || '[]')
      logs.push(logEntry)
      localStorage.setItem('logs', JSON.stringify(logs))
    }
    
    return logEntry
  },
}

export default logService
