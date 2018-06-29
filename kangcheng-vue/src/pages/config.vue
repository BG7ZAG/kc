<template>
  <main class="box">
    <h2>系统配置</h2>
    <el-form :model="form">

      <el-form-item label="管理员账号:" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入管理员账号"></el-input>
      </el-form-item>
      <el-form-item label="修改密码:" :label-width="formLabelWidth">
        <el-input v-model="form.password" type='password' placeholder="请输入新密码(不修改则不填)"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" :label-width="formLabelWidth">
        <el-input v-model="form.rpassword" type='password' placeholder="请确认密码(不修改则不填)"></el-input>
      </el-form-item>
      <el-form-item label="管理员邮箱:" :label-width="formLabelWidth">
        <el-input v-model="form.email" placeholder="请输入管理员邮箱"></el-input>
      </el-form-item>
      <el-form-item label="发件人邮箱:" :label-width="formLabelWidth">
        <el-input v-model="form.stmp_email" placeholder="请输入发件人邮箱"></el-input>
      </el-form-item>
      <el-form-item label="发件人邮箱密码:" :label-width="formLabelWidth">
        <el-input v-model="form.stmp_epassword" placeholder="请输入邮箱密码"></el-input>
      </el-form-item>
      <el-form-item label="STMP地址:" :label-width="formLabelWidth">
        <el-input v-model="form.stmp" placeholder="请输入STMP地址"></el-input>
      </el-form-item>
      <el-form-item label="STMP端口:" :label-width="formLabelWidth">
        <el-input v-model="form.stmp_port"  placeholder="请输入STMP端口，默认465"></el-input>
      </el-form-item>
      <el-form-item label="AppId:" :label-width="formLabelWidth">
        <el-input v-model="form.appid"  placeholder="请输入AppId"></el-input>
      </el-form-item>
      <el-form-item label="AppSecret:" :label-width="formLabelWidth">
        <el-input v-model="form.appsecret"  placeholder="AppSecret"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码:" :label-width="formLabelWidth">
        <el-input v-model="form.old_password"  placeholder="请输入管理员密码" type='password'></el-input>
      </el-form-item>
      <el-form-item label="验证码:" :label-width="formLabelWidth" class='code'>
        <el-input v-model="form.code" style='width:50%;' placeholder="请输入验证码" :append='code'></el-input>
        <div class="get-code" v-html='code' @click='getCode'></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>

    <!--   <el-form-item label="企业简介:" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.desc">
        </el-input>
      </el-form-item> -->
    </el-form>
  </main>
</template>

<script>
export default {
  layout: 'admin',
  name: 'config',
  head () {
    return {
      title: '系统配置'
    }
  },
  data () {
    return {
      formLabelWidth: '150px',
      code: '', // 验证码svg
      form: {
        name: '', // 账号
        password: '', // 密码
        rpassword: '', // 确认密码
        email: '', // 管理员邮箱
        stmp_email: '', // 发件人邮箱
        stmp_epassword: '', // 发件人邮箱密码
        stmp: '', // stmp
        stmp_port: 465, // stmp_port
        appid: '', // appid
        appsecret: '', // appsecret
        old_password: '', // 验证密码
        code: '' // 验证码
      }
    }
  },
  created () {
    this.$api.get(this.$root.urlPath.MJK + '/config', {}, res => {
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
      this.$api.get(this.$root.urlPath.MJK + '/code', {code:Date.now()},res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.code = res.data.data.img
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 提交表单
    onSubmit () {
      console.log(this.form)
      let form = this.form
      let data = {
        name: form.name,
        email: form.email,
        stmp_email: form.stmp_email,
        stmp_epassword: form.stmp_epassword,
        stmp: form.stmp,
        stmp_port: form.stmp_port,
        appid: form.appid,
        appsecret: form.appsecret,
        old_password: form.old_password,
        code: form.code
      }
      if (form.password || form.rpassword) {
        if (form.password !== form.rpassword) {
          this.$message.error('两次密码不一致')
          return
        }
      }
      // if (!form.appid) {
      //   this.$message.error('appid必填')
      //   return
      // }
      // if (!form.appsecret) {
      //   this.$message.error('appsecret必填')
      //   return
      // }
      if (!form.old_password) {
        this.$message.error('请输入管理员密码')
        return
      }
      if (!form.code) {
        this.$message.error('请输入验证码')
        return
      }

      if (form.password && form.rpassword && form.password === form.rpassword) {
        data.password = form.password
      }
      this.$api.post(this.$root.urlPath.MJK + '/config', data, res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$api.get(this.$root.urlPath.MJK + '/config',{}, res => {
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
              this.getCode()
            } else {
              this.$message.error(res.data.msg)
              this.getCode()
            }
          })
        } else {
          this.$message.error(res.data.msg)
          this.getCode()
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
.get-code{
  cursor: pointer;
}
</style>
<style>
    .code{
      display: flex;
      -ms-align-items: center;
      align-items: center;
    }
  .code .el-form-item__content{
    margin-left: 0!important;
    display: flex;
    -ms-align-items: center;
    align-items: center;
  }
</style>
