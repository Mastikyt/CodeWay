<template>
  <div class="row">
    <div v-for="plan in ['Basic', 'Pro', 'Enterprise']" :key="plan" class="col-md-4 mb-3">
      <div class="card h-100" style="background: var(--bg); border: 1px solid var(--border);">
        <div class="card-body">
            <h3 class="h5" style="color: var(--text-h);">{{ plan }}</h3>
            <button class="btn btn-outline-primary w-100 mt-3">Выбрать</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script> export default { name: 'Task2_2_PricingTable' } </script>
