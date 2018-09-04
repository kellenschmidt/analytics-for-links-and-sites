import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Table from '../views/Table.vue'

Vue.use(Router)

export default new Router({
  base: '/analytics',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'overview',
          component: About,
        },
        {
          path: 'table',
          component: Table,
        },
        {
          path: '',
          redirect: 'table'
        }
      ]
    }
  ],
  mode: 'history',
})
