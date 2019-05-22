<template lang="pug">
  .first
    img.topImg(src="../../assets/top.png")
    .information
      .head
        img.headImg(:src="user.head")
        span.introduce {{user.introduce}}
      el-input.search(v-model="book", type="text", placeholder="请输入书名")
      .ssbtn
      el-dropdown.name
        el-button {{user.name}}
          i.el-icon-arrow-down(class="el-icon--right")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item 修改信息
          el-dropdown-item 退出登录
    .left
      .one
        .xh
          .icon
          span.lx 玄幻
          span.num 123
        .qh
          .icon
          span.lx 奇幻
          span.num 123
      .two
        .wx
          .icon
          span.lx 武侠
          span.num 123
        .xx
          .icon
          span.lx 仙侠
          span.num 123
      .three
        .ds
          .icon
          span.lx 都市
          span.num 123
        .xs
          .icon
          span.lx 现实
          span.num 123
      .four
        .js
          .icon
          span.lx 军事
          span.num 123
        .ls
          .icon
          span.lx 历史
          span.num 123
      .five
        .yx
          .icon
          span.lx 游戏
          span.num 123
        .ty
          .icon
          span.lx 体育
          span.num 123
      .six
        .kh
          .icon
          span.lx 科幻
          span.num 123
        .xyly
          .icon
          span.lx 悬疑灵异
          span.num 123
      .seven
        .nsw
          .icon
          span.lx 女生网
          span.num 123
        .ecy
          .icon
          span.lx 二次元
          span.num 123
</template>

<script>
export default {
  data () {
    return {
      user: Object,
      book: ''
    }
  },
  mounted () {
    this.user = this.$route.query.user
    console.log(this.user)
  }
}
</script>

<style lang="scss">
  .first{
    position: relative;
    .topImg{
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
      }
    }
    .icon{
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
  }
</style>
