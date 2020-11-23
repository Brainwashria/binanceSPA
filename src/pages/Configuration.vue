<template>
  <div>
    <select @change='changeSymbol' v-model='symbol' class='selectConfiguration'>
      <option>BTCUSDT</option>
      <option>BNBBTC</option>
      <option selected>ETHBTC</option>
    </select>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        symbol: null,
      }
    },
    mounted() {
      this.symbol = this.$store.getters.getTheSymbol;
    },
    created() {
      this.symbol = this.$store.getters.getTheSymbol;
    },
    methods: {
      changeSymbol() {
        this.$events.on('disconnect', () => {
          this.$store.dispatch('resetStateAction');
        })
        this.$binance.disconnect();
        this.$store.dispatch('changeSymbolAction', this.symbol);
        this.$binance.connect(this.symbol);
        this.$binance.synchronize(this.symbol);
      }
    },
    name: 'Configuration',
    components: {}
  }
</script>

<style scoped>
  div {
    text-align: center;
  }
  .selectConfiguration {
    color: #8497BD;
    border: 4px solid #8497BD;
    width: 220px;
    height: 56px;
    font-size: 20px;
  }

</style>