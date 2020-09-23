// Vuex
import Vuex from "vuex";
import store from "./components/AuthStore";
Vue.use(Vuex);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//Router
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);
const router = new VueRouter({ routes });

// Axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);



// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
