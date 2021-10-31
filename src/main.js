import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router'

createApp(App).use(router).use(VueRouter).mount('#app')
