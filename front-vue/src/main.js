// Vuex
import Vuex from "vuex";
import store from "./components/AuthStore";
Vue.use(Vuex);

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//Router
import router from "./routes/routes";

// Axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
