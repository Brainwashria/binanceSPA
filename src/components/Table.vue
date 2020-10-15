<template>
  <div>
    <table class="table"  v-if="isItAsks" :class="{'bids': isItBids, 'asks': isItAsks}">
      <thead>
        <tr>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) of this.$store.state.asks" v-bind:key="index">
          <td>{{row.price}}</td>
          <td>{{row.amount}}</td>
          <td>{{row.total}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="isItBids" :class="{'bids': isItBids, 'asks': isItAsks}">
      <thead>
      <tr>
        <th>Price</th>
        <th>Amount</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) of this.$store.state.bids" v-bind:key="index">
        <td>{{row.price}}</td>
        <td>{{row.amount}}</td>
        <td>{{row.total}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Table",
    data: function () {
      return {
      }
    },
    mounted() {
      this.$events.on('update', (data) => {
        this.$store.dispatch('updateStoreAction', data)
      })
    },
    props: {
      isItBids: {
        type: Boolean
      },
      isItAsks: {
        type: Boolean
      }
    }
  }
</script>

<style scoped lang="less">
 .table {
   margin: 20px 20px 20px 0;
   font-size: 25px;
   /*width: 561px;*/
   border-collapse: collapse;
   border: 2px solid #8497BD;
   color: #8497BD;
   height: 200px;
   thead, tbody {
     display: block;
   }
   thead {
     vertical-align: middle;
     display: flex;
     th {
       font-size: 20px;
       width: 187px;
       padding: 8px;
       box-sizing: border-box;
     }
   }
   tbody {
     vertical-align: middle;
     overflow-y: auto;
     height: 500px;
     overflow-x: hidden;
   }
   tr {
     display: flex;
     justify-content: space-between;
     width: 100%;
     height: 44px;
     font-size: 17px;
     td {
       text-align: center;
       padding: 10px;
       width: 181px;
     }
   }
 }
</style>