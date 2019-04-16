import Vue from 'vue'
import Vuex from 'vuex'
import weather from './weather'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      weather,
      shared
    }
  })