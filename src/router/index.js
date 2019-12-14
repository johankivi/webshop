import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/Pay.vue')
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('../views/Me.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
