import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import index from '@/pages/index'
import category from '@/pages/category'
import goods from '@/pages/goods'
import swiper from '@/pages/swiper'
import contact from '@/pages/contact'
import about from '@/pages/about'
import config from '@/pages/config'
import admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: admin,
      children: [
        { path: '/', component: index },
        { path: '/category', component: category },
        { path: '/goods', component: goods },
        { path: '/swiper', component: swiper },
        { path: '/contact', component: contact },
        { path: '/about', component: about },
        { path: '/config', component: config }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
