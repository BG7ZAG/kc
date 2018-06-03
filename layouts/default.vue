<template>
  <nuxt/>
</template>

<script>
  export default {

    data () {
      return {
        isCollapse: false,
        activeIndex1: '/',
        activeIndex2: null,
        isPhoneL: false,
        isPhoneR: false,
        asideIndex: null
      }
    },
    mounted () {
      window.addEventListener('resize', () => {
        if (window.innerWidth < 500) {
          this.isPhoneL = true
          this.isPhoneR = true
        } else {
          this.isPhoneL = false
          this.isPhoneR = false
        }
      })
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      asideSelect (key, keyPath) {
        this.asideIndex = key
        this.activeIndex1 = null
        this.activeIndex2 = null
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
        this.activeIndex1 = key
        this.activeIndex2 = null
        this.asideIndex = null
      },
      handleSelectRight (key, keyPath) {
        this.activeIndex2 = key
        this.activeIndex1 = null
        this.asideIndex = null
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  a{
    color: inherit;
    text-decoration: none;
  }
  a:hover{
    color: #666;
  }
  .el-main{
    background: #DEE2E6;
  }
  .el-footer{
    background: #eee;
  }
</style>
<style scoped lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-header{
    background: #23262E;
    display: flex;
    justify-content: space-between;
  }
  .header-l{
    display: flex;
    > p{
      color: #fff;
      margin-right: 30px;
    }
  }
  .el-icon-more,.isAside{
    display: none;
  }
  @media screen and (max-width: 500px) {
    .topNav{
      display: none;
    }
    .el-footer{
      font-size: 16px;
      text-align: center;
    }

    .logo{
      width: calc(100vw - 20px);
      text-align: center;
    }
    #header-r{
      position: absolute;
      right: 0;
      top: 60px;
      > .el-menu-item{
        width: 100vw;
      }
    }
    header{
      .el-icon-more{
        display: block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        position: absolute;
        color: #fff;
        right: 0;
        top: 0;
        text-align: center;
        font-size: 25px;
      }
      .isAside{
        display: block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        position: absolute;
        color: #fff;
        left: 0;
        top: 0;
        text-align: center;
        font-size: 25px;

      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse),.el-menu--collapse{
    min-height: calc(100vh - 60px);
    height: 100%;
  }

</style>
