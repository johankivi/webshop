import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import Pay from '@/views/Pay';
import Register from '@/views/Register';
import Documentation from '@/views/Documentation';
import Me from '@/views/Me';
import Admin from '@/views/Admin';
import Thanks from '@/views/Thankyou';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay
  },
  {
    path: '/thankyou',
    name: 'thankyou',
    component: Thanks
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: Documentation
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  historyMode: true,
  routes
})

export default router
