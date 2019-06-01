<template lang="pug">
  .kind
    .top
      img.headImg(:src="user.head", @click="modify")
      .kind
        span.lx(v-for="item in kinds", :key="item.id", @click="gotoLx(item.kind)")
          span.text {{item.kind}}
      el-dropdown.dropdown(@command="selectKind")
        el-button 更多
          i.el-icon-arrow-down(class="el-icon--right")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(command="二次元") 二次元
          el-dropdown-item(command="奇幻") 奇幻
          el-dropdown-item(command="武侠") 武侠
          el-dropdown-item(command="悬疑灵异") 悬疑灵异
          el-dropdown-item(command="军事") 军事
          el-dropdown-item(command="现实") 现实
          el-dropdown-item(command="体育") 体育
      el-input.ss-input(v-model="book", type="text", @focus="focus", :class="ssinput", @blur="blur", :placeholder="msg")
      .ssbtn(@click="getSearch")
      el-dropdown.userName(@command="self")
        el-button {{user.name}}
          i.el-icon-arrow-down(class="el-icon--right")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(command="modify") 修改信息
          el-dropdown-item(command="out") 退出登录
    .kindImg
      img(:src="kindImg")
    .week
      .left
        .recommend 本周强推
        .book(v-for="item in recommend", :key="item.id")
          span.sm(@click="goDetail(item.id)") {{item.name}}
          span.zz {{item.author}}
      .mid
        .img-box
          .mid-book(v-for="item in midList", :key="item.id")
            .mid-cover(@click="goDetail(item.id)")
              img(:src="item.cover")
            .mid-sm(:title="item.name", @click="goDetail(item.id)") {{item.name}}
            .mid-js {{item.introduce}}
        .mid-foot
          .xsjx
            img(src="../../images/new.png")
          .foot-left
            .foot-left-list(v-for="item in footLeftList")
              .left-foot-sm(:title="item.name", @click="goDetail(item.id)") {{item.name}} •
              .left-foot-js {{item.introduce}}
          .foot-right
            .foot-right-list(v-for="item in footRightList")
              span.left-foot-sm(:title="item.name", @click="goDetail(item.id)") {{item.name}} •
              span.left-foot-js {{item.introduce}}
      .right
        .right-top
          .bjlj 编辑力荐
          .right-js {{bjlj.introduce}}
          .right-sm(@click="goDetail(bjlj.id)") 《{{bjlj.name}}》
          .right-zz • {{bjlj.author}}
        .right-mid
          .ggw 广告位
          .right-gg(v-for="item in gg", :key="item.id")
            span.gg-text 「{{item.lx}}」 {{item.text}}
        .right-foot
          img(src="../../images/gg.jpg")
    .newbooks
      .newbooks-top {{kind}}新书
      .newbooks-content
        .content-one(v-for="item in newBooks", :key="item.id")
          .content-one-cover
            img(:src="item.cover")
          .content-one-name(@click="goDetail(item.id)") {{item.name}}
          .content-one-js {{item.introduce}}
          .content-one-zz
            img(src="/images/admin/author.png")
            span.zz-name {{item.author}}
            span.gxzs 日更3千+
</template>

