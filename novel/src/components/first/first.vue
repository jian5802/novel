<template lang="pug">
  .first
    img.topImg(src="../../assets/top.png")
    .information
      .head
        img.headImg(:src="user.head", @click="modify")
        span.introduce {{user.introduce}}
      el-input.search(v-model="book", type="text", placeholder="请输入书名")
      .ssbtn(@click="search")
      el-dropdown.name(@command="select")
        el-button {{user.name}}
          i.el-icon-arrow-down(class="el-icon--right")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(command="modify") 修改信息
          el-dropdown-item(command="out") 退出登录
    .left
      .one
        .xh
          .icon
          span.lx 玄幻
          span.num {{kindNum.xh}}
        .qh
          .icon
          span.lx 奇幻
          span.num {{kindNum.qh}}
      .two
        .wx
          .icon
          span.lx 武侠
          span.num {{kindNum.wx}}
        .xx
          .icon
          span.lx 仙侠
          span.num {{kindNum.xx}}
      .three
        .ds
          .icon
          span.lx 都市
          span.num {{kindNum.ds}}
        .xs
          .icon
          span.lx 现实
          span.num {{kindNum.xs}}
      .four
        .js
          .icon
          span.lx 军事
          span.num {{kindNum.js}}
        .ls
          .icon
          span.lx 历史
          span.num {{kindNum.ls}}
      .five
        .yx
          .icon
          span.lx 游戏
          span.num {{kindNum.yx}}
        .ty
          .icon
          span.lx 体育
          span.num {{kindNum.ty}}
      .six
        .kh
          .icon
          span.lx 科幻
          span.num {{kindNum.kh}}
        .xyly
          .icon
          span.lx 悬疑灵异
          span.num {{kindNum.xyly}}
      .seven
        .nsw
          .icon
          span.lx 女生网
          span.num {{kindNum.nsw}}
        .ecy
          .icon
          span.lx 二次元
          span.num {{kindNum.ecy}}
    .middel
      el-carousel.carousel(trigger="click")
        el-carousel-item(v-for="item in bookImg", :key="item.url")
          img.books(:src="item.url", @click="goDetail(item.name)")
      .one
        .title 火影里的聊天群
        .text 来到木叶没有金手指，多出一个聊天群
        .icon
          img(src="/images/book/first-mid-1.jpg")
      .two
        .title 我只想安静地打游戏
        .text 一滴血一条命，别人打游戏爆肝，我打游戏爆血。
        .icon
          img(src="/images/book/first-mid-2.jpg")
    .right
      h3.title 本周强推
      ul
        li(v-for="item in recommend")
          span.lx 「{{item.kind}}」
          span.mz(:title="item.name") {{item.name}}
          span.zz(:title="item.author") {{item.author}}
</template>

