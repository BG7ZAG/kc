<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: #666;
  }

  .el-main {
    background: #DEE2E6;
  }

  .el-footer {
    background: #eee;
  }
  .box{
    background-color: #fff;
    padding: 20px;
    margin-bottom: 15px;
  }
</style>
