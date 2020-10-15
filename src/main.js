import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import BinancePlugin from "./plugins/BinancePlugin";
import EventEmitterPlugin from "./plugins/EventEmitterPlugin";
import store from "./store/store";

Vue.use(EventEmitterPlugin);
Vue.use(BinancePlugin);

// Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
