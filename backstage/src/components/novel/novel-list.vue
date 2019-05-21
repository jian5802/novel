<template lang="pug">
  .novel-list
    .title
      el-breadcrumb.breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item(:to="{ path: '/admin/novel/list' }") 小说管理
        el-breadcrumb-item 小说列表
    .search
      el-button.del(type="primary", icon="el-icon-delete", @click="plDelete", round) 批量删除
      .kind
        el-dropdown.dropdwon(@command="drop")
          el-button(type="primary", round) 类型
            i.el-icon-arrow-down(class="el-icon--right")
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(command="玄幻") 玄幻
            el-dropdown-item(command="奇幻") 奇幻
            el-dropdown-item(command="武侠") 武侠
            el-dropdown-item(command="仙侠") 仙侠
            el-dropdown-item(command="都市") 都市
            el-dropdown-item(command="现实") 现实
            el-dropdown-item(command="军事") 军事
            el-dropdown-item(command="历史") 历史
            el-dropdown-item(command="游戏") 游戏
            el-dropdown-item(command="体育") 体育
            el-dropdown-item(command="科幻") 科幻
            el-dropdown-item(command="悬疑灵异") 悬疑灵异
            el-dropdown-item(command="女生网") 女生网
            el-dropdown-item(command="二次元") 二次元
      .book
        span.sm 书名
        el-input.sminput(type="text", v-model="book", placeholder="请输入书名", prefix-icon="el-icon-search")
      .author
        span.zz 作者
        el-input.zzinput(type="text", v-model="author", prefix-icon="el-icon-search", placeholder="请输入作者")
      el-button.ssbtn(type="primary", icon="el-icon-search", @click="search", round) 搜索
    .list
      el-table(ref="novels", :data="novelList", tooltip-effect="dark", style="width: 100%", @selection-change="selecte")
        el-table-column(type="selection", min-width="5%")
        el-table-column(label="书名", min-width="20%")
          template(slot-scope="scope")
            .cover
              img.list-book-cover(:src="scope.row.cover")
            span.list-book-name {{ scope.row.name }}
        el-table-column(label="作者", min-width="5%", prop="author")
        el-table-column(label="简介", min-width="30%", prop="introduce")
        el-table-column(label="类型", min-width="10%", prop="kind")
        el-table-column(label="字数", min-width="10%")
          template(slot-scope="scope")
            span.number {{scope.row.wordNum}}
            span.numText 万字
        el-table-column(label="阅读量", min-width="10%")
          template(slot-scope="scope")
            span.number {{scope.row.readNum}}
            span.numText 万阅文总点击
        el-table-column(label="操作", min-width="10%")
          template(slot-scope="scope")
            el-button(type="primary", icon="el-icon-edit", circle, @click="modifyNovel(scope.row)")
            el-button(type="danger", icon="el-icon-delete", circle, @click="deleteNovel(scope.row)")
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
      book: '',
      author: '',
      total: 1,
      pageNum: 1,
      pageSize: 5,
      novelList: [],
      delete: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$axios({
        url: '/admin/novel/list',
        method: 'post',
        data: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then(res => {
        if (res.data.success) {
          this.novelList = res.data.novelList
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
      this.pageNum = 1
      if (!this.book && !this.author) {
        this.init()
      } else {
        this.$axios({
          url: '/admin/novel/search',
          method: 'post',
          data: {
            name: this.book,
            author: this.author,
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        }).then(res => {
          if (res.data.success) {
            this.novelList = res.data.novelList
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
            url: '/admin/novel/del',
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
            message: '请至少选择一本小说'
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
    modifyNovel (row) {
      this.$router.push({path: '/admin/novel/modify', query: { book: row }})
    },
    deleteNovel (row) {
      let array = []
      array.push(row.id)
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: '/admin/novel/del',
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
    drop (kind) {
      this.pageNum = 1
      this.$axios({
        url: '/admin/novel/kind',
        method: 'post',
        data: {
          kind: kind,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res.data.success) {
          this.novelList = res.data.novelList
          this.total = res.data.total
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
        return false
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.init()
    }
  }
}
</script>

<style lang="scss">
  .novel-list{
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
      .kind{
        width: 100px;
        height: 50px;
        position: absolute;
        right: 750px;
        .dropdwon{
          position: absolute;
          right: 0;
          top: 5px;
        }
      }
      .book{
        width: 300px;
        height: 50px;
        position: absolute;
        right: 400px;
        .sm{
          display: inline-block;
          position: absolute;
          left: 0;
          width: 50px;
          line-height: 50px;
          height: 50px;
        }
        .sminput{
          position: absolute;
          left: 50px;
          top: 5px;
          width: 200px;
          height: 40px;
        }
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
        height: 100px;
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
  }
</style>
