import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('fetchWeather')
  }
})
