// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
var VueFire = require('vuefire')
var firebase = require('firebase')

// explicit installation required in module environments
Vue.use(VueMaterial)
Vue.use(VueFire)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})