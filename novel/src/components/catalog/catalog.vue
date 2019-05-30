<template lang="pug">
  .catalog
    .mask(ref="mask")
      img(src="../../images/readbg.jpg")
    .top
      .mid
        el-breadcrumb(separator-class="el-icon-arrow-right")
          el-breadcrumb-item(:to="{path: '/user/first'}") 首页
          el-breadcrumb-item(:to="{path: '/user/kind', query: {kind: novel.kind}}") {{novel.kind}}
          el-breadcrumb-item(:to="{path: '/user/novel', query: {id: novel.id}}") {{novel.name}}
        el-input(v-model="book", type="text", placeholder="请输入作者、书名")
        el-button(icon="el-icon-search", @click="goSearch")
    .catalog
      .content
        .first(v-if="isFirst")
          .book-cover
            img(:src="novel.cover")
          h1 {{novel.name}}
          .h2 {{novel.author}} 著
          .msg
            .kind
              .lx {{novel.kind}}
              .msg-text 类型
            .read
              .lx {{novel.readNum}}万
              .msg-text 阅读量
            .word
              .lx {{novel.wordNum}}万
              .msg-text {{novel.finish | finish}} (字)
          .title
            .title-top 与{{novel.readNum}}万位书友共同开启《{{novel.name}}》的{{novel.kind}}之旅
            .title-foot 「盟主」 王八气质的猪
        .text(:style="textStyle")
          .sq
          h3 {{catalog.name}}
          .text-info
            img(src="../../images/book-icon.png")
            span.text-msg(@click="back", class="bookname") {{novel.name}}
            img(src="../../images/author-icon.png")
            span.text-msg {{novel.author}}
            img(src="../../images/word-icon.png")
            span.text-msg {{catalog.wordNum}}
          .lr(ref="lr")
          el-button(type="danger", round) 赞赏
</template>

