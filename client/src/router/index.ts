import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/games',
    name: 'GamesPage',
    component: () => import('../views/GamesPage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/newgame',
    name: 'NewGame',
    component: () => import('../views/NewGame.vue')
  },
  {
    path: '/ingame',
    name: 'InGame',
    component: () => import('../views/InGame.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
