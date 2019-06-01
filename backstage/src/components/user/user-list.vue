<template lang="pug">
  .user-list
    .title
      el-breadcrumb.breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item(:to="{ path: '/admin/user/list' }") 用户管理
        el-breadcrumb-item 用户列表
    .search
      el-button.del(type="primary", icon="el-icon-delete", @click="plDelete", round) 批量删除
      .author
        span.zz 用户名
        el-input.zzinput(type="text", v-model="userName", prefix-icon="el-icon-search", placeholder="请输入用户名")
      el-button.ssbtn(type="primary", icon="el-icon-search", @click="search", round) 搜索
    .list
      el-table(ref="user", :data="userList", tooltip-effect="dark", style="width: 100%", @selection-change="selecte")
        el-table-column(type="selection", min-width="5%")
        el-table-column(label="用户名", min-width="20%")
          template(slot-scope="scope")
            .cover
              img.list-book-cover(:src="scope.row.head")
            span.list-book-name {{ scope.row.name }}
        el-table-column(label="性别", min-width="10%")
          template(slot-scope="scope")
            span {{ scope.row.sex | sexFilter }}
        el-table-column(label="个性签名", min-width="30%", prop="introduce")
        el-table-column(label="电话", min-width="20%", prop="phone")
        el-table-column(label="操作", min-width="15%")
          template(slot-scope="scope")
            el-button(type="primary", icon="el-icon-edit", circle, @click="modifyUser(scope.row)")
            el-button(type="danger", icon="el-icon-delete", circle, @click="deleteUser(scope.row)")
    .page
      el-pagination(
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total")
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      isSearch: false,
      total: 1,
      pageNum: 1,
      pageSize: 5,
      delete: [],
      userList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.isSearch = false
      this.$axios({
        url: '/admin/user/list',
        method: 'post',
        data: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then(res => {
        if (res.data.success) {
          this.userList = res.data.userList
          this.total = res.data.total
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
        return false
      })
    },
    search () {
      this.isSearch = true
      if (!this.userName) {
        this.init()
      } else {
        this.$axios({
          url: '/admin/user/search',
          method: 'post',
          data: {
            name: this.userName,
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        }).then(res => {
          if (res.data.success) {
            this.userList = res.data.userList
            this.total = res.data.total
          } else {
            this.$alert(res.data.message)
          }
        }).catch(err => {
          this.$alert(err.statusText)
          return false
        })
      }
    },
    plDelete () {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.delete.length) {
          this.$axios({
            url: '/admin/user/del',
            method: 'post',
            data: {
              ids: this.delete
            }
          }).then(res => {
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.init()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          }).catch(err => {
            this.$alert(err.statusText)
            return false
          })
        } else {
          this.$message({
            type: 'error',
            message: '请至少选择一位用户'
          })
        }
      }).catch(() => {
        return false
      })
    },
    selecte (val) {
      this.delete = []
      val.forEach(element => {
        this.delete.push(element.id)
      })
    },
    modifyUser (row) {
      this.$router.push({path: '/admin/user/modify', query: { user: row }})
    },
    deleteUser (row) {
      let array = []
      array.push(row.id)
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: '/admin/user/del',
          method: 'post',
          data: {
            ids: array
          }
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init()
          } else {
            this.$alert(res.data.message)
          }
        }).catch(err => {
          this.$alert(err.statusText)
          return false
        })
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      if (this.isSearch) {
        this.search()
      } else {
        this.init()
      }
    }
  },
  filters: {
    sexFilter: (value) => {
      if (value) {
        return '男'
      } else {
        return '女'
      }
    }
  }
}
</script>

<style lang="scss">
  .user-list{
    font-size: 14px;
    width: 100%;
    height: 100%;
    .title{
      width: 100%;
      height: 50px;
      border-bottom: 1px solid $color-base-gray;
      .breadcrumb{
        line-height: 50px;
        font-size: 14px;
      }
    }
    .search{
      width: 100%;
      height: 50px;
      position: relative;
      border-bottom: 1px solid $color-base-gray;
      .del{
        position: absolute;
        top: 5px;
        left: 10px;
      }
      .author{
        width: 300px;
        position: absolute;
        right: 125px;
        .zz{
          display: inline-block;
          position: absolute;
          left: 0;
          width: 50px;
          line-height: 50px;
          height: 50px;
        }
        .zzinput{
          position: absolute;
          left: 50px;
          top: 5px;
          width: 200px;
          height: 40px;
        }
      }
      .ssbtn{
        position: absolute;
        right: 50px;
        top: 5px;
      }
    }
    .list{
      width: 100%;
      position: relative;
      .cell{
        text-align: center;
      }
      .number{
        font-size: 20px;
        font-weight: 600;
      }
      .numText{
        color: $font-color-label;
        font-size: 12px;
      }
      .cover{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        box-shadow: 5px 5px 5px $font-color-label;
        .list-book-cover{
          width: 100%;
          height: 100%;
          transition: all 1s;
        }
        .list-book-cover:hover{
          transform: scale(1.2, 1.2);
        }
      }
      .list-book-name{
        display: block;
      }
    }
    .page{
      text-align: center;
    }
  }
</style>
