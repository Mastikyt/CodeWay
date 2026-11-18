export const transactions = [
  { id: 'TX-10428', date: '2026-10-28', customer: 'Игорь Мельник', email: 'igor.melnik@example.com', course: 'Frontend Pro', amount: 1290, status: 'paid' },
  { id: 'TX-10427', date: '2026-10-28', customer: 'Екатерина Волкова', email: 'e.volkova@example.com', course: 'Vue-разработчик', amount: 1590, status: 'paid' },
  { id: 'TX-10426', date: '2026-10-27', customer: 'Павел Гринь', email: 'pavel.grin@example.com', course: 'Вёрстка с нуля', amount: 490, status: 'pending' },
  { id: 'TX-10425', date: '2026-10-27', customer: 'Наталья Романова', email: 'n.romanova@example.com', course: 'Frontend Pro', amount: 1290, status: 'paid' },
  { id: 'TX-10424', date: '2026-10-26', customer: 'Дмитрий Орлов', email: 'd.orlov@example.com', course: 'JS для начинающих', amount: 690, status: 'refunded' },
  { id: 'TX-10423', date: '2026-10-26', customer: 'Мария Соколова', email: 'm.sokolova@example.com', course: 'Vue-разработчик', amount: 1590, status: 'paid' },
  { id: 'TX-10422', date: '2026-10-25', customer: 'Илья Кузнецов', email: 'i.kuznetsov@example.com', course: 'Вёрстка с нуля', amount: 490, status: 'paid' },
  { id: 'TX-10421', date: '2026-10-25', customer: 'Ольга Демидова', email: 'o.demidova@example.com', course: 'Карьерный интенсив', amount: 890, status: 'failed' },
  { id: 'TX-10420', date: '2026-10-24', customer: 'Алексей Смирнов', email: 'a.smirnov@example.com', course: 'Frontend Pro', amount: 1290, status: 'paid' },
  { id: 'TX-10419', date: '2026-10-24', customer: 'Анна Ковалёва', email: 'a.kovaleva@example.com', course: 'JS для начинающих', amount: 690, status: 'pending' },
]

export const statusStyles = {
  paid: { label: 'Оплачено', style: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30' },
  pending: { label: 'Ожидает', style: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30' },
  refunded: { label: 'Возврат', style: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/30' },
  failed: { label: 'Ошибка', style: 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-500/30' },
}
