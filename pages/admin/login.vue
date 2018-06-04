<template>
  <main class="box">
    <h2>登录</h2>
   
  </main>
</template>

<script>
  import axios from '../../plugins/axios'
  export default {
    // layout: 'admin',
    name: 'login',
    head () {
      return {
        title: '登录'
      }
    },
    data () {
      return {
        code: '' // 验证码svg
      }
    },
    created () {
      axios.get('/api/config').then(res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.form.name = res.data.data[0].name
          this.form.email = res.data.data[0].email
          this.form.stmp_email = res.data.data[0].stmp_email
          this.form.stmp_epassword = res.data.data[0].stmp_epassword
          this.form.stmp = res.data.data[0].stmp
          this.form.stmp_port = res.data.data[0].stmp_port
          this.form.appid = res.data.data[0].appid
          this.form.appsecret = res.data.data[0].appsecret
        } else {
          this.$message.error(res.data.msg)
        }
      })
      this.getCode()
    },
    methods: {
      getCode () {
        axios.get('/api/code').then(res => {
          // console.log(res.data)
          if (res.data.code === 200) {
            this.code = res.data.data.img
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }

    }
  }
</script>

<style scoped>
  h2{
    margin-bottom: 20px;
  }
  .el-form{
    width: 500px;
  }
  .el-button--primary{
    float: right;
  }

</style>
<style>

</style>