import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Customize from '../views/Customize.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customize',
    name: 'Customize',
    component: Customize
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
