<template>
  <div class="card h-100" style="background: var(--bg); border: 1px solid var(--border);">
    <div class="card-body d-flex flex-column align-items-center text-center">
        <img src="https://ui-avatars.com/api/?name=Алексей+Смирнов&size=80&background=aa3bff&color=fff" alt="Алексей" class="rounded-circle mb-3" style="width: 80px; height: 80px;" />
        <h5 class="card-title" style="color: var(--text-h);">Алексей Смирнов</h5>
        <p class="card-text small" style="color: var(--text);">Frontend Developer</p>
        <div class="d-flex gap-2 mt-auto">
            <button class="btn btn-primary btn-sm">Подписаться</button>
            <button class="btn btn-outline-secondary btn-sm">Сообщение</button>
        </div>
    </div>
  </div>
</template>

<script>
export default { name: 'Task1_1_ProfileCard' };
</script>
