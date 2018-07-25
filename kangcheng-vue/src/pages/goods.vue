<template>
  <main class="box">
    <h2>商品管理 <small></small></h2>
    <div class="category-topBtn" style="margin-top: 20px">
      <el-button @click="addCategory()">添加商品</el-button>
      <el-button @click="delCategory()">删除商品</el-button>
    </div>
    <div class="category-topBtn" style="margin-top: 20px">
      <el-button :type="cActive === -1?'primary':''" @click="selectCategory()">全部</el-button>
      <el-button :type="cActive === item._id?'primary':''" @click="selectCategory(item._id)" v-for="item in category" class="category-item" :key="item._id">{{item.name}}</el-button>
    </div>
    <el-table
      stripe
      border
      ref="multipleTable"
      :data="goods.data"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="id"
        width="230">
        <template slot-scope="scope">{{ scope.row._id }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="date"
        label="添加时间"
        width="200">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>

      <el-table-column
        prop="hot"
        label="访问量"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button size="small" @click="addCategory(scope.row._id)">编辑</el-button>
          <el-button type="danger" size="small" @click="delCategory(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="goods.limit"
      @current-change="handleCurrentChange"
      :total="goods.total">
    </el-pagination>

    <el-dialog
      :close-on-click-modal= false
      :fullscreen= true
      class="addCategory-box" title="添加商品" :visible.sync="addCategoryBox">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入商品名称" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option
              v-for="item in category"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品轮播图" :label-width="formLabelWidth">
          <el-upload
            action="https://kc.hcode.xyz/api/upload"
            list-type="picture-card"
            :file-list="fileList"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品详情" :label-width="formLabelWidth">
          <div class="quill-wrap">
            <quill-editor
              v-model="form.content"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCategoryBox = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </main>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  components: { quillEditor },
  layout: 'admin',
  scrollToTop: true,
  name: 'goods',
  data () {
    return {
      cActive: -1, // 默认选中全部
      category: [], // 分类
      goods: [], // 商品列表
      multipleSelection: [],
      addCategoryBox: false, // 添加商品弹窗
      form: {
        name: '', // 商品名字
        id: '', // 商品id
        category: '', // 分类
        img: [], // 图片
        content: '' // 内容
      },
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
        // }
      ], // 图片地址
      formLabelWidth: '100px',
      dialogImageUrl: '',
      dialogVisible: false,
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true, // 可选参数 是否显示上传进度和提示语
            name: 'file', // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: 'https://kc.hcode.xyz/api/upload', // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: res => {
              return res.data.url
            },
            headers: xhr => {}, // 可选参数 设置请求头部
            start: () => {}, // 可选参数 自定义开始上传触发事件
            end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => {}, // 可选参数 自定义网络错误触发的事件
            change: (xhr, formData) => {} // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: {
            container: [
              [{ size: ['small', false, 'large'] }],
              ['bold', 'italic'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image']
            ], // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              image: function () {
                // 劫持原来的图片点击按钮事件
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  created () {
    this.$api.get(this.$root.urlPath.MJK + '/category', {}, res => {
      // console.log(res.data)
      if (res.data.code === 200) {
        this.category = res.data.data.category
      } else {
        this.$message.error(res.data.msg)
      }
    })
    this.$api.get(this.$root.urlPath.MJK + '/goods', {}, res => {
      // console.log(res.data)
      if (res.data.code === 200) {
        this.goods = res.data.data
      } else {
        this.$message.error(res.data.msg)
      }
    })
  },
  head () {
    return {
      title: '商品管理'
    }
  },
  methods: {
    // 根据分类切换
    selectCategory (id) {
      console.log(id)
      this.cActive = id
      this.$api.get(this.$root.urlPath.MJK + '/goods', {
        categoryId: id
      }, res => {
      // console.log(res.data)
        if (res.data.code === 200) {
          this.goods = res.data.data
          this.$message({
            message: '获取成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.msg)
          this.goods = []
        }
      })
    },
    // 切换页面
    handleCurrentChange (e) {
      // e 为当前页码
      // console.log(e)
      this.$api.get(this.$root.urlPath.MJK + '/goods', {
        current_page: e

      }, res => {
      // console.log(res.data)
        if (res.data.code === 200) {
          this.goods = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 添加商品
    addCategory (e) {
      this.addCategoryBox = !this.addCategoryBox
      // console.log(e)
      if (e) {
        // 编辑添加
        // console.log(e)
        let form = this.form
        this.$api.get(this.$root.urlPath.MJK + '/goods/detail', {
          id: e

        }, res => {
          // console.log(res.data)
          if (res.data.code === 200) {
            form.img = res.data.data[0].img
            form.name = res.data.data[0].name
            form.content = res.data.data[0].content
            form.category = res.data.data[0].categoryId
            form.id = e
            this.form = form
            this.fileList = res.data.data[0].img
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        this.form = {
          name: '', // 商品名字
          id: '', // 商品id
          category: '', // 分类
          img: [], // 图片
          content: '' // 内容
        }
        this.fileList = [] // 图片地址
      }
    },
    // 确定提交添加商品
    addSubmit () {
      let id = this.form.id
      let name = this.form.name
      let img = this.form.img
      let content = this.form.content
      let category = this.form.category
      if (!name) {
        this.$message.error('请输入商品名称')
        return
      }
      if (!category) {
        this.$message.error('请选择分类')
        return
      }
      if (!img) {
        this.$message.error('请上传商品轮播图')
        return
      }
      if (!content) {
        this.$message.error('请输入商品详情')
        return
      }
      // console.log(this.form)
      if (id === '') {
        // 添加
        this.$api.post(this.$root.urlPath.MJK + '/goods', {
          name,
          img: JSON.stringify(img),
          content,
          categoryId: category
        }, res => {
          // console.log(res.data)
          if (res.data.code === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.addCategoryBox = !this.addCategoryBox
            this.$api.get(this.$root.urlPath.MJK + '/goods', {}, res => {
              // console.log(res.data)
              if (res.data.code === 200) {
                this.goods = res.data.data
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        // 编辑
        this.$api.put(this.$root.urlPath.MJK + '/goods', {
          id,
          name,
          img: JSON.stringify(img),
          content,
          categoryId: category
        }, res => {
          // console.log(res.data)
          if (res.data.code === 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.addCategoryBox = !this.addCategoryBox

            this.$api.get(this.$root.urlPath.MJK + '/goods', {}, res => {
              // console.log(res.data)
              if (res.data.code === 200) {
                this.goods = res.data.data
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    // 删除商品
    delCategory (id) {
      let ids = []
      if (!id) {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请选择要删除的商品',
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
      console.log(ids)
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.delete(this.$root.urlPath.MJK + '/goods', {
            id: ids
          }, res => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$api.get(this.$root.urlPath.MJK + '/goods', {}, res => {
                console.log(res.data)
                if (res.data.code === 200) {
                  this.goods = res.data.data
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            } else {
              this.$message.error(res.data.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 商品选择
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    // 上传成功
    handleSuccess (response, file, fileList) {
      // console.log(response, file, fileList)
      if (response.code === 200) {
        // console.log(this.fileList)
        let list = {}
        list.name = response.data.url
        list.url = response.data.url
        this.fileList.push(list)
        this.form.img.push(response.data.img)
        // console.warn(list)
        // console.log('---------')
        // console.log('form', this.form.img)
        // console.log('fileList', this.fileList)
      } else {
        this.$message.error(response.msg)
      }
    },
    // 上传失败
    handleError (err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传失败')
    },
    // 移除上传的图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
      let uid = file.uid
      let img = this.form.img
      for (let i = 0; i < img.length; i++) {
        if (img[i].uid === uid) {
          img.splice(i, 1)
        }
      }
      this.form.img = img
    },
    handlePictureCardPreview (file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
    }
  }
}
</script>

<style scoped>
.category-topBtn {
  margin: 20px 0;
}
.category-item {
  margin-bottom: 10px;
}
</style>
<style>
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
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
