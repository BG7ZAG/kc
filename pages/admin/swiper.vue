<template>
  <main class="box">
    <h2>轮播管理</h2>
    <div class="category-topBtn" style="margin-top: 20px">
      <el-button @click="addCategory()">添加轮播</el-button>
      <el-button @click="delCategory()">删除轮播</el-button>
    </div>
    <el-table
      stripe
      border
      ref="multipleTable"
      :data="tableData3"
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
        label="轮播名称	"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="img"
        label="轮播图片">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button size="small" @click="addCategory(scope.row._id, scope.row.name, scope.row.url,scope.row.img)">编辑</el-button>
          <el-button type="danger" size="small" @click="delCategory(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :close-on-click-modal= false
      class="addCategory-box" title="添加轮播" :visible.sync="addCategoryBox">
      <el-form :model="form">
        <el-form-item label="轮播名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入轮播名称" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="轮播图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="/api/upload"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,建议尺寸390*150比例</div>
          </el-upload>
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
  import axios from '../../plugins/axios'

export default {
    scrollToTop: true,
    layout: 'admin',
    name: 'swiper',
    data () {
      return {
        tableData3: [], // 列表数据
        multipleSelection: [],
        addCategoryBox: false, // 添加轮播弹窗
        form: {
          name: '',
          img: '',
          id: '',
          url: ''
        },
        formLabelWidth: '100px',
        fileList: []
      }
    },
    created () {
      axios.get('/api/swiper').then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.tableData3 = res.data.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    head () {
      return {
        title: '轮播管理'
      }
    },
    methods: {
      // 添加轮播
      addCategory (e, n, u, i) {
        this.addCategoryBox = !this.addCategoryBox
        if (!e) {
          this.form.id = ''
          this.form.name = ''
          this.form.url = ''
          this.form.img = ''
          this.fileList = []
        } else {
          this.form = {
            id: e,
            name: n,
            url: u,
            img: i
          }
          this.fileList = [
            {
              name: i,
              url: u
            }
          ]
        }
      },
      // 确定提交添加轮播
      addSubmit () {
        let name = this.form.name
        let img = this.form.img
        let id = this.form.id
        if (id === '') {
          axios.post('/api/swiper', {
            name,
            img
          }).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            // console.log(res.data)
            axios.get('/api/swiper').then(res => {
              console.log(res.data)
              if (res.data.code === 200) {
                this.tableData3 = res.data.data
                this.addCategoryBox = !this.addCategoryBox
              } else {
                this.$message.error(res.msg)
              }
            })
          })
        } else {
          axios.put('/api/swiper', {
            name,
            img,
            id
          }).then(res => {
            // console.log(res.data)
            if (res.data.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              axios.get('/api/swiper').then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                  this.tableData3 = res.data.data
                  this.addCategoryBox = !this.addCategoryBox
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      },
      // 删除轮播
      delCategory (id) {
        let ids = []
        if (!id) {
          if (this.multipleSelection.length === 0) {
            this.$message({
              message: '请选择要删除的轮播',
              type: 'warning'
            })
            return
          }
          for (let i of this.multipleSelection) {
            ids.push(i._id)
          }
        } else {
          console.log('删除轮播' + id)
          ids.push(id)
        }
        this.$confirm('此操作将永久删除该轮播, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete('/api/swiper', {
            params: {
              id: ids
            }
          }).then(res => {
            // console.log(res)
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              axios.get('/api/swiper').then(res => {
                // console.log(res)
                if (res.data.code === 200) {
                  this.tableData3 = res.data.data
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
      // 轮播选择
      handleSelectionChange (val) {
        this.multipleSelection = val
        console.log(val)
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
  .category-topBtn {
    margin: 20px 0;
  }
</style>
