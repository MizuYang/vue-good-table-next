import { createApp } from 'vue'
import router from './router'

import { createPinia } from 'pinia'

import 'bootstrap'

// 全域匯入
// import VueGoodTablePlugin from 'vue-good-table-next'
// import 'vue-good-table-next/dist/vue-good-table-next.css'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
// app.use(VueGoodTablePlugin)
app.use(pinia)

app.mount('#app')
