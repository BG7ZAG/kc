<template>
  <main class="box">
    <h2>分类管理</h2>
    <div class="category-topBtn" style="margin-top: 20px">
      <el-button @click="addCategory()">添加分类</el-button>
      <el-button @click="delCategory()">删除分类</el-button>
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
        width="220">
        <template slot-scope="scope">{{ scope.row._id }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="imgPath"
        label="分类图片"
        width="200">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>

      <el-table-column
        prop="goods_num"
        label="商品数量"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button size="small" @click="addCategory(scope.row._id, scope.row.img, scope.row.name)">编辑</el-button>
          <el-button type="danger" size="small" @click="delCategory(scope.row._id, scope.row.goods_num)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination-->
      <!--background-->
      <!--layout="prev, pager, next"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="category.current_page"-->
      <!--:total="category.total"-->
      <!--:page-size="category.limit">-->
    <!--</el-pagination>-->

    <el-dialog
      :close-on-click-modal= false
      class="addCategory-box" title="添加分类" :visible.sync="addCategoryBox">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入分类名称" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://kc.hcode.xyz/api/upload"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
export default {
  name: 'category',
  data () {
    return {
      tableData3: [],
      multipleSelection: [],
      addCategoryBox: false, // 添加分类弹窗
      form: {
        name: '',
        img: '',
        id: ''
      },
      formLabelWidth: '100px',
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
        // }
      ]
    }
  },
  created () {
    this.$api.get(this.$root.urlPath.MJK + '/category', {}, res => {
      // console.log(res.data)
      if (res.data.code === 200) {
        this.category = res.data.data
        this.tableData3 = res.data.data.category
      } else {
        this.$message.error(res.data.msg)
      }
    })
  },
  head () {
    return {
      title: '分类管理'
    }
  },
  methods: {
    // 切换页面
    handleCurrentChange (e) {
      // e 为当前页码
      this.$api.get(this.$root.urlPath.MJK + '/category', {
        current_page: e

      }, res => {
      // console.log(res.data)
        if (res.data.code === 200) {
          this.tableData3 = res.data.data.category
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 添加分类
    addCategory (id, img, n) {
      if (id) {
        let data = {
          name: img,
          url: '../' + img
        }
        let list = [data]
        this.fileList = list
        let i = img.slice(3)
        let form = this.form
        form.name = n
        form.img = i
        form.id = id
        this.form = form
      } else {
        let list = []
        this.fileList = list
        this.form = {
          name: '',
          img: '',
          id: ''
        }
      }

      this.addCategoryBox = !this.addCategoryBox
    },
    // 确定提交添加分类
    addSubmit () {
      let name = this.form.name
      let img = this.form.img
      let id = this.form.id
      let data = {
        img: img,
        name: name
      }
      if (name === '') {
        this.$message({
          message: '请输入分类名称',
          type: 'warning'
        })
        return
      }
      if (img === '') {
        this.$message({
          message: '请上传分类图片',
          type: 'warning'
        })
        return
      }
      if (id) {
        data.id = id
      }
      this.$api.post(this.$root.urlPath.MJK + '/addCategory', data, res => {
      // console.log(res.data)
        if (res.data.code === 200) {
          this.addCategoryBox = !this.addCategoryBox
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.$api.get(this.$root.urlPath.MJK + '/category', {}, res => {
            // console.log(res.data)
            if (res.data.code === 200) {
              this.tableData3 = res.data.data.category
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 删除分类
    delCategory (id, num) {
      let ids = []
      if (!id) {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请选择要删除的分类',
            type: 'warning'
          })
          return
        }
        for (let i of this.multipleSelection) {
          if (i.goods_num !== 0) {
            this.$message({
              message: '选中分类有商品不能删除',
              type: 'warning'
            })
            return
          }
          ids.push(i._id)
        }
      } else {
        // console.log('删除分类' + id)
        if (num > 0) {
          this.$message({
            message: '该分类有商品不能删除',
            type: 'warning'
          })
          return
        }
        ids.push(id)
      }

      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.delete(this.$root.urlPath.MJK + '/delCategory', {
            id: ids
          }, res => {
            // console.log(res.data)
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$api.get(this.$root.urlPath.MJK + '/category', {}, res => {
                // console.log(res.data)
                if (res.data.code === 200) {
                  this.tableData3 = res.data.data.category
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
    // 分类选择
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    // 上传成功
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      if (response.code === 200) {
        let form = this.form
        form.img = response.data.img
        this.form = form
        let list = [
          {
            name: response.data.url,
            url: response.data.url
          }
        ]
        this.fileList = list
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
