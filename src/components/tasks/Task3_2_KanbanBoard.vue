<template>
  <div>
    <h2 class="text-2xl font-bold color: var(--text-h) mb-6">Kanban-доска учебных задач</h2>

    <!-- Kanban Board -->
    <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
      <!-- Column -->
      <div
        v-for="column in columns"
        :key="column.id"
        class="min-w-[320px] snap-start flex-shrink-0 md:flex-shrink bg-gray-100 rounded-2xl p-4 flex flex-col"
      >
        <!-- Column Header -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-2">
            <span
              :class="[
                'w-3 h-3 rounded-full',
                column.dotColor
              ]"
            ></span>
            <h3 class="font-bold text-lg color: var(--text-h)">{{ column.title }}</h3>
          </div>
          <span class="bg-gray-200 color: var(--text) text-sm px-2 py-1 rounded-full font-medium">
            {{ column.tasks.length }}
          </span>
        </div>

        <!-- Cards Container -->
        <div class="flex-1 space-y-3 overflow-y-auto max-h-[500px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div
            v-for="task in column.tasks"
            :key="task.id"
            :class="[
              'bg-transparent rounded-xl p-4 shadow-sm hover:shadow-md group transition-all duration-200 cursor-grab border-l-4',
              task.priorityBorder
            ]"
          >
            <!-- Drag Handle + Priority -->
            <div class="flex justify-between items-start mb-2">
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  task.priorityBadge
                ]"
              >
                {{ task.priorityLabel }}
              </span>
              <span class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 cursor-grab text-lg leading-none select-none" title="Перетащить">
                ⠿
              </span>
            </div>

            <!-- Title -->
            <h4 class="font-semibold color: var(--text-h) line-clamp-2">{{ task.title }}</h4>

            <!-- Description -->
            <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ task.description }}</p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="tag in task.tags"
                :key="tag.label"
                :class="[
                  'text-xs px-2 py-1 rounded-full font-medium',
                  tag.color
                ]"
              >
                {{ tag.label }}
              </span>
            </div>

            <!-- Bottom Row -->
            <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <div class="flex items-center gap-1.5 text-xs text-gray-400">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>{{ task.dueDate }}</span>
              </div>
              <div
                :class="[
                  'w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold',
                  task.assigneeGradient
                ]"
                :title="task.assigneeName"
              >
                {{ task.assigneeInitials }}
              </div>
            </div>
          </div>

          <!-- Add task button -->
          <button class="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-sm hover:border-gray-400 hover:text-gray-500 transition-colors flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Добавить задачу
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task3_2_KanbanBoard',
  data() {
    return {
      columns: [
        {
          id: 'todo',
          title: 'К выполнению',
          dotColor: 'bg-red-500',
          tasks: [
            {
              id: 1,
              title: 'Сверстать лендинг курса',
              description: 'Создать адаптивную главную страницу нового курса по Vue.js с секциями: герой, программа, отзывы, цены.',
              tags: [
                { label: 'Vue.js', color: 'bg-green-100 text-green-700' },
                { label: 'CSS', color: 'bg-blue-100 text-blue-700' }
              ],
              priorityBorder: 'border-red-500',
              priorityBadge: 'bg-red-100 text-red-700',
              priorityLabel: 'Высокий',
              dueDate: '28 окт',
              assigneeInitials: 'АС',
              assigneeName: 'Алексей Смирнов',
              assigneeGradient: 'from-blue-500 to-indigo-600'
            },
            {
              id: 2,
              title: 'Написать API для авторизации',
              description: 'Реализовать REST API с JWT-токенами: регистрация, логин, обновление токена, logout.',
              tags: [
                { label: 'Node.js', color: 'bg-emerald-100 text-emerald-700' },
                { label: 'API', color: 'bg-purple-100 text-purple-700' }
              ],
              priorityBorder: 'border-yellow-500',
              priorityBadge: 'bg-yellow-100 text-yellow-700',
              priorityLabel: 'Средний',
              dueDate: '1 ноя',
              assigneeInitials: 'МК',
              assigneeName: 'Мария Козлова',
              assigneeGradient: 'from-pink-500 to-rose-500'
            }
          ]
        },
        {
          id: 'in-progress',
          title: 'В процессе',
          dotColor: 'bg-yellow-500',
          tasks: [
            {
              id: 3,
              title: 'Дизайн карточки товара',
              description: 'Спроектировать в Figma компонент карточки товара с hover-эффектами и адаптивной сеткой.',
              tags: [
                { label: 'Figma', color: 'bg-orange-100 text-orange-700' },
                { label: 'CSS', color: 'bg-blue-100 text-blue-700' }
              ],
              priorityBorder: 'border-red-500',
              priorityBadge: 'bg-red-100 text-red-700',
              priorityLabel: 'Высокий',
              dueDate: '26 окт',
              assigneeInitials: 'ДП',
              assigneeName: 'Дмитрий Петров',
              assigneeGradient: 'from-teal-500 to-cyan-600'
            },
            {
              id: 4,
              title: 'Настроить CI/CD пайплайн',
              description: 'Сконфигурировать GitHub Actions для автоматического деплоя на staging при мерже в main.',
              tags: [
                { label: 'DevOps', color: 'bg-gray-200 text-gray-700' }
              ],
              priorityBorder: 'border-green-500',
              priorityBadge: 'bg-green-100 text-green-700',
              priorityLabel: 'Низкий',
              dueDate: '3 ноя',
              assigneeInitials: 'ИВ',
              assigneeName: 'Иван Волков',
              assigneeGradient: 'from-orange-400 to-amber-500'
            }
          ]
        },
        {
          id: 'done',
          title: 'Выполнено',
          dotColor: 'bg-green-500',
          tasks: [
            {
              id: 5,
              title: 'Адаптивная навигация',
              description: 'Реализовать навигационное меню с бургер-иконкой для мобильных устройств и плавными анимациями.',
              tags: [
                { label: 'CSS', color: 'bg-blue-100 text-blue-700' },
                { label: 'HTML', color: 'bg-red-100 text-red-700' }
              ],
              priorityBorder: 'border-yellow-500',
              priorityBadge: 'bg-yellow-100 text-yellow-700',
              priorityLabel: 'Средний',
              dueDate: '20 окт',
              assigneeInitials: 'АС',
              assigneeName: 'Алексей Смирнов',
              assigneeGradient: 'from-blue-500 to-indigo-600'
            },
            {
              id: 6,
              title: 'Unit-тесты для форм',
              description: 'Покрыть тестами валидацию форм регистрации и авторизации с использованием Vitest.',
              tags: [
                { label: 'Testing', color: 'bg-yellow-100 text-yellow-700' }
              ],
              priorityBorder: 'border-green-500',
              priorityBadge: 'bg-green-100 text-green-700',
              priorityLabel: 'Низкий',
              dueDate: '18 окт',
              assigneeInitials: 'МК',
              assigneeName: 'Мария Козлова',
              assigneeGradient: 'from-pink-500 to-rose-500'
            }
          ]
        }
      ]
    };
  }
};
</script>