<script>
export default {
  data () {
    return {
      bjlj: {},
      newBooks: [],
      footLeftList: [],
      footRightList: [],
      midList: [],
      recommend: [],
      kindImg: '',
      user: Object,
      book: '',
      kind: '',
      ssinput: 'defaul-input',
      msg: '请输入书名、作者',
      gg: [
        {
          id: 1,
          lx: '公告',
          text: '2017白金大神'
        },
        {
          id: 2,
          lx: '资讯',
          text: '网络文学“十二天王”'
        },
        {
          id: 3,
          lx: '公告',
          text: '双倍月票嗨翻黄金周'
        },
        {
          id: 4,
          lx: '游戏',
          text: '稳住，我们能赢'
        }
      ],
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
  mounted () {
    this.getUser()
    this.kind = this.$route.query.kind
    this.kindImg = '/images/kind/' + this.$route.query.kind + '.jpg'
    this.getWeek()
    this.getMid()
    this.getMidFoot()
    this.getnewBooks()
  },
  methods: {
    getWeek () {
      this.$axios({
        url: '/user/novel/search/week',
        method: 'post',
        data: {
          kind: this.kind,
          num: 10,
          start: 0
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
    getMid () {
      this.$axios({
        url: '/user/novel/search/week',
        method: 'post',
        data: {
          kind: this.kind,
          num: 4,
          start: 12
        }
      }).then(res => {
        if (res.data.success) {
          this.midList = res.data.recommend
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    getMidFoot () {
      this.footLeftList = []
      this.footRightList = []
      this.$axios({
        url: '/user/novel/new',
        method: 'post',
        data: {
          kind: this.kind,
          num: 5,
          start: 0
        }
      }).then(res => {
        if (res.data.success) {
          this.footLeftList.push(res.data.new[0])
          this.footLeftList.push(res.data.new[1])
          this.footRightList.push(res.data.new[2])
          this.footRightList.push(res.data.new[3])
          this.bjlj = res.data.new[4]
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    getnewBooks () {
      this.newBooks = []
      this.$axios({
        url: '/user/novel/new',
        method: 'post',
        data: {
          kind: this.kind,
          num: 12,
          start: 6
        }
      }).then(res => {
        if (res.data.success) {
          this.newBooks = res.data.new
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    goDetail (id) {
      this.$router.push({path: '/user/novel', query: {id: id}})
    },
    getUser () {
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
    modify () {
      this.$router.push({path: '/user/modify'})
    },
    gotoLx (kind) {
      this.kind = kind
      if (kind === '首页') {
        this.$router.push({path: '/user/first'})
      } else {
        this.$router.push({path: '/empty', query: {kind: kind}})
      }
    },
    selectKind (val) {
      this.gotoLx(val)
    },
    self (val) {
      if (val === 'modify') {
        this.modify()
      } else if (val === 'out') {
        this.$router.push({path: '/'})
      }
    },
    getSearch () {
      this.$router.push({path: '/user/search', query: {book: this.book}})
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
  .kind{
    .top{
      width: 100%;
      height: 50px;
      background-color: $color-base-user-menu;
      box-shadow: 0 2px 6px rgba(0,0,0,.4);
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
        background-image: url('../../assets/search.png');
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
    .kindImg{
      overflow: hidden;
      width: 100%;
      height: 170px;
      img{
        max-width: 100%;
      }
    }
    .week{
      position: relative;
      width: 80%;
      margin: 50px auto;
      border-top: 1px solid $font-color-label;
      .left{
        width: 20%;
        height: 375px;
        background-color: $bg-color-user-first;
        .recommend{
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 18px;
          color: $font-user-title;
          font-weight: 600;
        }
        .book{
          cursor: pointer;
          position: relative;
          margin: 0 auto;
          width: 90%;
          height: 32px;
          border-top: 1px solid $border-color-line;
          overflow: hidden;
          .sm{
            line-height: 32px;
            position: absolute;
            left: 0px;
            font-size: 14px;
            color: $font-user-title;
          }
          .sm:hover{
            color: $color-base-red;
          }
          .zz{
            line-height: 32px;
            font-size: 12px;
            color: $font-user-detail;
            position: absolute;
            right: 0px;
          }
        }
      }
      .mid{
        width: 50%;
        height: 375px;
        background-color: $bg-color-user-first;
        position: absolute;
        left: 25%;
        top: 0px;
        .img-box{
          width: 90%;
          height: 75%;
          margin: 0 auto;
          border-bottom: 1px solid $border-color-line;
          .mid-book{
            text-align: center;
            width: 25%;
            height: 100%;
            overflow: hidden;
            float: left;
            .mid-cover{
              margin: 0 auto;
              position: relative;
              cursor: pointer;
              width: 113px;
              height: 143px;
              margin-top: 5%;
              overflow: hidden;
              background-image: url('../../images/book_bottom.png');
              background-repeat: no-repeat;
              background-position: 1px 1px;
              img{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 105px;
                height: 138px;
                max-width: 100%;
                transition: all 0.5s;
              }
            }
            .mid-sm{
              margin: 0 auto;
              width: 88%;
              overflow: hidden;
              margin-top: 10px;
              cursor: pointer;
              text-align: center;
              height: 20px;
              line-height: 20px;
              font-size: 16px;
              color: $font-color-base;
              font-weight: 600;
            }
            .mid-sm:hover{
              color: $color-base-red;
            }
            .mid-js{
              margin: 0 auto;
              text-align: center;
              overflow: hidden;
              width: 88%;
              font-size: 12px;
              color: $font-user-kind;
              line-height: 30px;
              height: 30px;
            }
            .mid-cover:hover img{
              transform: rotateY(30deg);
            }
          }
        }
        .mid-foot{
          width: 90%;
          margin: 0 auto;
          position: relative;
          .xsjx{
            margin-top: 10px;
            width: 60px;
            height: 60px;
            overflow: hidden;
            float: left;
          }
          .foot-left{
            overflow: hidden;
            margin-top: 10px;
            width: 40%;
            .foot-left-list{
              position: relative;
              text-align: left;
              width: 100%;
              height: 40px;
            }
          }
          .foot-right{
            overflow: hidden;
            width: 40%;
            position: absolute;
            right: 0px;
            top: 0px;
            .foot-right-list{
              position: relative;
              width: 100%;
              height: 40px;
            }
          }
          .left-foot-sm{
            overflow: hidden;
            cursor: pointer;
            width: 30%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            position: absolute;
            left: 0px;
          }
          .left-foot-sm:hover{
            color: $color-base-red;
          }
          .left-foot-js{
            overflow: hidden;
            position: absolute;
            left: 30%;
            width: 70%;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
          }
        }
      }
      .right{
        width: 20%;
        height: 375px;
        background-color: $bg-color-user-first;
        position: absolute;
        left: 80%;
        top: 0px;
      }
      .right-top{
        position: relative;
        overflow: hidden;
        width: 90%;
        height: 100px;
        margin: 0 auto;
        border-bottom: 1px solid $border-color-line;
        .bjlj{
          width: 60px;
          height: 20px;
          background-color: $bg-user-bjlj;
          position: absolute;
          left: 0px;
          top: 20px;
          border-radius: 2px;
          font-size: 12px;
          line-height: 20px;
          color: $button-base-color;
        }
        .right-js{
          overflow: hidden;
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          position: absolute;
          left: 0px;
          top: 40px;
        }
        .right-sm{
          cursor: pointer;
          overflow: hidden;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          position: absolute;
          left: 0px;
          top: 70px;
          color: $font-user-sm;
        }
        .right-sm:hover{
          color: $color-base-red;
        }
        .right-zz{
          width: 60px;
          height: 20px;
          line-height: 20px;
          position: absolute;
          right: 0px;
          top: 70px;
          overflow: hidden;
          font-size: 12px;
          color: $font-user-detail;
        }
      }
      .right-mid{
        width: 90%;
        height: 160px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        .ggw{
          width: 60px;
          height: 20px;
          background-color: $bg-user-gg;
          position: relative;
          left: 0px;
          top: 20px;
          margin-bottom: 30px;
          border-radius: 2px;
          font-size: 12px;
          line-height: 20px;
          color: $button-base-color;
        }
        .right-gg{
          cursor: pointer;
          overflow: hidden;
          width: 100%;
          height: 20px;
          font-size: 14px;
          text-align: left;
          color: $font-user-title;
          margin-top: 5px;
        }
        .right-gg:hover{
          color: $color-base-red;
        }
      }
      .right-foot{
        overflow: hidden;
        width: 90%;
        height: 100px;
        position: relative;
        left: 0px;
        bottom: 0px;
        text-align: left;
        margin: 0 auto;
        img{
          cursor: pointer;
          max-width: 100%;
        }
      }
    }
    .newbooks{
      width: 80%;
      height: 500px;
      margin: 0 auto;
      position: relative;
      .newbooks-top{
        font-size: 18px;
        font-weight: 600;
        text-align: left;
        width: 100%;
        height: 30px;
        line-height: 26px;
        padding-bottom: 4px;
        border-bottom: 1px solid $font-color-label;
      }
      .newbooks-content{
        width: 100%;
        height: 450px;
        position: relative;
        text-align: left;
        .content-one{
          position: relative;
          display: inline-block;
          width: 25%;
          height: 150px;
          border-bottom: 1px solid $border-color-line;
          .content-one-cover{
            overflow: hidden;
            width: 72px;
            height: 96px;
            position: absolute;
            top: 27px;
            left: 0px;
            box-shadow: 0 1px 6px rgba(0,0,0,.35), 0 0 5px #f9f2e9 inset;
            img{
              cursor: pointer;
              max-height: 96px;
              transition: all 0.5s;
            }
          }
          .content-one-cover:hover img{
            transform: scale(1.2);
          }
          .content-one-name{
            cursor: pointer;
            overflow: hidden;
            width: 60%;
            height: 25px;
            line-height: 25px;
            text-align: left;
            font-size: 16px;
            color: $font-user-first-bjlj;
            position: absolute;
            right: 10%;
            top: 27px;
          }
          .content-one-name:hover{
            color: $color-base-red;
          }
          .content-one-js{
            overflow: hidden;
            font-size: 12px;
            color: $font-color-label;
            width: 60%;
            height: 40px;
            line-height: 20px;
            text-align: left;
            position: absolute;
            right: 10%;
            top: 55px;
          }
          .content-one-zz{
            width: 60%;
            height: 20px;
            position: absolute;
            right: 10%;
            top: 100px;
            img{
              position: absolute;
              left: 0;
              top: 0;
              width: 20px;
              height: 20px;
            }
            .zz-name{
              display: inline-block;
              width: 60%;
              height: 20px;
              text-align: left;
              font-size: 12px;
              line-height: 20px;
              color: $font-user-detail;
              position: absolute;
              top: 0;
              left: 22px;
            }
            .gxzs{
              font-size: 12px;
              text-align: center;
              height: 20px;
              width: 70px;
              position: absolute;
              right: 0;
              top: 0;
              border: 1px solid $color-base-red;
              color: $color-base-red;
            }
          }
        }
      }
    }
  }
</style>
