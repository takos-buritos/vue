import Vue from 'vue'
import App from './App.vue'

import AppMessage from './components/Message.vue'
import AppStartScreen from './components/StartScreen.vue'
import AppResultScreen from './components/ResultScreen.vue'
import AppQuestion from './components/Question.vue'

Vue.component('AppMessage', AppMessage)
Vue.component('AppStartScreen', AppStartScreen)
Vue.component('AppResultScreen', AppResultScreen)
Vue.component('AppQuestion', AppQuestion)

new Vue({
  el: '#app',
  render: h => h(App)
})
