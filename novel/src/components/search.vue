<template lang="pug">
  .search
    .top
      img.headImg(:src="user.head", @click="modify")
      .kind
        span.lx(v-for="item in kinds", :key="item.id", @click="gotoLx(item.kind)")
          span.text {{item.kind}}
      el-dropdown.dropdown(@command="selectKind")
        el-button 更多
          i.el-icon-arrow-down(class="el-icon--right")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(command="all") 全部作品
          el-dropdown-item(command="二次元") 二次元
          el-dropdown-item(command="奇幻") 奇幻
          el-dropdown-item(command="武侠") 武侠
          el-dropdown-item(command="悬疑灵异") 悬疑灵异
          el-dropdown-item(command="军事") 军事
          el-dropdown-item(command="现实") 现实
          el-dropdown-item(command="体育") 体育
      el-input.ss-input(v-model="book", type="text", @focus="focus", :class="ssinput", @blur="blur", :placeholder="msg")
      .ssbtn(@click="getNovel")
      el-dropdown.userName(@command="self")
        el-button {{user.name}}
          i.el-icon-arrow-down(class="el-icon--right")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(command="modify") 修改信息
          el-dropdown-item(command="out") 退出登录
    .tp
      img(src="/images/kind/search.png")
    .list
      .novel(v-for="item in novelList", :key="item.id")
        .cover(@click="goNovel(item.id)")
          img(:src="item.cover")
        .title(@click="goNovel(item.id)") {{item.name}}
        .detail
          img(src="/images/admin/author.png")
          span.zz {{item.author}}
          span.one |
          span.kind {{item.kind}}
          span.two |
          span.finish {{item.finish | complete}}
        .introduce {{item.introduce}}
        .right-info
          .info
            .word {{item.wordNum}}万 总字数
            .read {{item.readNum}}万 总阅读
          el-button(type="danger", @click="goNovel(item.id)") 书籍详情
      .page
        el-pagination(
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total")
    .right
      .title 本周强推
      .week(v-for="item in recommend", :key="item.id")
        .book(@click="goNovel(item.id)")
          img(:src="item.cover")
        .sm(@click="goNovel(item.id)") {{item.name}}
        .detail
          img(src="/images/admin/author.png")
          span.zz {{item.author}}
        .js {{item.introduce}}
</template>

<script>
export default {
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 1,
      book: '',
      user: Object,
      msg: '',
      ssinput: 'defaul-input',
      recommend: [],
      novelList: [],
      kinds: [
        {
          id: 'xh',
          kind: '玄幻'
        },
        {
          id: 'ds',
          kind: '都市'
        },
        {
          id: 'xx',
          kind: '仙侠'
        },
        {
          id: 'kh',
          kind: '科幻'
        },
        {
          id: 'yx',
          kind: '游戏'
        },
        {
          id: 'ls',
          kind: '历史'
        },
        {
          id: 'first',
          kind: '首页'
        }
      ]
    }
  },
  filters: {
    complete: function (val) {
      if (val === 1) {
        return '完结'
      } else {
        return '连载'
      }
    }
  },
  mounted () {
    this.init()
    this.book = this.$route.query.book
    if (!this.book) {
      this.msg = '请输入书名、作者'
    }
    this.getNovel()
    this.getRecommend()
  },
  methods: {
    init () {
      this.$axios({
        url: '/user/select',
        method: 'post',
        data: {
          id: this.$sessionStorage.getItem('id')
        }
      }).then(res => {
        if (res.data.success) {
          this.user = res.data.user
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    getNovel () {
      this.$axios({
        url: 'user/novel/list/search',
        method: 'post',
        data: {
          book: this.book,
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
    getRecommend () {
      this.$axios({
        url: '/user/novel/search/week',
        method: 'post',
        data: {
          kind: 'all',
          num: 10,
          start: 10
        }
      }).then(res => {
        if (res.data.success) {
          this.recommend = res.data.recommend
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getNovel()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getNovel()
    },
    gotoLx (kind) {
      if (kind === '首页') {
        this.$router.push({path: '/user/first'})
      } else {
        this.$router.push({path: '/user/kind', query: {kind: kind}})
      }
    },
    goNovel (id) {
      this.$router.push({path: '/user/novel', query: {id: id}})
    },
    selectKind (val) {
      if (val === 'all') {
        this.$axios({
          url: '/user/novel/list/search',
          method: 'post',
          data: {
            book: '',
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        }).then(res => {
          if (res.data.success) {
            this.novelList = res.data.novelList
            this.total = res.data.total
          } else {
            this.$alert(res.data.message)
            return false
          }
        }).catch(err => {
          this.$alert(err.statusText)
          return false
        })
      } else {
        this.gotoLx(val)
      }
    },
    self (val) {
      if (val === 'modify') {
        this.modify()
      } else if (val === 'out') {
        this.$router.push({path: '/'})
      }
    },
    modify () {
      this.$router.push({path: '/user/modify'})
    },
    focus () {
      this.ssinput = 'active-input'
    },
    blur () {
      this.ssinput = 'defaul-input'
    }
  }
}
</script>

<style lang="scss">
  .search{
    position: relative;
    li{
      list-style:none;
    }
    .top{
      width: 100%;
      height: 50px;
      background-color: $color-base-user-menu;
      box-shadow: 0 2px 6px rgba(0,0,0,.4);
      position: relative;
      .headImg{
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        left: 15%;
        top: 0px;
      }
      .kind{
        width: 35%;
        height: 50px;
        position: absolute;
        left: 18%;
        top: 0px;
        .lx{
          width: 14%;
          height: 50px;
          display: inline-block;
          cursor: pointer;
          .text{
            font-size: 14px;
            color: $font-color-placeholder;
            line-height: 50px;
          }
        }
        .lx:hover{
          background-color: #262626;
        }
        .lx:hover .text{
          color: $button-base-color;
        }
      }
      .dropdown{
        position: absolute;
        left: 53%;
        top: 0px;
        .el-button{
          height: 50px;
          background-color: $color-base-user-menu;
          border: none;
          color: $font-color-placeholder;
        }
      }
      .dropdown:hover .el-button{
        color: $button-base-color;
        background-color: #262626;
      }
      .ss-input{
        width: 12%;
        height: 40px;
        position: absolute;
        left: 64%;
        top: 5px;
        .el-input__inner{
          padding: 0px;
          border-radius: 0px;
          border: none;
          background-color: $color-base-user-menu;
        }
      }
      .defaul-input{
        .el-input__inner{
          color: $font-color-placeholder;
          border-bottom: 1px solid $font-color-placeholder;
        }
      }
      .active-input{
        .el-input__inner{
          color: $button-base-color;
          border-bottom: 2px solid $button-base-color;
        }
      }
      .ssbtn{
        cursor: pointer;
        width: 40px;
        height: 40px;
        background-image: url('../assets/search.png');
        background-repeat: no-repeat;
        background-position: 6px 10px;
        position: absolute;
        top: 5px;
        left: 76%;
      }
      .userName{
        width: 80px;
        height: 50px;
        position: absolute;
        right: 15%;
        top: 0px;
        .el-button{
          width: 100%;
          height: 50px;
          position: absolute;
          top: 0px;
          left: 0px;
          border: none;
          background-color: $color-base-user-menu;
          color: $font-color-placeholder;
        }
      }
      .userName:hover .el-button{
        color: $button-base-color;
        background-color: #262626;
      }
    }
    .tp{
      display: block;
      position: relative;
      width: 100%;
      height: 170px;
      overflow: hidden;
      img{
        max-width: 100%;
      }
    }
    .list{
      width: 45%;
      position: relative;
      top: 50px;
      left: 15%;
      background-color: $bg-color-user-two;
      .novel{
        width: 100%;
        height: 180px;
        border-top: 1px solid $border-color-line;
        .cover{
          cursor: pointer;
          width: 102px;
          height: 136px;
          position: relative;
          left: 0px;
          top: 22px;
          overflow: hidden;
          box-shadow: 0 1px 6px rgba(0,0,0,.2);
          img{
            width: 100%;
            height: 100%;
            transition: all 0.5s;
          }
        }
        .cover:hover img{
          transform: scale(1.2);
        }
        .title{
          cursor: pointer;
          font-size: 18px;
          color: $font-user-title;
          font-weight: 500;
          overflow: hidden;
          width: 50%;
          height: 20%;
          position: relative;
          left: 118px;
          top: -105px;
          text-align: left;
        }
        .title:hover{
          color: $color-base-red;
        }
        .detail{
          line-height: 27px;
          color: $font-user-detail;
          width: 50%;
          height: 14%;
          overflow: hidden;
          position: relative;
          left: 118px;
          top: -105px;
          text-align: left;
          font-size: 14px;
          img{
            width: 17px;
            height: 17px;
            position: relative;
            left: 0px;
            top: 4px;
          }
          .zz{
            position: relative;
            left: 5px;
          }
          .kind{
            position: relative;
            left: 20px;
          }
          .finish{
            position: relative;
            left: 40px;
          }
          .one{
            position: relative;
            left: 10px;
          }
          .two{
            position: relative;
            left: 30px;
          }
        }
        .introduce{
          width: 50%;
          height: 40%;
          position: relative;
          left: 118px;
          top: -100px;
          text-align: left;
          line-height: 24px;
          font-size: 15px;
          color: $font-color-label;
          overflow: hidden;
        }
        .right-info{
          width: 30%;
          height: 80%;
          position: relative;
          left: 70%;
          top: -253px;
          text-align: right;
          .info{
            width: 100%;
            height: 50%;
            text-align: right;
            color: $font-color-label;
            font-size: 14px;
            position: relative;
            .word{
              margin-top: 10px;
            }
            .read{
              margin-top: 10px;
            }
          }
          .el-button{
            position: relative;
            top: 25px;
          }
        }
      }
      .page{
        position: relative;
        top: 50px;
      }
    }
    .right{
      width: 20%;
      position: absolute;
      right: 15%;
      top: 270px;
      background-color: $bg-color-user-two;
      .title{
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        font-weight: 600;
        text-align: left;
        border-bottom: 1px solid $font-color-label;
      }
      .week{
        height: 130px;
        width: 100%;
        border-bottom: 1px solid $border-color-line;
        .book{
          cursor: pointer;
          overflow: hidden;
          width: 72px;
          height: 96px;
          position: relative;
          left: 0px;
          top: 17px;
          box-shadow: 0 0 6px rgba(0,0,0,.35);
          img{
            width: 100%;
            height: 100%;
            transition: all 0.5s;
          }
        }
        .book:hover img{
            transform: scale(1.2);
        }
        .sm{
          cursor: pointer;
          width: 60%;
          height: 20px;
          font-size: 16px;
          color: $font-user-title;
          position: relative;
          left: 85px;
          top: -80px;
          text-align: left;
          line-height: 20px;
        }
        .sm:hover{
          color: $color-base-red;
        }
        .detail{
          width: 60%;
          height: 20px;
          position: relative;
          left: 85px;
          top: -80px;
          text-align: left;
          img{
            width: 14px;
            height: 14px;
            position: relative;
            left: 0px;
            top: 3px;
          }
          .zz{
            color: $font-user-detail;
            font-size: 14px;
            margin-left: 6px;
          }
        }
        .js{
          overflow: hidden;
          text-align: left;
          width: 60%;
          height: 40px;
          font-size: 14px;
          line-height: 20px;
          color: $font-color-label;
          position: relative;
          left: 85px;
          top: -80px;
        }
      }
    }
  }
</style>
