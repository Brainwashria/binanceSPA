import binanceParser from '../parser/binanceParser';
const axios = require('axios');


const sleep = async (delay) => {
  return new Promise((resolve) => {
    setTimeout(()=> {
      resolve();
    }, delay)
  })
}

function update(orderBook, updateProps) {
  for(let update of updateProps) {
    let price = update[0];
    let amount = update[1];
    for(let data of orderBook) {
      if (parseFloat(amount) === 0 && price === data[0]) {
        let index = orderBook.indexOf(data);
        orderBook.splice(index, 1);
      }
      if (parseFloat(price) === parseFloat(data[0])) {
        data[1] = amount;
      }
    }
  }
}

let response
export default {
  install(Vue) {
    let connection = null;
    let bufferStream = [];
    Vue.prototype.$binance = {
        connect: async function(symbol) {
          bufferStream = [];
          connection = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`);
          connection.onmessage = function(event) {
            let parsedData = binanceParser(event.data);
            bufferStream.push(JSON.parse(event.data));
            Vue.prototype.$events.emit('update', parsedData);
          }
        },
        synchronize: async function (symbol) {
          response = await axios.get(`https://www.binance.com/api/v1/depth?symbol=${symbol.toUpperCase()}&limit=100`)
          await sleep(3000);
          let orderBook = response.data;
          let arrayCopy = [...bufferStream];
          let isThereAMatch = false;
          for(let obj of arrayCopy) {
            if(obj.U <= orderBook.lastUpdateId + 1 && obj.u >= orderBook.lastUpdateId + 1) {
              isThereAMatch = true;
              let updateAsks  = obj.a;
              let updateBids = obj.b;
              let orderBookAsks = orderBook.asks;
              let orderBookBids = orderBook.bids;
              update(orderBookAsks, updateAsks);
              update(orderBookBids, updateBids);
            }
          }
          if(isThereAMatch === false) {
            await this.synchronize(`${symbol}`);
          }
          Vue.prototype.$events.emit('load', orderBook);
        },
        disconnect: async function() {
          connection.close();
          Vue.prototype.$events.emit('disconnect');
        }
    }
  }
}