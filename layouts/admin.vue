<template>
  <el-container direction="vertical">
    <el-header>
      <i class="el-icon-menu isAside" @click="isPhoneL = !isPhoneL"></i>
      <div class="header-l">
        <p class="logo">康诚机电 后台管理系统</p>
        <el-menu
          :default-active="activeIndex1"
          class="el-menu-demo topNav"
          mode="horizontal"
          router
          @select="handleSelect"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/admin/">首页</el-menu-item>
        </el-menu>
      </div>
      <i class="el-icon-more" @click="isPhoneR = !isPhoneR"></i>
      <el-menu
        v-if="!isPhoneR"
        id="header-r"
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelectRight"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">admin</el-menu-item>
        <el-menu-item index="2">前台</el-menu-item>
        <el-menu-item index="3">退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside class="aside" v-if="!isPhoneL" width="auto">
        <transition name="el-fade-in-linear">
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                   :collapse="isCollapse"
                   router
                   @select="asideSelect"
                   :default-active="asideIndex"
                   background-color="#393D49"
                   text-color="#fff"
                   active-text-color="#ffd04b">

            <el-menu-item index="/admin/category">
              <i class="el-icon-menu"></i>
              <span slot="title">分类管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/goods">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/swiper">
              <i class="el-icon-more-outline"></i>
              <span slot="title">轮播管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/contact">
              <i class="el-icon-message"></i>
              <span slot="title">留言列表</span>
            </el-menu-item>
            <el-menu-item index="/admin/about">
              <i class="el-icon-info"></i>
              <span slot="title">关于我们</span>
            </el-menu-item>
            <el-menu-item index="/admin/config">
              <i class="el-icon-setting"></i>
              <span slot="title">系统配置</span>
            </el-menu-item>
            <el-menu-item index="-1" route="#" @click="isCollapse = !isCollapse">
              <i v-if="!isCollapse" class="el-icon-caret-left"></i>
              <i v-else class="el-icon-caret-right"></i>
              <span slot="title">收起菜单</span>
            </el-menu-item>
          </el-menu>
        </transition>
      </el-aside>
      <el-container direction="vertical">
        <el-main>
          <nuxt/>
        </el-main>
        <el-footer>
          <p>© 2018 <a href="/admin">康诚机电</a> - Powered by <a target="_blank"
                                                              href="https://github.com/hlbj105/kc">Jason</a>
          </p>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
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
</style>
<style scoped lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-header {
    background: #23262E;
    display: flex;
    justify-content: space-between;
  }

  .header-l {
    display: flex;
    > p {
      color: #fff;
      margin-right: 30px;
    }
  }

  .el-icon-more, .isAside {
    display: none;
  }

  @media screen and (max-width: 500px) {
    .topNav {
      display: none;
    }
    .el-footer {
      font-size: 16px;
      text-align: center;
    }

    .logo {
      width: calc(100vw - 20px);
      text-align: center;
    }
    #header-r {
      position: absolute;
      right: 0;
      top: 60px;
      > .el-menu-item {
        width: 100vw;
      }
    }
    header {
      .el-icon-more {
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
      .isAside {
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

  .el-menu-vertical-demo:not(.el-menu--collapse), .el-menu--collapse {
    min-height: calc(100vh - 60px);
    height: 100%;
  }

</style>
