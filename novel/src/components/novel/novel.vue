<template lang="pug">
  .novel
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
    .novel
      .novel-top
        .novel-cover
          img(:src="novel.cover")
        .novel-msg
          h1 {{novel.name}}
            span.novel-auhtor {{novel.author}} 著
          p.tag
            span.blue {{novel.finish | finish}}
            span.blue 签约
            span.blue 免费
            span.red(@click="goKind(novel.kind)") {{novel.kind}}
          p.detail
            span.num {{novel.wordNum}}
            span.text 万字
            span.line |
            span.num {{novel.readNum}}
            span.text 万阅读
          el-button.read(type="danger", @click="goCatalog(catalogList[0].id)") 开始阅读
      .catalog
        el-tabs(v-model="show")
          el-tab-pane(label="作品信息", name="first")
            .catalog-left
              p.js {{novel.introduce}}
              .msg
                .zz 作者自定义标签
                .zz-tag
                  span 护短
                  span 玄学
                  span 穿越
                  span 老师
                .rydt 荣誉动态
                .ryxx
                  span 2016-05-17 累计获得一万个收藏
                  .ry 荣誉殿堂
          el-tab-pane(:label="ml", name="second")
            .catalog-detali
              h3 正文卷•共{{catalogNum}}章
                span.free 免费
              .catalog-name
                .list(v-for="item in catalogList", :key="item.id")
                  span(@click="goCatalog(item.id)") {{item.name}}
</template>

