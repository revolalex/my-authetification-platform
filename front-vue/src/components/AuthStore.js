import "es6-promise/auto";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// STATE
let state = {
  showDashboard: false,
};

// MUTATIONS
const mutations = {};

// GETTERS
const getters = {};

// ACTIONS
const actions = {};

// STORE
let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
});

global.store = store;
export default store;
