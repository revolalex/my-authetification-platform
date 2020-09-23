import Dashboard from "./components/Dashboard";
import MyJumbotron from "./components/MyJumbotron";

const routes = [
    { path: "/dashboard", name: Dashboard, component: Dashboard },
    { path: "/", name: MyJumbotron, component: MyJumbotron }
];

export default routes;
