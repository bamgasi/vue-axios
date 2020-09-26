import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Board from '@/views/Board'
const BoardWrite = () =>
  import(/* webpackChunkName: "BoardWrite" */ '@/views/BoardWrite.vue')
const UserInfo = () =>
  import(/* webpackChunkName: "UserInfo" */ '@/views/UserInfo.vue')
import store from '../store'

Vue.use(VueRouter)

const requireAuth = () => (from, to, next) => {
  if (store.getters['auth/token']) return next()
  next('/login')
}

const routes = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/token']) {
        next({ name: 'user-info' })
      } else {
        next()
      }
    },
    component: Login,
  },
  {
    path: '/userInfo',
    name: 'user-info',
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/token']) {
        next()
      } else {
        next({ name: 'login' })
      }
    },
    component: UserInfo,
  },
  {
    path: '/board',
    name: 'board',
    component: Board,
  },
  {
    path: '/board/write',
    name: 'board.write',
    component: BoardWrite,
    beforeEnter: requireAuth,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
