<template>
  <main class="box">
    <h2>关于我们</h2>
    <el-form :model="form">
      <el-form-item label="顶部图片:" :label-width="formLabelWidth">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
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
          address: '海南省文昌市海南省文昌市庆龄路23号'
        }
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 提交表单
      onSubmit () {
        console.log(this.form)
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
