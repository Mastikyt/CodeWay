<template>
  <footer class="app-footer">
    <div class="container">
      <div class="row align-items-center py-4" style="border-bottom: 1px solid var(--border-subtle);">
        <div class="col-lg-4 mb-3 mb-lg-0">
          <router-link to="/" class="navbar-brand d-inline-block mb-1" style="font-size: 20px;">
            <span class="code-icon">&lt;/&gt;</span> CodeWay <small style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;">.BY</small>
          </router-link>
          <p style="color: var(--text-muted); font-size: 13px; margin: 0;">
            Практическая IT-академия в Республике Беларусь. Подготовка разработчиков и дизайнеров.
          </p>
        </div>
        <div class="col-lg-4 mb-3 mb-lg-0">
          <div style="font-size: 13px; color: var(--text-secondary);">
            <div class="mb-1">📍 <strong>г. Минск</strong>, пр-т Победителей, 7А (БЦ «Королевская Плаза»)</div>
            <div class="mb-1">📞 <a href="tel:+375295554242" style="color: var(--accent-cyan); text-decoration: none;">+375 (29) 555-42-42</a>, <a href="tel:+375447892026" style="color: var(--text-secondary); text-decoration: none;">+375 (44) 789-20-26</a></div>
            <div>✉️ <a href="mailto:info@codeway.by" style="color: var(--text-secondary); text-decoration: none;">info@codeway.by</a></div>
          </div>
        </div>
        <div class="col-lg-4 text-lg-right">
          <div class="d-flex justify-content-lg-end" style="gap: 16px;">
            <a href="#" style="color: var(--text-secondary); text-decoration: none;">Telegram (@codeway_by)</a>
            <a href="#" style="color: var(--text-secondary); text-decoration: none;">VK</a>
            <a href="#" style="color: var(--text-secondary); text-decoration: none;">YouTube</a>
          </div>
          <small class="d-block mt-2" style="color: var(--text-muted); font-size: 11px;">
            Цены на обучение указаны в долларах США ($) по курсу НБ РБ
          </small>
        </div>
      </div>
      <div class="pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center" style="font-size: 12px; color: var(--text-muted);">
        <span>© 2026 CodeWay IT Academy (Минск, Беларусь). Все права защищены.</span>
        <span>УНП 193456789 • Зарегистрировано Минским горисполкомом</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>
