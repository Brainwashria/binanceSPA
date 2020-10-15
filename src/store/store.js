import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
Vue.use(Vuex);

let isSynchronized = false;

const defaultState = () => {
  return {
    asks: [],
    bids: [],
    symbol: '',
  }
}

function updateBidsOrAsk(state, data, props, type) {
  let stateCopy = _.cloneDeep(state);

  for(let props of data[type]) {
    let price = props[0];
    let amount = props[1];
    let total = price * amount;

    if(stateCopy[type].length === 0) {
      if(parseFloat(amount) > 0) {
        stateCopy[type].push({price, amount, total});
        continue;
      }
    }

    for(let index = 0; index < stateCopy[type].length; index++) {
      const stateAsk = stateCopy[type][index];

      if(parseFloat(price) === parseFloat(stateAsk.price)) {
        stateCopy[type].splice(index, 1);
        if(parseFloat(amount) > 0) {
          stateCopy[type].push({price, amount, total});
        }
        break;
      }
      const isLastElement = stateCopy[type].length - 1 === index;

      if(isLastElement && parseFloat(amount) > 0) {
        stateCopy[type].push({price, amount, total});
      }
    }
  }
  if(type === 'bids') {
    const sorted = stateCopy[type].sort((a, b) => {
      return b.price - a.price;
    })
    state[type] = sorted.slice(0, 49);
  }
  if(type === 'asks') {
    const sorted = stateCopy[type].sort((a, b) => {
      return a.price - b.price;
    })
    state[type] = sorted.slice(0,49);
  }
}

export default new Vuex.Store({
  actions: {
    changeSymbolAction({commit}, data) {
      commit('changeSymbol', data)
    },
    resetStateAction({commit}) {
      commit('resetState');
      isSynchronized = false;
    },
    loadSynchronizedAction({commit}, data) {
      commit('loadSynchronizedData', data);
    },
    updateStoreAction({commit}, data) {
      if(isSynchronized) {
        commit('updateStore', data);
      }
    }
  },
  mutations: {
    changeSymbol(state,data) {
      state.symbol = data;
    },
    loadSynchronizedData(state, data) {
      state.asks = []
      state.bids = []
      let bidsArr = data.bids.slice(0, 49);
      let asksArr = data.asks.slice(0, 49);
      for(let asks of asksArr) {
        let price = asks[0];
        let amount = asks[1];
        let total = price * amount;
        state.asks.push({price, amount, total})
      }
      for(let bids of bidsArr) {
        let price = bids[0];
        let amount = bids[1];
        let total = price * amount;
        state.bids.push({price, amount, total})
      }
      isSynchronized = true;
    },
    updateStore(state, data) {
      let bids = data.bids;
      let asks = data.asks;
      updateBidsOrAsk(state, data, bids, 'bids')
      updateBidsOrAsk(state, data, asks, 'asks')
    },
    resetState(state) {
      Object.assign(state, defaultState());
    }
  },
  getters: {
    getTheSymbol: state => {
      return state.symbol;
    }
  },
  state: defaultState()
})