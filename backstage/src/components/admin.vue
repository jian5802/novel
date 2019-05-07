<template lang="pug">
  .admin(v-bind:style="{ height: height + 'px' }")
    .top
      .head(:style="{'width': width + 'px'}", @click="gotoSelf")
        img.head-img(style="width: 50px; height: 50px", :src="admin.head")
      .icon(@click="fold")
      .name
        el-dropdown.dropdown(@command="drop")
          el-button.button(type="primary") {{admin.name}}
            i.el-icon-arrow-down
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(command="gotoSelf") 修改信息
            el-dropdown-item(command="out") 退出登录
      .title 小说阅读网站后台管理系统
    el-menu.menu(background-color="#545c64", text-color="#fff", active-text-color="#ffd04b", @select="change",
      :default-active="activeIndex", :collapse="collapse", :style="{'width': width + 'px'}", router=true)
      el-submenu(index="3")
        template(slot="title")
          i.el-icon-document
          span 小说管理
        el-menu-item-group
          el-menu-item.novelList(index="/admin/novel/list") 小说列表
          el-menu-item.addNovel(index="/admin/novel/add") 添加小说
      el-menu-item(index="/admin/user/list")
        i.el-icon-menu
        span 用户管理
      el-menu-item(index="/admin/self")
        i.el-icon-setting
        span 个人信息
    router-view
</template>

<script>
export default {
  data () {
    return {
      height: window.innerHeight,
      width: '200',
      admin: Object,
      activeIndex: '/admin/novel/list',
      collapse: false
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        that.height = window.innerHeight
      })()
    }
    this.admin = this.$route.query
    this.$router.push({ path: '/admin/novel/list' })
  },
  watch: {
    height: function (val) {
      this.height = val
    },
    collapse: function (val) {
      if (val) {
        this.width = '100'
      } else {
        this.width = '200'
      }
    }
  },
  methods: {
    fold () {
      this.collapse = !this.collapse
    },
    gotoSelf () {
      this.activeIndex = '/admin/self'
      this.$router.push({ path: '/admin/self' })
    },
    out () {
      this.$router.push({ path: '/' })
    },
    drop (val) {
      if (val === 'gotoSelf') {
        this.gotoSelf()
      } else if (val === 'out') {
        this.out()
      }
    },
    change (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss">
  .admin{
    .menu{
      width: 200px;
      height: 100%;
      float: left;
      .novelList, .addNovel{
        font-size: 14px;
        text-align: right;
      }
    }
    .top{
      width: 100%;
      height: 50px;
      position: relative;
      border-bottom: 1px solid $color-base-gray;
      .icon{
        width: 50px;
        height: 50px;
        position: absolute;
        top: 0px;
        left: 250px;
        background-image: url('../images/1.png');
        background-repeat: no-repeat;
        background-position: 7px 7px;
        cursor: pointer;
      }
      .name{
        position: absolute;
        width: 100px;
        height: 50px;
        right: 50px;
        top: 0;
        text-align: center;
        line-height: 50px;
        color: $color-base-menu;
        font-size: 14px;
        .dropdown{
          width: 100%;
          .button{
            width: 100%;
          }
        }
      }
      .title{
        width: 300px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 600;
        margin: 0 auto;
        letter-spacing: 5px;
      }
      .head{
        cursor: pointer;
        background-color: $color-base-name;
        position: absolute;
        left: 0px;
        top: 0;
        width: 200px;
        height: 50px;
        .head-img{
          border-radius: 25px;
        }
      }
    }
  }
</style>