<script>
export default {
  data () {
    return {
      show: 'first',
      ml: '目录',
      catalogNum: Number,
      catalogList: Array,
      novel: Object,
      id: 0,
      user: Object,
      book: '',
      kindImg: '',
      ssinput: 'defaul-input',
      msg: '请输入书名、作者',
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
    this.id = this.$route.query.id
    this.getNovel()
    this.getCatalog()
    if (this.$route.query.show) {
      this.show = this.$route.query.show
    }
  },
  filters: {
    finish: function (val) {
      if (val) {
        return '完结'
      } else {
        return '连载'
      }
    }
  },
  methods: {
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
    getNovel () {
      this.$axios({
        url: '/user/novel/id',
        method: 'post',
        data: {
          id: this.id
        }
      }).then(res => {
        if (res.data.success) {
          this.novel = res.data.novel
          this.kindImg = '/images/kind/' + this.novel.kind + '.jpg'
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    getCatalog () {
      this.$axios({
        url: '/user/catalog/list',
        method: 'post',
        data: {
          bookId: this.id
        }
      }).then(res => {
        if (res.data.success) {
          this.catalogList = res.data.catalogList
          this.catalogNum = this.catalogList.length
          this.ml = '目录' + '(' + this.catalogNum + '章)'
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    goCatalog (id) {
      this.$router.push({path: '/user/catalog', query: {id: id}})
    },
    modify () {
      this.$router.push({path: '/user/modify'})
    },
    gotoLx (kind) {
      if (kind === '首页') {
        this.$router.push({path: '/user/first'})
      } else {
        this.$router.push({path: '/empty', query: {kind: kind}})
      }
    },
    selectKind (val) {
      this.gotoLx(val)
    },
    getSearch () {
      this.$router.push({path: '/user/search', query: {name: this.book}})
    },
    self (val) {
      if (val === 'modify') {
        this.modify()
      } else if (val === 'out') {
        this.$router.push({path: '/'})
      }
    },
    goKind (kind) {
      this.$router.push({path: '/user/kind', query: {kind: kind}})
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
  .novel{
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
      height: 300px;
      img{
        max-width: 100%;
      }
    }
    .novel{
      background-color: $button-base-color;
      width: 990px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
      margin-top: -8%;
      .novel-top{
        width: 988px;
        height: 240px;
        position: relative;
        border: 1px solid $border-color-line;
        border-bottom: none;
        .novel-cover{
          width: 144px;
          height: 192px;
          position: absolute;
          left: 20px;
          top: 20px;
          overflow: hidden;
          box-shadow: 0 1px 6px rgba(0,0,0,.35), 0 0 5px #f9f2e9 inset;
          img{
            max-width: 100%;
            transition: all 0.5s;
          }
        }
        .novel-cover:hover img{
          transform: scale(1.2);
        }
        .novel-msg{
          width: 474px;
          height: 192px;
          position: absolute;
          left: 180px;
          top: 20px;
          overflow: hidden;
          h1{
            position: relative;
            top: -15px;
            text-align: left;
            height: 38px;
            line-height: 38px;
          }
          .novel-auhtor{
            position: relative;
            left: 20px;
            font-weight: normal;
            font-size: 14px;
            color: $font-user-title;
          }
          .tag{
            width: 474px;
            height: 24px;
            line-height: 24px;
            position: relative;
            top: -20px;
            font-size: 12px;
            text-align: left;
            .blue{
              position: relative;
              margin-right: 10px;
              text-align: center;
              display: inline-block;
              width: 40px;
              height: 24px;
              color: $font-user-sm;
              border: 1px solid $color-user-novel-kind;
              border-radius: 12px;
            }
            .red{
              cursor: pointer;
              text-align: center;
              display: inline-block;
              width: 40px;
              height: 24px;
              color: $bg-user-bjlj;
              border: 1px solid $border-user-kind;
              border-radius: 12px;
            }
            .red:hover{
              border: 1px solid $color-base-red;
            }
          }
          .detail{
            width: 474px;
            height: 24px;
            line-height: 24px;
            text-align: left;
            position: relative;
            top: -20px;
            .num{
              letter-spacing: .5px;
              font-size: 20px;
              color: $font-user-title;
              position: relative;
            }
            .line{
              font-size: 18px;
              color: $border-color-line;
              margin-right: 15px;
            }
            .text{
              margin-right: 15px;
              font-size: 12px;
              color: $font-color-label;
            }
          }
          .read{
            position: absolute;
            left: 0px;
            bottom: 5px;
          }
        }
      }
      .el-tabs{
        text-align: left;
        .is-top{
          font-size: 18px;
          letter-spacing: 1px;
        }
        .catalog-left{
          width: 100%;
          position: relative;
          .js{
            width: 700px;
            color: $font-user-title;
            font-size: 14px;
            overflow: hidden;
            border-bottom: 1px solid $border-color-line;
            padding-bottom: 20px;
          }
          .msg{
            width: 600px;
            height: 300px;
            position: relative;
            .zz{
              width: 150px;
              height: 100px;
              position: absolute;
              line-height: 100px;
              color: $font-color-lighter;
              font-size: 15px;
            }
            .zz-tag{
              width: 450px;
              height: 100px;
              position: absolute;
              left: 150px;
              top: 0px;
              border-bottom: 1px solid $border-color-line;
              span{
                margin-top: 38px;
                display: inline-block;
                font-size: 14px;
                width: 40px;
                height: 24px;
                margin-right: 10px;
                text-align: center;
                color: $font-user-sm;
                border: 1px solid $color-user-novel-kind;
                border-radius: 12px;
              }
            }
            .rydt{
              width: 150px;
              height: 180px;
              position: absolute;
              top: 100px;
              left: 0px;
              line-height: 180px;
              color: $font-color-lighter;
              font-size: 15px;
            }
            .ryxx{
              width: 450px;
              height: 180px;
              position: absolute;
              left: 150px;
              top: 100px;
              border-bottom: 1px solid $border-color-line;
              span{
                line-height: 100px;
                font-size: 15px;
                color: $font-user-title;
              }
              .ry{
                font-size: 15px;
                color: $font-user-sm;
              }
            }
          }
        }
        .catalog-detali{
          width: 100%;
          position: relative;
          h3{
            letter-spacing: 2px;
            padding-bottom: 20px;
            border-bottom: 1px solid $font-color-label;
            .free{
              background-color: #8ccd0a;
              font-size: 12px;
              color: $button-base-color;
              display: inline-block;
              width: 30px;
              text-align: center;
              letter-spacing: 1px;
              margin-left: 10px;
            }
          }
          .catalog-name{
            width: 100%;
            position: relative;
            .list{
              display: inline-block;
              width: 330px;
              height: 40px;
              text-align: left;
              border-bottom: 1px solid $border-color-line;
              span{
                cursor: pointer;
                text-align: left;
                display: inline-block;
                font-size: 14px;
                line-height: 40px;
              }
              span:hover{
                color: $color-base-red;
              }
            }
          }
        }
      }
    }
  }
</style>
