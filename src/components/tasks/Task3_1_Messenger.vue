<template>
  <div class="d-flex rounded-lg overflow-hidden border" style="height: 500px; background: var(--bg-surface); border-color: var(--border);">
    <!-- Chat List -->
    <div class="border-right" style="width: 300px; border-color: var(--border);">
      <div class="p-3 border-bottom" style="border-color: var(--border);">
        <input type="text" class="form-control" placeholder="Поиск..." style="background: var(--bg); color: var(--text);">
      </div>
      <div class="overflow-y-auto">
        <div v-for="i in 5" :key="i" class="p-3 border-bottom" style="border-color: var(--border); color: var(--text);">
          Чат {{ i }}
        </div>
      </div>
    </div>
    <!-- Chat Area -->
    <div class="flex-grow-1 d-flex flex-column">
      <div class="flex-grow-1 p-3 overflow-y-auto">
        <div class="mb-2 p-2 rounded" style="background: var(--bg); color: var(--text); width: fit-content; margin-left: auto;">Мое сообщение</div>
        <div class="mb-2 p-2 rounded" style="background: var(--border); color: var(--text); width: fit-content;">Сообщение собеседника</div>
      </div>
      <div class="p-3 border-top" style="border-color: var(--border);">
        <input type="text" class="form-control" placeholder="Сообщение..." style="background: var(--bg); color: var(--text);">
      </div>
    </div>
  </div>
</template>
<script> export default { name: 'Task3_1_Messenger' } </script>
