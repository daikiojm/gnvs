import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from './App.vue'

import Index from './pages/Index.vue'

import 'virtual:windi.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
