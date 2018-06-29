// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Api from './api/index.js'
import rootPath from './api/url.js'
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  if (to.path != '/login') {
  	console.log('')
  	if (localStorage.getItem('login') == 1) {
  		next()
  	} else {
  		next('/login')
  	}
  }else {
  	next()
  }
})

Vue.config.productionTip = false
Vue.prototype.$api = Api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    urlPath: rootPath.pathUrl()// 通过url.js 控制 开发 和线上环境
  }
})
