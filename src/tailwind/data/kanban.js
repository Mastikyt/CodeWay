export const columns = [
  {
    id: 'todo',
    title: 'To Do',
    dot: 'bg-slate-400',
    tasks: [
      {
        id: 1,
        title: 'Свёрстать карточку профиля с аватаром и bio',
        tags: ['Уровень 1', 'flex'],
        priority: 'low',
        assignee: 'https://ui-avatars.com/api/?name=AK&background=6366f1&color=fff&size=48',
        comments: 3,
        due: '29 окт',
      },
      {
        id: 2,
        title: 'Реализовать бургер-меню на скрытом checkbox',
        tags: ['Навигация', 'peer'],
        priority: 'medium',
        assignee: 'https://ui-avatars.com/api/?name=DO&background=0ea5e9&color=fff&size=48',
        comments: 1,
        due: '30 окт',
      },
      {
        id: 3,
        title: 'Сетка товаров: 1 → 2 → 4 колонки с hover:scale',
        tags: ['Grid', 'адаптив'],
        priority: 'low',
        assignee: 'https://ui-avatars.com/api/?name=IK&background=8b5cf6&color=fff&size=48',
        comments: 0,
        due: '31 окт',
      },
    ],
  },
  {
    id: 'progress',
    title: 'In Progress',
    dot: 'bg-amber-400',
    tasks: [
      {
        id: 4,
        title: 'Kanban-доска с горизонтальным snap-скроллом',
        tags: ['snap-x', 'min-w-[300px]'],
        priority: 'high',
        assignee: 'https://ui-avatars.com/api/?name=MS&background=ec4899&color=fff&size=48',
        comments: 7,
        due: 'сегодня',
      },
      {
        id: 5,
        title: 'Дашборд аналитики: 4 stat-карточки и график',
        tags: ['Уровень 4', 'grid-cols-12'],
        priority: 'high',
        assignee: 'https://ui-avatars.com/api/?name=OD&background=f59e0b&color=fff&size=48',
        comments: 2,
        due: '2 ноя',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    dot: 'bg-emerald-500',
    tasks: [
      {
        id: 6,
        title: 'Hero с градиентом, blur-кругами и анимацией появления',
        tags: ['Hero', 'blur-3xl'],
        priority: 'medium',
        assignee: 'https://ui-avatars.com/api/?name=AS&background=10b981&color=fff&size=48',
        comments: 4,
        due: '26 окт',
      },
      {
        id: 7,
        title: 'Pricing-таблица с выделенным тарифом Pro',
        tags: ['Pricing', 'ring-2'],
        priority: 'low',
        assignee: 'https://ui-avatars.com/api/?name=AK&background=6366f1&color=fff&size=48',
        comments: 5,
        due: '25 окт',
      },
      {
        id: 8,
        title: 'Форма регистрации с peer-invalid и loading',
        tags: ['Формы', 'peer'],
        priority: 'high',
        assignee: 'https://ui-avatars.com/api/?name=DO&background=0ea5e9&color=fff&size=48',
        comments: 9,
        due: '24 окт',
      },
    ],
  },
]

export const priorityStyles = {
  high: { label: 'Высокий', badge: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400', border: 'border-l-rose-500', dot: 'bg-rose-500' },
  medium: { label: 'Средний', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400', border: 'border-l-amber-400', dot: 'bg-amber-400' },
  low: { label: 'Низкий', badge: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300', border: 'border-l-slate-300 dark:border-l-slate-600', dot: 'bg-slate-400' },
}

export const tagStyles = {
  'Уровень 1': 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
  'Уровень 4': 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300',
  Навигация: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  Grid: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Hero: 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  Pricing: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  Формы: 'bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300',
}
