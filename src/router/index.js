import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: r => require(['@/pages/Login'], r)
    },
    {
      path: '/',
      name: 'Index',
      component: r => require(['@/pages/Index'], r)
    },
    {
      path: '/myreport',
      name: 'MyReport',
      component: r => require(['@/pages/MyReport'], r)
    }
  ]
})
