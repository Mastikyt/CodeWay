<!-- Главная страница — IT Academy CodeWay (Беларусь) с модулем загрузки Excel -->
<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <span class="hero-badge">
              <span class="dot"></span> МИНСК • БЕЛАРУСЬ • ОНЛАЙН & ОФЛАЙН
            </span>
            <h1 class="hero-title">IT-навыки в Беларуси,<br>которые работают</h1>
            <p style="color: var(--text-secondary); font-size: 16px; line-height: 1.65; max-width: 580px;">
              Освойте востребованную профессию с нуля в Минске или онлайн из любого города Беларуси.
              Реальные проекты, менторство практикующих senior-разработчиков и понятная траектория до первого оффера в долларах ($).
            </p>
            <div class="d-flex flex-wrap mt-4" style="gap: 16px;">
              <a href="#courses" class="btn btn-primary">Выбрать курс ($) →</a>
<              <a href="#upload" class="btn btn-outline-secondary" style="border-radius: 12px; color: var(--text-white); border-color: var(--border-bright);">
                📊 Импорт групп (.xlsx)
              </a>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="laptop-visual">
              <div class="laptop-window">
                <div class="laptop-dots">
                  <span class="dot-r"></span>
                  <span class="dot-y"></span>
                  <span class="dot-g"></span>
                </div>
                <div class="code-text">
                  <span class="kw">const</span> location = <span class="val">'Минск, Беларусь'</span>;<br>
                  <span class="kw">const</span> future = <span class="fn">buildProject</span>();<br><br>
                  <span class="kw">function</span> career(skills) {<br>
                  &nbsp;&nbsp;return skills + <span class="var">mentorFeedback</span>;<br>
                  }<br><br>
                  developer.<span class="fn">levelUp</span>({ <span class="val">salaryInUSD</span>: true });
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="row mt-5 pt-4" style="border-top: 1px solid var(--border-subtle);">
          <div class="col-6 col-md-3 stat-item">
            <strong>4.9 / 5</strong>
            <small>средняя оценка в Минске</small>
          </div>
          <div class="col-6 col-md-3 stat-item">
            <strong>12 000+</strong>
            <small>выпускников в Беларуси</small>
          </div>
          <div class="col-6 col-md-3 stat-item">
            <strong>86%</strong>
            <small>получают оффер в IT</small>
          </div>
          <div class="col-6 col-md-3 stat-item">
            <strong>24/7</strong>
            <small>поддержка менторов</small>
          </div>
        </div>
      </div>
    </section>

    <AdSlot size="banner" />

    <!-- Модуль загрузки учебных планов и списков групп (Требование 1: Drag-n-Drop Excel) -->
    <section class="py-5" id="upload">
      <div class="container">
        <div class="dark-block p-4 p-lg-5" style="border: 1px solid var(--border-accent);">
          <div class="row align-items-center">
            <div class="col-lg-5 mb-4 mb-lg-0">
              <span class="hero-badge mb-2">
                <span class="dot"></span> ТРЕБОВАНИЕ 1: ИМПОРТ EXCEL
              </span>
              <h2 style="color: var(--text-white); font-weight: 800; font-size: 28px;" class="mt-2">
                Импорт учебных групп и расписания курсов
              </h2>
              <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
                Модуль позволяет загрузить Excel-файл со списком студентов и курсов.
                Поддерживаются только форматы <code>.xlsx</code> и <code>.xls</code>. Любой другой формат вызовет информационное модальное окно с ошибкой.
              </p>

              <!-- Кнопки быстрого тестирования -->
              <div class="mt-4 p-3" style="background: var(--bg-card); border-radius: 14px; border: 1px solid var(--border-subtle);">
                <small class="d-block text-muted mb-2 font-weight-bold">⚡ Быстрая проверка модуля:</small>
                <div class="d-flex flex-wrap" style="gap: 8px;">
                  <button class="btn btn-outline-success btn-sm" @click="testValidExcel">
                    ✓ Проверить Excel (.xlsx)
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="testInvalidFormat">
                    ✗ Проверить ошибку формата (.txt)
                  </button>
                </div>
              </div>
            </div>

            <div class="col-lg-7">
              <!-- Drag & Drop зона -->
              <div
                class="upload-zone"
                :class="{ dragover: isDragging }"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
                @click="$refs.fileInput.click()"
              >
                <div class="icon">📊</div>
                <h4 style="color: var(--text-white); font-weight: 700;">
                  Перетащите файл Excel (.xlsx / .xls)
                </h4>
                <p style="color: var(--text-muted); margin-top: 8px; font-size: 14px;">
                  или <span style="color: var(--accent-cyan); cursor: pointer; font-weight: 600; text-decoration: underline;">выберите файл на компьютере</span>
                </p>
                <small class="badge badge-pill badge-info px-3 py-1">
                  Поддерживаемые форматы: .xlsx, .xls
                </small>
                <input
                  ref="fileInput"
                  type="file"
                  accept=".xlsx,.xls"
                  style="display: none;"
                  @change="handleFileSelect"
                />
              </div>

              <!-- Прогресс обработки -->
              <div v-if="isProcessing" class="mt-3">
                <div class="progress" style="height: 8px; border-radius: 4px; background: var(--bg-card);">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :style="{ width: progress + '%' }"
                       style="background: var(--accent-primary);"></div>
                </div>
                <small class="d-block mt-2 text-center" style="color: var(--accent-cyan);">Парсинг Excel и запись в базу данных...</small>
              </div>

              <!-- Результат загрузки -->
              <div v-if="uploadResult" class="alert alert-success mt-3 mb-0">
                <strong>✓ Успешно импортировано!</strong> Файл: <code>{{ uploadResult.fileName }}</code>. Записей: <strong>{{ uploadResult.rowCount }}</strong>.
                <router-link to="/data" class="alert-link ml-2 font-weight-bold">Открыть таблицу данных →</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Section (Цены в долларах $) -->
    <section class="py-5" id="courses">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-end mb-4">
          <div>
            <h2 style="color: var(--text-white); font-weight: 800;">Программы обучения</h2>
            <p style="color: var(--text-secondary); margin: 0;">
              Курсы для карьеры в IT-компаниях Беларуси и на зарубежном рынке. Все цены указаны в долларах ($).
            </p>
          </div>
          <span class="badge badge-info p-2 mt-2 mt-md-0" style="font-size: 12px;">
            Цены в долларах ($)
          </span>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4" v-for="course in courses" :key="course.title">
            <div class="card h-100 p-4">
              <div class="course-icon-box mb-3">{{ course.icon }}</div>
              <h5 style="color: var(--text-white); font-weight: 700;">{{ course.title }}</h5>
              <p style="color: var(--text-secondary); font-size: 13px;" class="flex-grow-1">{{ course.desc }}</p>
              <div class="d-flex justify-content-between align-items-center mt-3 pt-3" style="border-top: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: var(--accent-badge-text); font-weight: 600;">
                <span>⏱️ {{ course.duration }}</span>
                <span class="text-white font-weight-bold" style="font-size: 15px;">{{ course.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="py-5">
      <div class="container" style="border-top: 1px solid var(--border-subtle); padding-top: 56px;">
        <h2 style="color: var(--text-white); font-weight: 800;">Как проходит обучение</h2>
        <div class="row mt-4">
          <div class="col-lg-3 col-md-6 mb-4" v-for="step in steps" :key="step.num">
            <div class="card p-4 h-100" style="border-radius: 18px;">
              <div class="step-number mb-3">{{ step.num }}</div>
              <h5 style="color: var(--text-white); font-weight: 700;">{{ step.title }}</h5>
              <p style="color: var(--text-secondary); font-size: 13px;">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Advantages -->
    <section class="py-5">
      <div class="container">
        <div class="dark-block">
          <div class="row align-items-center">
            <div class="col-lg-5 mb-4 mb-lg-0">
              <span class="hero-badge">
                <span class="dot"></span> ПОЧЕМУ CODEWAY.BY
              </span>
              <h2 class="mt-3" style="color: var(--text-white); font-weight: 800;">
                Учимся ради карьеры в IT Беларуси.
              </h2>
            </div>
            <div class="col-lg-7">
              <div class="row">
                <div class="col-md-6 mb-4" v-for="feat in features" :key="feat.title">
                  <div class="d-flex" style="gap: 16px;">
                    <div class="step-number" style="background: rgba(99,102,241,0.15); border-color: var(--border-accent); color: #818cf8;">✓</div>
                    <div>
                      <h6 style="color: var(--text-white); font-weight: 700;">{{ feat.title }}</h6>
                      <p style="color: var(--text-secondary); font-size: 13px; margin: 0;">{{ feat.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Review Минск -->
    <section class="py-5" id="reviews">
      <div class="container">
        <h2 style="color: var(--text-white); font-weight: 800;">Отзывы выпускников</h2>
        <div class="card mt-4 p-4">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <p style="font-size: 17px; line-height: 1.65; color: var(--text-primary); font-style: italic;">
                «За 3 месяца собрал портфолио из 4 проектов на Vue и Node.js. Быстрые код-ревью менторов из Минска помогли пройти техническое собеседование и получить первый оффер с зарплатой в долларах ($) уже через 2 недели после выпуска!»
              </p>
            </div>
            <div class="col-lg-4">
              <div style="border-left: 2px solid var(--accent-primary); padding-left: 14px;">
                <strong style="color: var(--text-white); font-size: 15px; display: block; margin-bottom: 2px;">Алексей Смирнов</strong>
                <small style="color: var(--text-secondary);">Frontend-разработчик · г. Минск (выпуск 2026)</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Модальное окно ошибки неверного формата (Требование 1) -->
    <ModalDialog
      modal-id="errorModal"
      title="Ошибка формата файла"
      confirm-text="Понятно"
      :show-footer="true"
      cancel-text="Закрыть"
      @confirm="$refs.errorModal.hide()"
      ref="errorModal"
    >
      <div class="text-center py-3">
        <div style="font-size: 54px;">⚠️</div>
        <h5 class="mt-3 font-weight-bold" style="color: var(--text-white);">Неверный формат файла!</h5>
        <p style="color: var(--text-secondary); font-size: 14px;">
          {{ errorMessage }}
        </p>
        <div class="alert alert-info mt-3" style="text-align: left; font-size: 13px;">
          <strong>📋 Требование системы:</strong>
          <p class="mb-2 mt-1">Компонент принимает для загрузки <strong>только файлы Excel</strong>. Все остальные файлы приводят к выводу этого модального окна.</p>
          <ul class="mb-0 pl-3">
            <li><code>.xlsx</code> — Microsoft Excel (Open XML Spreadsheet)</li>
            <li><code>.xls</code> — Microsoft Excel 97-2004</li>
          </ul>
        </div>
      </div>
    </ModalDialog>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import ModalDialog from '../components/ModalDialog.vue'
import AdSlot from '../components/AdSlot.vue'
import { dataApi, filesApi } from '../services/api'
import logService from '../services/logService'

export default {
  name: 'HomePage',
  components: { ModalDialog, AdSlot },
  data() {
    return {
      isDragging: false,
      isProcessing: false,
      progress: 0,
      uploadResult: null,
      errorMessage: '',
      courses: [
        { icon: '</>', title: 'Frontend-разработка', desc: 'HTML5, modern CSS, JavaScript (ES6+), Vue 3 и React с нуля до реального сервиса.', duration: '12 недель', price: '$129' },
        { icon: 'DB', title: 'Backend-разработка', desc: 'Node.js, Express, REST API, базы данных PostgreSQL и Docker.', duration: '14 недель', price: '$140' },
        { icon: 'UI', title: 'UX/UI дизайн', desc: 'Figma, UI-kit, дизайн-системы, проектирование пользовательских сценариев.', duration: '10 недель', price: '$119' },
        { icon: 'Py', title: 'Python-разработка', desc: 'Основы синтаксиса, алгоритмы, парсинг данных, API и серверная автоматизация.', duration: '8 недель', price: '$99' },
      ],
      steps: [
        { num: '01', title: 'Старт', desc: 'Определяем точку входа, уровень и собираем индивидуальную дорожную карту.' },
        { num: '02', title: 'Практика', desc: 'Выполняем задания на основе реальных тасок из IT-компаний Беларуси.' },
        { num: '03', title: 'Проект', desc: 'Упаковываем готовые модули в боевое портфолио на GitHub.' },
        { num: '04', title: 'Результат', desc: 'Готовим резюме, проходим mock-интервью и получаем оффер в $.' },
      ],
      features: [
        { title: 'Ментор из Минска', desc: 'Детальное code-review каждой строчки и точечная обратная связь.' },
        { title: 'Реальные кейсы', desc: 'Практика на приближенных к коммерческой разработке проектах.' },
        { title: 'Свежая программа', desc: 'Актуализируем стек под требования рынка каждые 2 месяца.' },
        { title: 'Оплата в долларах ($)', desc: 'Фиксированная прозрачная стоимость курса.' },
      ],
    }
  },
  methods: {
    handleDrop(e) {
      this.isDragging = false
      const files = e.dataTransfer.files
      if (files.length > 0) {
        this.processFile(files[0])
      }
    },
    handleFileSelect(e) {
      const files = e.target.files
      if (files.length > 0) {
        this.processFile(files[0])
      }
      e.target.value = ''
    },
    // Проверка загрузки невалидного файла (демонстрация модального окна ошибки)
    testInvalidFormat() {
      const blob = new Blob(['Тестовый текстовый документ'], { type: 'text/plain' })
      const fakeFile = new File([blob], 'document.txt', { type: 'text/plain' })
      this.processFile(fakeFile)
    },
    // Проверка загрузки корректного файла Excel
    async testValidExcel() {
      const testData = [
        { 'Имя': 'Алексей', 'Фамилия': 'Смирнов', 'Курс': 'Frontend-разработка', 'Email': 'smirnov@codeway.by', 'Телефон': '+375 (29) 111-22-33', 'Город': 'Минск', 'Статус': 'активный', 'Стоимость': '$129' },
        { 'Имя': 'Мария', 'Фамилия': 'Иванова', 'Курс': 'UX/UI дизайн', 'Email': 'ivanova@codeway.by', 'Телефон': '+375 (44) 222-33-44', 'Город': 'Гомель', 'Статус': 'активный', 'Стоимость': '$119' },
        { 'Имя': 'Дмитрий', 'Фамилия': 'Кузнецов', 'Курс': 'Backend-разработка', 'Email': 'kuznetsov@codeway.by', 'Телефон': '+375 (33) 333-44-55', 'Город': 'Гродно', 'Статус': 'завершил', 'Стоимость': '$140' },
        { 'Имя': 'Елена', 'Фамилия': 'Попова', 'Курс': 'Python-разработка', 'Email': 'popova@codeway.by', 'Телефон': '+375 (25) 444-55-66', 'Город': 'Брест', 'Статус': 'в процессе', 'Стоимость': '$99' },
      ]
      const ws = XLSX.utils.json_to_sheet(testData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Студенты_Беларусь')
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const file = new File([blob], 'codeway_students_belarus.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      await this.processFile(file)
    },
    async processFile(file) {
      const validExtensions = ['.xlsx', '.xls']
      const fileName = file.name.toLowerCase()
      const ext = fileName.substring(fileName.lastIndexOf('.'))

      // Проверка расширения файла (Требование 1: Все файлы не Excel вызывают модальное окно с ошибкой)
      if (!validExtensions.includes(ext)) {
        this.errorMessage = `Файл "${file.name}" имеет недопустимый формат (${ext || 'без расширения'}). Пожалуйста, выберите файл Microsoft Excel (.xlsx или .xls).`
        this.$refs.errorModal.show()
        return
      }

      this.isProcessing = true
      this.progress = 15
      this.uploadResult = null

      try {
        const data = await this.readFileAsArrayBuffer(file)
        this.progress = 40

        // Парсинг Excel
        const workbook = XLSX.read(data, { type: 'array' })
        this.progress = 65

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        this.progress = 85

        // Асинхронное сохранение записей через API
        for (const row of jsonData) {
          await dataApi.create({
            ...row,
            source: file.name,
            createdAt: new Date().toISOString(),
          })
        }

        // Асинхронное сохранение файла в локальное хранилище
        const base64 = btoa(String.fromCharCode(...new Uint8Array(data)))
        await filesApi.upload({
          name: file.name,
          size: file.size,
          type: ext,
          storage: 'local',
          rowCount: jsonData.length,
          data: base64,
        })

        this.progress = 100

        await logService.log('UPLOAD', 'file', file.name, null, {
          fileName: file.name,
          rowCount: jsonData.length,
          sheetName,
        })

        this.uploadResult = {
          fileName: file.name,
          rowCount: jsonData.length,
        }
      } catch (error) {
        this.errorMessage = `Ошибка при чтении файла Excel: ${error.message}`
        this.$refs.errorModal.show()
      } finally {
        this.isProcessing = false
      }
    },
    readFileAsArrayBuffer(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.onerror = (e) => reject(e)
        reader.readAsArrayBuffer(file)
      })
    },
  },
}
</script>
