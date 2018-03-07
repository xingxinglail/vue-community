import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'assets/css/index.styl'

Vue.config.productionTip = false

document.addEventListener('touchmove', (e) => {
  e.preventDefault()
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.meta.requireAuth) {
    if (store.state.token === '' || store.state.user === null) {
      next({
        path: '/nologin',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

