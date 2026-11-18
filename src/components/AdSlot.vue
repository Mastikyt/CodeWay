<template>
  <aside
    class="ad-slot"
    :class="`ad-slot--${size}`"
    aria-label="Рекламное место"
  >
    <span class="ad-slot__label">Рекламное место</span>
  </aside>
</template>

<script>
export default {
  name: 'AdSlot',
  props: {
    size: {
      type: String,
      default: 'banner',
      validator: (value) => ['banner', 'sidebar'].includes(value),
    },
  },
}
</script>

<style scoped>
.ad-slot {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-inline: auto;
  border: 1px dashed #667085;
  border-radius: 12px;
  background: #f3f5f8;
  color: #475467;
}

.ad-slot--banner {
  min-height: 100px;
  max-width: 970px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.ad-slot--sidebar {
  min-height: 280px;
  max-width: 336px;
}

.ad-slot__label {
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.5;
}

@media (prefers-color-scheme: dark) {
  .ad-slot {
    border-color: #667085;
    background: #202b3c;
    color: #d0d5dd;
  }
}

@media (max-width: 575.98px) {
  .ad-slot--banner {
    min-height: 88px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
