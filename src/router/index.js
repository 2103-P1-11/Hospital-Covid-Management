import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/patient',
    name: 'Patient',
    component: () => import(/* webpackChunkName: "about" */ '../views/Patient.vue')
  },
  {
    path: '/hospital',
    name: 'Hospital',
    component: () => import(/* webpackChunkName: "about" */ '../views/Hospital.vue')
  },
  {
    path: '/swabs',
    name: 'Swabs',
    component: () => import(/* webpackChunkName: "about" */ '../views/Swabs.vue')
  },
  {
    path: '/tables',
    name: 'Tables',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tables.vue')
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import(/* webpackChunkName: "about" */ '../charts/charttest.vue')
  // },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
