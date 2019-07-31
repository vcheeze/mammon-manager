import Vue from 'vue'
// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// Material Design icons for Vuetify
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// Vue Router
import VueRouter from 'vue-router'
import routes from './routes'
// App component
import App from './App.vue'

Vue.config.productionTip = false

// Vuetify
const vuetifyOptions = {}
Vue.use(Vuetify)

// Vue Router config
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  vuetify: new Vuetify(vuetifyOptions),
  router,
  render: h => h(App)
}).$mount('#app')
