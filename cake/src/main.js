import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import bModal from 'bootstrap-vue/es/components/modal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
//Vue.component('b-modal', bModal);

new Vue({
  el: '#app',
  components: {
    bModal
  },
  render: h => h(App)
})
