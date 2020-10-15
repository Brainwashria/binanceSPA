<template>
 <div id="app">
  <Header v-on:toggle-sidebar="listenToggleSidebar"/>
  <SidebarMenu :class="{active : isSidebarActive}"/>
  <router-view/>
 </div>
</template>

<script>
import Header from "./components/Header";
import SidebarMenu from "./components/SidebarMenu";

export default {
  name: 'App',
  components: {
   SidebarMenu,
   Header
  },
 created() {
  this.$binance.connect(`ethbtc`);
  this.$store.dispatch('changeSymbolAction', `ETHBTC`)
  this.$binance.synchronize(`ethbtc`);
  this.$events.on('load', (data) => {
   this.$store.dispatch('loadSynchronizedAction', data)
  })
 },
 mounted() {
 },
 data() {
  return {
   isSidebarActive: false,
  }
 },
 methods: {
  listenToggleSidebar() {
   this.isSidebarActive = !this.isSidebarActive;
  }
 }
}
</script>

<style lang="less">
 @import 'style/style.less';
#app {

}
</style>
