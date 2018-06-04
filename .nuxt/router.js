import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2ba1afec = () => import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */).then(m => m.default || m)
const _3a5681ce = () => import('../pages/admin/swiper.vue' /* webpackChunkName: "pages/admin/swiper" */).then(m => m.default || m)
const _8974088c = () => import('../pages/admin/contact.vue' /* webpackChunkName: "pages/admin/contact" */).then(m => m.default || m)
const _7d562bd4 = () => import('../pages/admin/category.vue' /* webpackChunkName: "pages/admin/category" */).then(m => m.default || m)
const _0be9d527 = () => import('../pages/admin/about.vue' /* webpackChunkName: "pages/admin/about" */).then(m => m.default || m)
const _503be798 = () => import('../pages/admin/config.vue' /* webpackChunkName: "pages/admin/config" */).then(m => m.default || m)
const _a2398720 = () => import('../pages/admin/goods.vue' /* webpackChunkName: "pages/admin/goods" */).then(m => m.default || m)
const _156d59fa = () => import('../pages/admin/login.vue' /* webpackChunkName: "pages/admin/login" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/admin",
			component: _2ba1afec,
			name: "admin"
		},
		{
			path: "/admin/swiper",
			component: _3a5681ce,
			name: "admin-swiper"
		},
		{
			path: "/admin/contact",
			component: _8974088c,
			name: "admin-contact"
		},
		{
			path: "/admin/category",
			component: _7d562bd4,
			name: "admin-category"
		},
		{
			path: "/admin/about",
			component: _0be9d527,
			name: "admin-about"
		},
		{
			path: "/admin/config",
			component: _503be798,
			name: "admin-config"
		},
		{
			path: "/admin/goods",
			component: _a2398720,
			name: "admin-goods"
		},
		{
			path: "/admin/login",
			component: _156d59fa,
			name: "admin-login"
		}
    ],
    
    
    fallback: false
  })
}
