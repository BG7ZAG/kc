import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _7b45c906 = () => import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */).then(m => m.default || m)
const _7b08885d = () => import('../pages/admin/swiper.vue' /* webpackChunkName: "pages/admin/swiper" */).then(m => m.default || m)
const _459ea801 = () => import('../pages/admin/goods.vue' /* webpackChunkName: "pages/admin/goods" */).then(m => m.default || m)
const _59a0caa3 = () => import('../pages/admin/category.vue' /* webpackChunkName: "pages/admin/category" */).then(m => m.default || m)
const _bab57e90 = () => import('../pages/admin/about.vue' /* webpackChunkName: "pages/admin/about" */).then(m => m.default || m)
const _de5671ea = () => import('../pages/admin/contact.vue' /* webpackChunkName: "pages/admin/contact" */).then(m => m.default || m)



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
			component: _7b45c906,
			name: "admin"
		},
		{
			path: "/admin/swiper",
			component: _7b08885d,
			name: "admin-swiper"
		},
		{
			path: "/admin/goods",
			component: _459ea801,
			name: "admin-goods"
		},
		{
			path: "/admin/category",
			component: _59a0caa3,
			name: "admin-category"
		},
		{
			path: "/admin/about",
			component: _bab57e90,
			name: "admin-about"
		},
		{
			path: "/admin/contact",
			component: _de5671ea,
			name: "admin-contact"
		}
    ],
    
    
    fallback: false
  })
}
