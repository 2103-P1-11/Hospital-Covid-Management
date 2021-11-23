import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router'
import cors from 'cors'
import './main.css';


Vue.config.productionTip = false

// createApp(App).use(router).use(VueRouter).use(vuetify).use(cors).mount('#app')
new Vue({
  vuetify,
  VueRouter,
  router,
  cors,
  render: h => h(App)
}).$mount('#app')
