import Dashboard from "../components/Dashboard";
import MyJumbotron from "../components/MyJumbotron";
import AuthStore from "../components/AuthStore";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// diifferent routes
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },

  { path: "/", name: "MyJumbotron", component: MyJumbotron },
];
const router = new VueRouter({ routes });

// handle the acces to the routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth == true && AuthStore.state.token) {
    next();
  } else if (requiresAuth == true && AuthStore.state.token == false) {
    next({ name: "MyJumbotron" });
  } else {
    next();
  }
});

export default router;
