<template>
  <div class="sideBarMenu">
   <router-link to="/">Main</router-link>
    <router-link to="/Configuration">Configuration</router-link>
  </div>
</template>

<script>

  export default {
    name: "SidebarMenu",
  }
</script>

<style scoped lang="less">
.sideBarMenu {
  padding: 20px;
  box-sizing: border-box;
  width: 440px;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  font-size: 40px;
  left: -100%;
  transition: 250ms;
  background-color: #BBC1D7;
    a {
      color: white;
    }
}
.active {
  left: 0;
}
</style>