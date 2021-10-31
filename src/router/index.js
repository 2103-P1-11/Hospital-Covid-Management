import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Task Manager',
    component: import(/* webpackChunkName: "about" */ '../views/TaskManager.vue')
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
