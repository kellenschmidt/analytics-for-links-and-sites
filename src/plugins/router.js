import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout'
import About from '../views/About'
import Table from '../views/Table'
import OperatingSystemsView from '../components/OperatingSystemsView'
import BrowsersView from '../components/BrowsersView'
import LineChart from '../components/charts/LineChart'
import CustomChart from '../components/charts/CustomChart'
// const TableLazy = () => import('../views/Table')

Vue.use(Router)

const childRoutes = [
  {
    path: 'overview',
    component: About,
  },
  {
    path: 'browsers',
    component: BrowsersView,
  },
  {
    path: 'operating-systems',
    component: OperatingSystemsView,
  },
  {
    path: 'devices',
    component: LineChart,
  },
  {
    path: 'location',
    component: LineChart,
  },
  {
    path: 'frequency',
    component: CustomChart,
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

export default new Router({
  base: '/analytics',
  routes: [
    {
      path: '/links/:linkId/',
      component: Layout,
      children: childRoutes
    },
    {
      path: '/site/',
      component: Layout,
      children: childRoutes
    },
    {
      path: '',
      redirect: 'site/table'
    }
  ],
  mode: 'history',
})
