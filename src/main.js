import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router'
import cors from 'cors'
import './theme/main.css'
import store from './vuex/store'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB3MQBkbulZvgJZvqOi2gQxvNV377SqgcI',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})

// createApp(App).use(router).use(VueRouter).use(vuetify).use(cors).mount('#app')
new Vue({
  vuetify,
  VueRouter,
  router,
  cors,
  store,
  render: h => h(App)
}).$mount('#app')
