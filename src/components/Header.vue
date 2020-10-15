<template>
  <header>
    <div class="menu">
      <button id="menuButton" @click="$emit('toggle-sidebar')"/>
      <span>Menu</span>
    </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
    methods: {

    }
  }
</script>

<style scoped lang="less">
 .menu {
   font-size: 40px;
   color: #8497BD;
   width: 200px;
   display: flex;
   align-items: center;
   padding: 20px;
   justify-content: space-between;
   #menuButton {
     background-image: url("./../assets/img/menu_24px_outlined.svg");
     width: 48px;
     height: 48px;
   }
 }
</style>