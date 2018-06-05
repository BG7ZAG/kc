<template>
  <main class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class='form' label-width="80px">
      <h2>康诚机电后台管理系统</h2>
      <el-form-item label="账号"
        prop="name"
      >
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码"
        prop="password"
      >
        <el-input type='password' v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" class='code'>
        <el-input style='width:60%;' v-model="ruleForm.code"></el-input>
        <div v-html='code' @click='getCode'></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleForm)">登录</el-button>
      </el-form-item>
    </el-form>
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
      code: '', // 验证码svg
      ruleForm: {
        name: '', // 用户名
        password: '', // 密码
        code: '' // 验证码
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请输入验证码' }
        ]
      }
    }
  },
  created () {
    console.log(13)
    this.getCode()
  },
  methods: {
    onSubmit (ruleForm2) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(ruleForm2)
          axios.post('/api/login', {
            name: ruleForm2.name,
            password: ruleForm2.password,
            code: ruleForm2.code
          })
            .then(res => {
              if (res.data.code === 200) {
                this.$message({message: '登录成功', type: 'success'})
                setTimeout(() => {
                  this.$router.push('/admin/')
                }, 1500)
              } else {
                this.$message.error(res.data.msg)
                this.getCode()
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
.login {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), radial-gradient(at top center, rgba(255, 255, 255, 0.40) 0%, rgba(0, 0, 0, 0.40) 120%) #989898;
  background-blend-mode: multiply, multiply;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
}
.form{
  background: #fff;
  padding: 20px 40px 20px 10px;
  border-radius: 10px;
}
.form h2{
  text-align: center;
  margin-bottom: 20px;
}
.el-form {
  width: 500px;
}

.el-button--primary {
  float: right;
}
</style>
<style>
.code{
  width: 100%;
      display: flex;
      -ms-align-items: center;
      align-items: center;
    }
  .code .el-form-item__content{
    flex: 1;
    margin-left: 0!important;
    display: flex;
    -ms-align-items: center;
    align-items: center;
  }

</style>
