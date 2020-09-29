import "es6-promise/auto";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

// STATE
let state = {
  token: false,
  name: "",
  id: "",
};

// MUTATIONS
const mutations = {
  ADDED_TOKEN: (state, token) => {
    state.token = token;
  },
  DELETE_TOKENS: (state) => {
    state.token = false;
  },
  ADDED_NAME: (state, name) => {
    state.name = name;
  },
  ADDED_ID: (state, id) => {
    state.id = id;
  },
};

// GETTERS
const getters = {
  //filtre array to only return the one with the good id
  LIST_TO_DISPLAY: (state) => (listOfContact) => {
    function filtre(element) {
      return (element.id_user_affiliate == state.id);
    }
    return listOfContact.filter(filtre);
  },
};

// ACTIONS
const actions = {
  ADD_TOKEN: (context, token) => {
    context.commit("ADDED_TOKEN", token);
  },
  DELETE_TOKEN: (context) => {
    context.commit("DELETE_TOKENS");
  },
  ADD_NAME: (context, name) => {
    context.commit("ADDED_NAME", name);
  },
  ADD_ID: (context, id) => {
    context.commit("ADDED_ID", id);
  },
};

// STORE
let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  plugins: [createPersistedState()],
});

global.store = store;
export default store;
