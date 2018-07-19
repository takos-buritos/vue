import Vue from 'vue'
import App from './App.vue'
import AppCake from './Cake.vue'

import BootstrapVue from 'bootstrap-vue'
import bModal from 'bootstrap-vue/es/components/modal'
import draggable from 'vuedraggable'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.component('draggable', draggable);
Vue.component('AppCake', AppCake)

new Vue({
  el: '#app',
  components: {
    bModal
  },
  render: h => h(App)
})
