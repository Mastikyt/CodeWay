import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// jQuery для Bootstrap 4
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery

// Bootstrap 4 — стили идут ПЕРВЫМИ, чтобы Tailwind-слой мог их переопределить
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Tailwind CSS (слой заданий /tasks и /tailwind).
// preflight в слое base обёрнут селектором .tw-layer — он не трогает остальные страницы,
// поэтому Bootstrap и стили CodeWay продолжают работать как раньше.
import './tailwind/tailwind.css'

// Custom styles
import './assets/main.css'

// Компонент сравнения состояний JSON (Задание 2)
import JsonCompare from './components/JsonCompare.vue'

const app = createApp(App)
app.component('vue-json-compare', JsonCompare)
app.component('JsonCompare', JsonCompare)
app.use(router)
app.mount('#app')
