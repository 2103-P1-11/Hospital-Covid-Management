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
    path: '/employee',
    name: 'Employee',
    component: () => import(/* webpackChunkName: "about" */ '../views/Employee.vue')
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
