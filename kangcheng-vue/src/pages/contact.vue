<template>
  <main class="box">
    <h2>留言列表</h2>
    <div class="category-topBtn" style="margin-top: 20px">
      <el-button @click="delCategory()">删除留言</el-button>
    </div>
    <el-table stripe border ref="multipleTable" :data="contact.data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="id" width="220">
        <template slot-scope="scope">{{ scope.row._id }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="时间" width="100">
      </el-table-column>
      <el-table-column prop="name" label="留言名称" width="100">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" width='130'>
      </el-table-column>
      <el-table-column prop="content" label="留言内容" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <!--<el-button size="small" @click="addCategory(scope.row.id)">回复</el-button>-->
          <el-button type="danger" size="small" @click="delCategory(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="contact.limit" @current-change="handleCurrentChange" :total="contact.total">
    </el-pagination>
    <!--<el-dialog-->
    <!--:close-on-click-modal= false-->
    <!--class="addCategory-box" title="回复留言" :visible.sync="addCategoryBox">-->
    <!--<el-form :model="form">-->
    <!--<el-form-item label="留言内容：" :label-width="formLabelWidth">-->
    <!--留言内容-->
    <!--</el-form-item>-->
    <!--<el-form-item label="回复：" :label-width="formLabelWidth">-->
    <!--<div class="quill-wrap">-->
    <!--<quill-editor-->
    <!--v-model="content"-->
    <!--ref="myQuillEditor"-->
    <!--:options="editorOption"-->
    <!--&gt;-->
    <!--</quill-editor>-->
    <!--</div>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="addCategoryBox = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="addSubmit">确 定</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
  </main>
</template>
<script>
// import {quillEditor, Quill} from 'vue-quill-editor'
// import {ImageExtend, QuillWatch} from 'quill-image-extend-module'

// Quill.register('modules/ImageExtend', ImageExtend)
export default {
  layout: 'admin',
  scrollToTop: true,
  // components: {quillEditor},
  name: 'contact',
  data() {
    return {
      contact: {},
      multipleSelection: [],
      addCategoryBox: false, // 添加留言弹窗
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '100px'
      // content: '',
      // // 富文本框参数设置
      // editorOption: {
      //   modules: {
      //     ImageExtend: {
      //       loading: true, // 可选参数 是否显示上传进度和提示语
      //       name: 'img', // 图片参数名
      //       size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
      //       action: '', // 服务器地址, 如果action为空，则采用base64插入图片
      //       // response 为一个函数用来获取服务器返回的具体图片地址
      //       // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
      //       // 则 return res.data.url
      //       response: (res) => {
      //         return res
      //       },
      //       headers: (xhr) => {}, // 可选参数 设置请求头部
      //       start: () => {}, // 可选参数 自定义开始上传触发事件
      //       end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
      //       error: () => {}, // 可选参数 自定义网络错误触发的事件
      //       change: (xhr, formData) => {} // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
      //     },
      //     toolbar: {
      //       container: [
      //         [{ 'size': ['small', false, 'large'] }],
      //         ['bold', 'italic'],
      //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      //         ['link', 'image']
      //       ], // container为工具栏，此次引入了全部工具栏，也可自行配置
      //       handlers: {
      //         'image': function () { // 劫持原来的图片点击按钮事件
      //           QuillWatch.emit(this.quill.id)
      //         }
      //       }
      //     }
      //   }
      // }
    }
  },
  head() {
    return {
      title: '留言列表'
    }
  },
  created() {
    this.$api.get(this.$root.urlPath.MJK + '/contact', {}, res => {
      console.log(res.data)
      if (res.data.code === 200) {
        this.contact = res.data.data
      } else {
        this.$message.error(res.data.msg)
      }
    })

  },
  methods: {
    // 切换页面
    handleCurrentChange(e) {
      // e 为当前页码
      // console.log(e)
      this.$api.get(this.$root.urlPath.MJK + '/contact', {
        current_page: e
      }, res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.contact = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })

    },
    // 添加留言
    // addCategory (e) {
    //   this.addCategoryBox = !this.addCategoryBox
    // },
    // // 确定提交添加留言
    // addSubmit () {
    //   this.addCategoryBox = !this.addCategoryBox
    // },
    // 删除留言
    delCategory(id) {
      let ids = []
      if (!id) {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请选择要删除的留言',
            type: 'warning'
          })
          return
        }
        for (let i of this.multipleSelection) {
          ids.push(i._id)
        }
      } else {
        // console.log('删除分类' + id)
        ids.push(id)
      }

      this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.delete(this.$root.urlPath.MJK + '/contact', {
          id: ids
        }, res => {
          console.log(res.data)
          // console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$api.get(this.$root.urlPath.MJK + '/contact', {

            }, res => {
              // console.log(res)
              if (res.data.code === 200) {
                this.contact = res.data.data
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 留言选择
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    // 上传失败
    handleError(err, file, fileList) {
      console.log(err, file, fileList)
    },
    // 移除上传的图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    }
  }
}

</script>
<style scoped>
.category-topBtn {
  margin: 20px 0;
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
}

</style>
<style>
.ql-editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before,
.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before,
.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  position: relative;
  top: -7px;
}

</style>
