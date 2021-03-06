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
      component: r => require(['@/pages/Index'], r),
      children: [
        {
          path: '/reports/:userId',
          name: 'UserReport',
          component: r => require(['@/pages/UserReport'], r)
        }
      ]
    },
    {
      path: '/myreport',
      name: 'MyReport',
      component: r => require(['@/pages/MyReport'], r)
    },
    {
      path: '/writereport',
      name: 'WriteReport',
      component: r => require(['@/pages/WriteReport'], r)
    }
  ]
})
