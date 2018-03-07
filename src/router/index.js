import Vue from 'vue'
import Router from 'vue-router'

// 首页
const INDEX = resolve => {
  import('views/index/index').then((c) => {
    resolve(c)
  })
}

// 详情页
const CONTENT = resolve => {
  import('views/index/children/content').then((c) => {
    resolve(c)
  })
}

// 登录页
const LOGIN = resolve => {
  import('views/login/login').then((c) => {
    resolve(c)
  })
}

// 发布话题
const PUT = resolve => {
  import('views/put/put').then((c) => {
    resolve(c)
  })
}

// 未登录
const NOTLOGIN = resolve => {
  import('views/login/nologin').then((c) => {
    resolve(c)
  })
}

// 我的
const USER = resolve => {
  import('views/user/user').then((c) => {
    resolve(c)
  })
}

Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: INDEX,
    children: [
      {
        path: ':id',
        component: CONTENT
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LOGIN
  },
  {
    path: '/put',
    name: 'put',
    component: PUT,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/nologin',
    name: 'nologin',
    component: NOTLOGIN
  },
  {
    path: '/user',
    name: 'user',
    component: USER,
    meta: {
      requireAuth: true
    }
  }
]

const router = new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes
})

export default router