<script>
export default {
  data () {
    return {
      textStyle: '',
      book: '',
      id: Number,
      novel: Object,
      isFirst: false,
      catalog: Object
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.init()
  },
  filters: {
    finish: function (val) {
      if (val) {
        return '完本'
      } else {
        return '连载'
      }
    }
  },
  methods: {
    init () {
      this.$axios({
        url: '/user/catalog/detail',
        method: 'post',
        data: {
          id: this.id
        }
      }).then(res => {
        if (res.data.success) {
          this.novel = res.data.novel
          this.catalog = res.data.catalog
          this.first()
          this.showContent()
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    goSearch () {
      this.$router.push({path: '/user/search', query: {book: this.book}})
    },
    showContent () {
      this.$nextTick(function () {
        this.$refs.lr.innerHTML = this.catalog.content
        console.log(this.contentBox)
      })
    },
    first () {
      let part = /第一章/
      if (part.test(this.catalog.name)) {
        this.isFirst = true
        this.textStyle = 'top: 750px;'
      } else {
        this.isFirst = false
        this.textStyle = 'top: 0px;'
      }
    },
    back () {
      this.$router.push({path: '/user/novel', query: {id: this.novel.id, show: 'second'}})
    }
  }
}
</script>

<style lang="scss">
  .catalog{
    .mask{
      opacity: .5;
      width: 100%;
      height: 100%;
      background-color: #e5e4db;
      position: fixed;
      left: 0px;
      top: 0px;
      z-index: 1;
      img{
        max-width: 100%;
      }
    }
    .top{
      position: relative;
      left: 0;
      right: 0;
      z-index: 104;
      width: 100%;
      height: 50px;
      background-color: rgba(255,255,255,.4);
      box-shadow: 0 1px 6px rgba(0,0,0,.35), 0 0 5px #f9f2e9 inset;
      .mid{
        height: 50px;
        width: 800px;
        margin: 0 auto;
        position: relative;
      }
      .el-breadcrumb{
        width: 400px;
        .el-breadcrumb__item{
          cursor: pointer;
          font-size: 18px;
          line-height: 50px;
        }
      }
      .el-input{
        position: absolute;
        right: 56px;
        top: 0px;
        background: 0 0;
        margin-top: 10px;
        width: 150px;
        border: none;
        height: 30px;
        border-bottom: 1px solid gray;
        .el-input__inner{
          font-size: 14px;
          padding: 0px;
          border-radius: 0px;
          border: none;
          background: 0 0;
        }
      }
      .el-button{
        border: none;
        background: 0 0;
        position: absolute;
        right: 0px;
        top: 5px;
      }
    }
    .catalog{
      width: 100%;
      position: relative;
      top: 50px;
      left: 0px;
      .content{
        z-index: 99;
        width: 800px;
        margin: 0 auto;
        .first{
          z-index: 99;
          position: absolute;
          height: 682px;
          width: 800px;
          background-image: url('../../images/bg.png');
          background-repeat: repeat;
          .book-cover{
            overflow: hidden;
            background-color: white;
            width: 130px;
            height: 170px;
            position: absolute;
            left: 335px;
            top: 100px;
            border: 1px solid #efece5;
            img{
              width: 120px;
              height: 160px;
              margin-top: 5px;
              filter: grayscale(100%);
            }
          }
          h1{
            width: 100%;
            position: absolute;
            top: 300px;
          }
          .h2{
            font-size: 16px;
            width: 100%;
            position: absolute;
            top: 380px;
            color: rgba(0,0,0,.4);
          }
          .msg{
            width: 600px;
            height: 50px;
            position: absolute;
            left: 100px;
            top: 450px;
            .kind{
              width: 200px;
              height: 50px;
              position: absolute;
              left: 0px;
              top: 0px;
            }
            .read{
              width: 200px;
              height: 50px;
              position: absolute;
              left: 200px;
              top: 0px;
            }
            .word{
              width: 200px;
              height: 50px;
              position: absolute;
              left: 400px;
              top: 0px;
            }
            .lx{
              text-align: center;
              position: absolute;
              left: 0;
              top: 0;
              font-size: 18px;
              font-weight: bold;
              width: 100%;
              height: 30px;
              line-height: 30px;
            }
            .msg-text{
              text-align: center;
              position: absolute;
              left: 0;
              bottom: 0px;
              width: 100%;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              color: rgba(0,0,0,.4);
            }
          }
          .title{
            position: absolute;
            left: 0;
            bottom: 60px;
            width: 100%;
            height: 80px;
            text-align: center;
            .title-top{
              line-height: 30px;
              height: 30px;
              width: 100%;
              position: absolute;
              left: 0px;
              top: 0px;
              font-size: 16px;
              color: $font-user-title;
            }
            .title-foot{
              width: 100%;
              height: 30px;
              line-height: 30px;
              position: absolute;
              left: 0px;
              bottom: 0px;
              font-size: 12px;
              color: rgba(0,0,0,.4);
            }
          }
        }
        .text{
          z-index: 99;
          width: 800px;
          position: relative;
          background-image: url('../../images/bg.png');
          background-repeat: repeat;
          .sq{
            width: 30px;
            height: 41px;
            position: relative;
            left: 735px;
            top: 0px;
            background-image: url('../../images/sq.png');
            background-repeat: no-repeat;
            background-position: 0px 0px;
          }
          h3{
            position: relative;
            left: 65px;
            top: 50px;
            text-align: left;
            width: 670px;
            height: 32px;
            font-size: 24px;
          }
          .text-info{
            text-align: left;
            width: 670px;
            height: 26px;
            position: relative;
            left: 65px;
            top: 30px;
            font-size: 12px;
            img{
              margin-right: 5px;
            }
            .text-msg{
              display: inline-block;
              position: relative;
              top: -10px;
              font-size: 12px;
              color: rgba(0,0,0,.4);
              line-height: 26px;
              margin-right: 20px;
            }
            .bookname{
              cursor: pointer;
            }
            .bookname:hover{
              color: $color-base-red;
            }
          }
          .lr{
            width: 670px;
            margin: 0 auto;
            text-align: left;
            margin-top: 50px;
            font-size: 18px;
            line-height: 1.8;
          }
          .el-button{
            margin: 50px auto;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 5px;
          }
        }
      }
    }
  }
</style>
