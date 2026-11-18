<template>
  <div class="row">
    <!-- Sidebar -->
    <div class="col-md-3">
        <div class="p-3 rounded" style="background: var(--bg-surface); color: var(--text);">
            <h5 class="mb-4">Analytics</h5>
            <ul class="list-unstyled">
                <li class="mb-2">📊 Обзор</li>
                <li class="mb-2">👥 Студенты</li>
            </ul>
        </div>
    </div>
    <!-- Main -->
    <div class="col-md-9">
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="p-3 rounded" style="background: var(--bg-surface); color: var(--text);">Студенты: 1247</div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="p-3 rounded" style="background: var(--bg-surface); color: var(--text);">Выручка: $18420</div>
            </div>
        </div>
    </div>
  </div>
</template>
<script> export default { name: 'Task4_1_AnalyticsDashboard' } </script>
