import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
// import axios from 'axios'
import cors from 'cors'

createApp(App).use(router).use(VueRouter).use(cors).mount('#app')
