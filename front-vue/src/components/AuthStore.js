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
    state.name = "";
    state.id = "";
  },
  DELETE_CONTACTS: (state) => {
    state.contact = [];
  },
  ADDED_NAME: (state, name) => {
    state.name = name;
  },
  ADDED_ID: (state, id) => {
    state.id = id;
  },
  GET_CONTACTS: (state, contact) => {
    state.contact = contact;
  },
};

// GETTERS
const getters = {
  CONTACT_LIST:(state)=>()=>{
    return state.contact
  }
};

// ACTIONS
const actions = {
  ADD_TOKEN: (context, token) => {
    context.commit("ADDED_TOKEN", token);
  },
  DELETE_TOKEN: (context) => {
    context.commit("DELETE_TOKENS");
  },
  DELETE_CONTACT: (contect) => {
    contect.commit("DELETE_CONTACTS");
  },
  ADD_NAME: (context, name) => {
    context.commit("ADDED_NAME", name);
  },
  ADD_ID: (context, id) => {
    context.commit("ADDED_ID", id);
  },
  GET_CONTACT: (context, contact) => {
    context.commit("GET_CONTACTS", contact);
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
