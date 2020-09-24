import "es6-promise/auto";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

// STATE
let state = {
  token: false,
};

// MUTATIONS
const mutations = {
  ADDED_TOKEN: (state, token) =>{
    state.token = token
  },
  DELETE_TOKENS:(state)=>{
    state.token  = false
  }
};

// GETTERS
const getters = {
};

// ACTIONS
const actions = {
  ADD_TOKEN: (context, token) =>{
    context.commit("ADDED_TOKEN", token)
  },
  DELETE_TOKEN:(context)=>{
    context.commit ("DELETE_TOKENS")
  }

};

// STORE
let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  plugins: [createPersistedState()]
});

global.store = store;
export default store;
