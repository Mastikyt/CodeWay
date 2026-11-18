<template>
  <div class="row">
    <div v-for="i in 6" :key="i" class="col-md-4 mb-4">
      <div class="card h-100" style="background: var(--bg); border: 1px solid var(--border);">
        <div class="card-img-top" style="height: 150px; background: var(--border);"></div>
        <div class="card-body">
            <h5 class="card-title" style="color: var(--text-h);">Курс {{ i }}</h5>
            <p class="card-text" style="color: var(--text);">$99</p>
            <button class="btn btn-primary btn-sm w-100">В корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'Task1_3_ProductGrid' };
</script>
