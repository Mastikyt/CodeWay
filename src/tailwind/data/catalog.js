export const categories = [
  { id: 'all', label: 'Все курсы', count: 18 },
  { id: 'frontend', label: 'Frontend', count: 7 },
  { id: 'backend', label: 'Backend', count: 4 },
  { id: 'design', label: 'Дизайн', count: 3 },
  { id: 'career', label: 'Карьера', count: 2 },
  { id: 'mobile', label: 'Мобильная разработка', count: 2 },
]

export const tags = ['Vue', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Доступность', 'Портфолио', 'Senior']

const base = [
  { id: 1, title: 'Frontend Pro: от вёрстки до оффера', category: 'frontend', level: 'Pro', price: 1290, rating: 4.9, reviews: 412, tag: 'Tailwind', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=720&q=70', seats: 4 },
  { id: 2, title: 'Vue 3: Composition API на практике', category: 'frontend', level: 'Pro', price: 1590, rating: 4.8, reviews: 289, tag: 'Vue', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=720&q=70', seats: 6 },
  { id: 3, title: 'Вёрстка с нуля: HTML, CSS, адаптив', category: 'frontend', level: 'Basic', price: 490, rating: 4.7, reviews: 631, tag: 'Доступность', image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=720&q=70', seats: 12 },
  { id: 4, title: 'React и экосистема 2026', category: 'frontend', level: 'Pro', price: 1490, rating: 4.8, reviews: 198, tag: 'React', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=720&q=70', seats: 3 },
  { id: 5, title: 'TypeScript для production', category: 'frontend', level: 'Pro', price: 990, rating: 4.9, reviews: 144, tag: 'TypeScript', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=720&q=70', seats: 8 },
  { id: 6, title: 'Node.js: REST API с нуля до деплоя', category: 'backend', level: 'Pro', price: 1190, rating: 4.7, reviews: 221, tag: 'Node.js', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=720&q=70', seats: 5 },
  { id: 7, title: 'PostgreSQL и проектирование БД', category: 'backend', level: 'Pro', price: 1090, rating: 4.6, reviews: 98, tag: 'Node.js', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=720&q=70', seats: 9 },
  { id: 8, title: 'Дизайн-система в Figma', category: 'design', level: 'Basic', price: 690, rating: 4.8, reviews: 176, tag: 'Tailwind', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=720&q=70', seats: 10 },
  { id: 9, title: 'UI/UX для разработчиков', category: 'design', level: 'Basic', price: 590, rating: 4.5, reviews: 83, tag: 'Доступность', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=720&q=70', seats: 14 },
  { id: 10, title: 'Карьерный интенсив: резюме и интервью', category: 'career', level: 'Basic', price: 890, rating: 4.9, reviews: 305, tag: 'Портфолио', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=720&q=70', seats: 7 },
  { id: 11, title: 'Senior-трек: архитектура фронтенда', category: 'career', level: 'Expert', price: 2190, rating: 5.0, reviews: 57, tag: 'Senior', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=720&q=70', seats: 2 },
  { id: 12, title: 'Мобильные приложения на Vue (Ionic)', category: 'mobile', level: 'Pro', price: 1390, rating: 4.4, reviews: 64, tag: 'Vue', image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=720&q=70', seats: 6 },
]

export const products = [...base, ...base.map((p) => ({ ...p, id: p.id + 100, title: `${p.title} · поток 2027` }))].slice(0, 18)
