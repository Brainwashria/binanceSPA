import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../pages/Main";
import Configuration from "../pages/Configuration";
Vue.use(VueRouter);

export default new VueRouter ({
  mode: "history",
  routes: [
    {
      path: '*',
      component: Main,
      name: 'Main'
    },
    {
      path: '/configuration',
      component: Configuration,
      name: 'Configuration'
    }
  ]


});