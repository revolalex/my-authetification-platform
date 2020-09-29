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
  contact: [],
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
  CONTACT_ADDED: (state, contact) => {
    state.contact = contact;
  },
};

// GETTERS
const getters = {};

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
  GET_CONTACT: (context, contact) => {
    context.commit("CONTACT_ADDED", contact);
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
