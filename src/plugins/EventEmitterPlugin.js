const EventEmitter = require('events');

export default {
  install(Vue) {
    Vue.prototype.$events = new EventEmitter;
  }
}