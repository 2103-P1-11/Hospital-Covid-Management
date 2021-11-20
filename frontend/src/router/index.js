import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/bed',
    name: 'Bed',
    component: () => import(/* webpackChunkName: "about" */ '../views/Bed.vue')
  },
  {
    path: '/hospital',
    name: 'Hospital',
    component: () => import(/* webpackChunkName: "about" */ '../views/Hospital.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