<script>
export default {
  data () {
    return {
      user: Object,
      book: '',
      kind: {},
      recommend: [],
      kindNum: {
        xh: 0,
        qh: 0,
        wx: 0,
        xx: 0,
        ds: 0,
        xs: 0,
        js: 0,
        ls: 0,
        yx: 0,
        ty: 0,
        kh: 0,
        xyly: 0,
        nsw: 0,
        ecy: 0
      },
      bookImg: [
        {
          url: '/images/book/first-1.jpg',
          name: '变身之我真不是NPC'
        },
        {
          url: '/images/book/first-2.jpg',
          name: '影视世界的律师'
        },
        {
          url: '/images/book/first-3.jpg',
          name: '我师叔是林正英'
        },
        {
          url: '/images/book/first-4.jpg',
          name: '我有一张沾沾卡'
        }
      ]
    }
  },
  mounted () {
    this.init()
    this.getUser()
  },
  methods: {
    init () {
      this.$axios({
        url: '/user/novel/recommend',
        method: 'post',
        data: {
          num: 11,
          kind: 'all'
        }
      }).then(res => {
        if (res.data.success) {
          this.recommend = res.data.recommend
          this.kind = res.data.kindNum
          this.getNum()
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
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
    getNum () {
      this.kind.forEach(element => {
        if (element.kind === '玄幻') {
          this.kindNum.xh = element.num
        } else if (element.kind === '奇幻') {
          this.kindNum.qh = element.num
        } else if (element.kind === '武侠') {
          this.kindNum.wx = element.num
        } else if (element.kind === '仙侠') {
          this.kindNum.xx = element.num
        } else if (element.kind === '都市') {
          this.kindNum.ds = element.num
        } else if (element.kind === '现实') {
          this.kindNum.xs = element.num
        } else if (element.kind === '军事') {
          this.kindNum.js = element.num
        } else if (element.kind === '历史') {
          this.kindNum.ls = element.num
        } else if (element.kind === '游戏') {
          this.kindNum.yx = element.num
        } else if (element.kind === '体育') {
          this.kindNum.ty = element.num
        } else if (element.kind === '科幻') {
          this.kindNum.kh = element.num
        } else if (element.kind === '悬疑灵异') {
          this.kindNum.xyly = element.num
        } else if (element.kind === '女生网') {
          this.kindNum.nsw = element.num
        } else if (element.kind === '二次元') {
          this.kindNum.ecy = element.num
        }
      })
    },
    select (val) {
      if (val === 'modify') {
        this.modify()
      } else if (val === 'out') {
        this.$router.push({path: '/'})
      }
    },
    modify () {
      this.$router.push({path: '/user/modify', query: {user: this.user}})
    },
    search () {
      this.$router.push({path: '/user/search', query: {name: this.book}})
    },
    goDetail (name) {
      console.log(name)
    }
  }
}
</script>

<style lang="scss">
  .first{
    position: relative;
    .topImg{
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .information{
      color: $button-base-color;
      width: 100%;
      height: 50px;
      margin-top: -4px;
      position: relative;
      background-color: $color-base-user-menu;
      .head{
        width: 30%;
        height: 100%;
        position: relative;
        .headImg{
          cursor: pointer;
          max-width: 100%;
          max-height: 100%;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          left: 10%;
        }
        .introduce{
          display: inline-block;
          width: 70%;
          height: 100%;
          position: absolute;
          right: 0px;
          line-height: 50px;
        }
      }
      .search{
        width: 16%;
        height: 40px;
        position: absolute;
        left: 42%;
        top: 5px;
        .el-input__inner{
          padding: 0px;
          border-radius: 0px;
          border: none;
          border-bottom: 2px solid $button-base-color;
          background-color: $color-base-user-menu;
          color: $button-base-color;
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
        left: 58%;
      }
      .name{
        position: absolute;
        top: 5px;
        right: 20px;
        .el-button{
          border: none;
          background-color: $color-base-user-menu;
          color: $button-base-color;
          span:hover{
            color: $link-hover-color;
          }
        }
      }
    }
    .left{
      cursor: pointer;
      float: left;
      width: 14%;
      height: 420px;
      border: 1px solid $color-base-gray;
      position: relative;
      left: 10%;
      top: 0px;
      .one{
        width: 100%;
        height: 60px;
        background-color: $bg-color-user-first;
        position: relative;
        .xh{
          width: 50%;
          height: 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/xh.png');
          }
        }
        .xh:hover .icon{
          background-position-x: 7px;
        }
        .xh:hover .lx{
          color: $color-base-red;
        }
        .xh:hover .num{
          color: $color-base-red;
        }
        .qh{
          width: 50%;
          height: 100%;
          position: absolute;
          right: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/qh.png');
          }
        }
        .qh:hover .icon{
          background-position-x: 7px;
        }
        .qh:hover .lx{
          color: $color-base-red;
        }
        .qh:hover .num{
          color: $color-base-red;
        }
      }
      .two{
        width: 100%;
        height: 60px;
        background-color: $bg-color-user-two;
        position: relative;
        .wx{
          width: 50%;
          height: 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/wx.png');
          }
        }
        .wx:hover .icon{
          background-position-x: 7px;
        }
        .wx:hover .lx{
          color: $color-base-red;
        }
        .wx:hover .num{
          color: $color-base-red;
        }
        .xx{
          width: 50%;
          height: 100%;
          position: absolute;
          right: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/xx.png');
          }
        }
        .xx:hover .icon{
          background-position-x: 7px;
        }
        .xx:hover .lx{
          color: $color-base-red;
        }
        .xx:hover .num{
          color: $color-base-red;
        }
      }
      .three{
        width: 100%;
        height: 60px;
        background-color: $bg-color-user-first;
        position: relative;
        .ds{
          width: 50%;
          height: 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/ds.png');
          }
        }
        .ds:hover .icon{
          background-position-x: 7px;
        }
        .ds:hover .lx{
          color: $color-base-red;
        }
        .ds:hover .num{
          color: $color-base-red;
        }
        .xs{
          width: 50%;
          height: 100%;
          position: absolute;
          right: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/xs.png');
          }
        }
        .xs:hover .icon{
          background-position-x: 7px;
        }
        .xs:hover .lx{
          color: $color-base-red;
        }
        .xs:hover .num{
          color: $color-base-red;
        }
      }
      .four{
        width: 100%;
        height: 60px;
        background-color: $bg-color-user-two;
        position: relative;
        .js{
          width: 50%;
          height: 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/js.png');
          }
        }
        .js:hover .icon{
          background-position-x: 7px;
        }
        .js:hover .lx{
          color: $color-base-red;
        }
        .js:hover .num{
          color: $color-base-red;
        }
        .ls{
          width: 50%;
          height: 100%;
          position: absolute;
          right: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/ls.png');
          }
        }
        .ls:hover .icon{
          background-position-x: 7px;
        }
        .ls:hover .lx{
          color: $color-base-red;
        }
        .ls:hover .num{
          color: $color-base-red;
        }
      }
      .five{
        width: 100%;
        height: 60px;
        background-color: $bg-color-user-first;
        position: relative;
        .yx{
          width: 50%;
          height: 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/yx.png');
          }
        }
        .yx:hover .icon{
          background-position-x: 7px;
        }
        .yx:hover .lx{
          color: $color-base-red;
        }
        .yx:hover .num{
          color: $color-base-red;
        }
        .ty{
          width: 50%;
          height: 100%;
          position: absolute;
          right: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/ty.png');
          }
        }
        .ty:hover .icon{
          background-position-x: 7px;
        }
        .ty:hover .lx{
          color: $color-base-red;
        }
        .ty:hover .num{
          color: $color-base-red;
        }
      }
      .six{
        width: 100%;
        height: 60px;
        background-color: $bg-color-user-two;
        position: relative;
        .kh{
          width: 50%;
          height: 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/kh.png');
          }
        }
        .kh:hover .icon{
          background-position-x: 7px;
        }
        .kh:hover .lx{
          color: $color-base-red;
        }
        .kh:hover .num{
          color: $color-base-red;
        }
        .xyly{
          width: 50%;
          height: 100%;
          position: absolute;
          right: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/xyly.png');
          }
        }
        .xyly:hover .icon{
          background-position-x: 7px;
        }
        .xyly:hover .lx{
          color: $color-base-red;
        }
        .xyly:hover .num{
          color: $color-base-red;
        }
      }
      .seven{
        width: 100%;
        height: 60px;
        background-color: $bg-color-user-first;
        position: relative;
        .nsw{
          width: 50%;
          height: 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/nsw.png');
          }
        }
        .nsw:hover .icon{
          background-position-x: 7px;
        }
        .nsw:hover .lx{
          color: $color-base-red;
        }
        .nsw:hover .num{
          color: $color-base-red;
        }
        .ecy{
          width: 50%;
          height: 100%;
          position: absolute;
          right: 0px;
          top: 0px;
          .icon{
            background-image: url('../../images/ecy.png');
          }
        }
        .ecy:hover .icon{
          background-position-x: 7px;
        }
        .ecy:hover .lx{
          color: $color-base-red;
        }
        .ecy:hover .num{
          color: $color-base-red;
        }
      }
    }
    .icon{
      transition: all 0.5s;
      width: 40%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: 10px 15px;
      position: absolute;
      left: 0px;
      top: 0px;
    }
    .lx{
      display: inline-block;
      line-height: 14px;
      text-align: left;
      font-size: 14px;
      width: 60%;
      height: 14px;
      position: absolute;
      left: 40%;
      top: 16px;
    }
    .num{
      color: $font-color-lighter;
      display: inline-block;
      line-height: 12px;
      text-align: left;
      font-size: 12px;
      width: 60%;
      height: 12px;
      position: absolute;
      left: 40%;
      bottom: 16px;
    }
    .middel{
      width: 50%;
      height: 410px;
      position: relative;
      top: 10px;
      left: 25%;
      .carousel{
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        .el-carousel__container{
          position: relative;
        }
        .books{
          cursor: pointer;
        }
      }
      .one{
        cursor: pointer;
        width: 48%;
        height: 100px;
        position: absolute;
        left: 0px;
        bottom: 0px;
        background-color: $bg-color-user-first;
        transition: box-shadow 0.5s;
        .title{
          color: $color-orange;
        }
      }
      .one:hover{
        box-shadow: 0 1px 5px rgba(0,0,0,.35);
      }
      .two{
        cursor: pointer;
        width: 48%;
        height: 100px;
        position: absolute;
        right: 0px;
        bottom: 0px;
        background-color: $bg-color-user-first;
        transition: box-shadow 0.5s;
        .title{
          color: $font-user-blue;
        }
      }
      .two:hover{
        box-shadow: 0 1px 5px rgba(0,0,0,.35);
      }
      .title{
        font-size: 1.17em;
        font-weight: bold;
        text-align: left;
        line-height: 40px;
        width: 80%;
        height: 40px;
        position: absolute;
        left: 10px;
        top: 5px;
      }
      .text{
        width: 80%;
        font-size: 12px;
        text-align: left;
        line-height: 20px;
        height: 40px;
        position: absolute;
        left: 10px;
        bottom: 15px;
      }
      .icon{
        overflow: hidden;
        width: 16%;
        height: 80px;
        position: absolute;
        left: 80%;
        top: 10px;
        box-shadow: 0 1px 6px rgba(0,0,0,.35), 0 0 5px #f9f2e9 inset;
        img{
          width: 100%;
          height: 100%;
          transition: all 0.5s;
        }
      }
      .icon:hover img{
        transform: scale(1.2);
      }
    }
    .right{
      background-color: $bg-color-user-two;
      clear: both;
      border: 1px solid $color-base-gray;
      position: relative;
      top: -410px;
      left: 76%;
      width: 14%;
      height: 410px;
      ul{
        padding: 0;
        margin: 0;
        li{
          height: 31px;
          line-height: 31px;
          list-style:none;
          position: relative;
          cursor: pointer;
          // border-bottom: 1px solid $color-base-gray;
          .lx{
            display: inline-block;
            height: 100%;
            width: 55px;
            position: absolute;
            left: 0%;
            top: 0px;
            line-height: 31px;
            color: $font-user-kind;
            font-size: 13px;
          }
          .mz{
            display: inline-block;
            width: 40%;
            height: 31px;
            overflow: hidden;
            font-size: 14px;
            text-align: left;
            position: absolute;
            left: 30%;
          }
          .zz{
            width: 30%;
            height: 31px;
            overflow: hidden;
            display: inline-block;
            font-size: 12px;
            color: $font-user-author;
            position: absolute;
            right: 0%;
          }
        }
        li:hover .mz{
          color: $color-base-red;
        }
      }
      .title{
        text-decoration: none;
        color: $font-user-title;
      }
    }
  }
</style>
