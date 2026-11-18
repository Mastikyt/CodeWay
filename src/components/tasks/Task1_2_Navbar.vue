<template>
  <nav class="navbar navbar-expand-lg" style="background: var(--bg); border: 1px solid var(--border);">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" style="color: var(--text-h);">CodeWay</a>
      <button class="navbar-toggler" type="button" @click="mobileOpen = !mobileOpen">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{'show': mobileOpen}">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><a class="nav-link" href="#" style="color: var(--text);">Главная</a></li>
          <li class="nav-item"><a class="nav-link" href="#" style="color: var(--text);">Курсы</a></li>
        </ul>
        <button class="btn btn-primary btn-sm">Войти</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default { 
  name: 'Task1_2_Navbar',
  data() { return { mobileOpen: false } }
};
</script>
