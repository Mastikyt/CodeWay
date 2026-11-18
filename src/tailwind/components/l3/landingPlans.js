// Тарифы лендинга 3.3 (тот же набор, что в задании 2.2)
export const plans = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Для самостоятельного старта',
    monthly: 49,
    popular: false,
    cta: 'Начать бесплатно',
    features: [
      { label: 'Доступ к 12 видеоурокам', included: true },
      { label: 'Проверка домашних заданий', included: false },
      { label: 'Чат студентов', included: true },
      { label: 'Сертификат', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Оптимум для смены профессии',
    monthly: 129,
    popular: true,
    cta: 'Выбрать Pro',
    features: [
      { label: 'Все 90 уроков и проекты', included: true },
      { label: 'Проверка домашних заданий', included: true },
      { label: 'Код-ревью наставника', included: true },
      { label: 'Сертификат', included: true },
      { label: 'Помощь с трудоустройством', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Для команды и компании',
    monthly: 399,
    popular: false,
    cta: 'Связаться с нами',
    features: [
      { label: 'Всё из Pro для 10 сотрудников', included: true },
      { label: 'Корпоративные проекты', included: true },
      { label: 'Выделенный менеджер', included: true },
      { label: 'Помощь с трудоустройством', included: true },
    ],
  },
]
