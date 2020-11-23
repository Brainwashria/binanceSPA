<template>
  <div>
    <div class='container'>
      <Table :is-it-bids='true'/>
      <Table :is-it-asks='true'/>
    </div>
  </div>
</template>

<script>
  import Table from '../components/Table';

  export default {
    name: 'Main',
    components: {Table}
  }
</script>

<style scoped>
.container {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>