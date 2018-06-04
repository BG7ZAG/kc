<template>
  <main class="box">
    <h2>关于我们</h2>
    <el-form :model="form">
      <el-form-item label="顶部图片:" :label-width="formLabelWidth">
        <el-upload
          action="/api/upload"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="企业简介:" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.desc">
        </el-input>
      </el-form-item>
      <el-form-item label="手机号码:" :label-width="formLabelWidth">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="电话号码:" :label-width="formLabelWidth">
        <el-input v-model="form.telephone" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="微信号:" :label-width="formLabelWidth">
        <el-input v-model="form.weixin" placeholder="请输入微信号"></el-input>
      </el-form-item>
      <el-form-item label="定位名称:" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入定位名称"></el-input>
      </el-form-item>
      <el-form-item label="定位地址:" :label-width="formLabelWidth">
        <el-input v-model="form.address" placeholder="请输入定位地址"></el-input>
      </el-form-item>
      <el-form-item label="定位经度:" :label-width="formLabelWidth">
        <el-input v-model="form.longitude" disabled placeholder="请输入定位经度"></el-input>
      </el-form-item>
      <el-form-item label="定位纬度:" :label-width="formLabelWidth">
        <el-input v-model="form.latitude" disabled placeholder="请输入定位纬度"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
  import axios from '../../plugins/axios'
  export default {
    layout: 'admin',
    name: 'about',
    head () {
      return {
        title: '关于我们'
      }
    },
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        formLabelWidth: '100px',
        form: {
          telephone: '',
          weixin: '',
          phone: '',
          desc: '',
          latitude: '19.619745',
          longitude: '110.76008',
          name: '康诚机电',
          address: '海南省文昌市海南省文昌市庆龄路23号',
          img: ''
        },
        fileList: [] // 图片列表
      }
    },
    created () {
      axios.get('/api/about').then(res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          if (res.data.data[0].banner) {
            this.form.img = res.data.data[0].banner
            this.fileList = [{
              name: res.data.data[0].img,
              url: res.data.data[0].url
            }]
          }
          this.form.desc = res.data.data[0].introduce
          this.form.phone = res.data.data[0].phone
          this.form.telephone = res.data.data[0].telephone
          this.form.weixin = res.data.data[0].wechat
          this.form.name = res.data.data[0].name
          this.form.address = res.data.data[0].address
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    methods: {
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 提交表单
      onSubmit () {
        console.log(this.form)
        let form = this.form
        axios.post('/api/about', {
          banner: form.img,
          introduce: form.desc,
          phone: form.phone,
          telephone: form.telephone,
          wechat: form.weixin,
          name: form.name,
          address: form.address
        }).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            axios.get('/api/about').then(res => {
              // console.log(res.data)
              if (res.data.code === 200) {
                if (res.data.data[0].banner) {
                  this.form.img = res.data.data[0].banner
                  this.fileList = [{
                    name: res.data.data[0].img,
                    url: res.data.data[0].url
                  }]
                }
                this.form.desc = res.data.data[0].introduce
                this.form.phone = res.data.data[0].phone
                this.form.telephone = res.data.data[0].telephone
                this.form.weixin = res.data.data[0].wechat
                this.form.name = res.data.data[0].name
                this.form.address = res.data.data[0].address
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      // 上传成功
      handleSuccess (response, file, fileList) {
        console.log(response, file, fileList)
        if (response.code === 200) {
          this.form.img = response.data.img
          this.form.url = response.data.url
        } else {
          this.$message.error(response.msg)
        }
      },
      // 上传失败
      handleError (err, file, fileList) {
        console.log(err, file, fileList)
      },
      // 移除上传的图片
      handleRemove (file, fileList) {
        console.log(file, fileList)
        this.form.img = ''
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
