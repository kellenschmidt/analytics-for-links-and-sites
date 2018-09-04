import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout'
import About from '../views/About'
import Table from '../views/Table'

Vue.use(Router)

export default new Router({
  base: '/analytics',
  routes: [
    {
      path: '/links/:linkId/',
      component: Layout,
      children: [
        {
          path: 'overview',
          component: About,
        },
        {
          path: 'browsers',
          component: About,
        },
        {
          path: 'operating-systems',
          component: About,
        },
        {
          path: 'devices',
          component: About,
        },
        {
          path: 'location',
          component: About,
        },
        {
          path: 'frequency',
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
    },
    {
      path: '/sites/:siteId/',
      component: Layout,
      children: [
        {
          path: 'overview',
          component: About,
        },
        {
          path: 'browsers',
          component: About,
        },
        {
          path: 'operating-systems',
          component: About,
        },
        {
          path: 'devices',
          component: About,
        },
        {
          path: 'location',
          component: About,
        },
        {
          path: 'frequency',
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
    },
    {
      path: '',
      redirect: 'sites/kellenforthewin/table'
    }
  ],
  mode: 'history',
})
