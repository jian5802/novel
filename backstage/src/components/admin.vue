<template lang="pug">
  .admin(v-bind:style="{ height: height + 'px' }")
    .head(:style="{'width': width}", @click="gotoSelf")
      img.head-img(:src="admin.head")
    el-menu.menu(background-color="#545c64", text-color="#fff", active-text-color="#ffd04b", @select="change",
      :default-active="activeIndex", :collapse="collapse", :style="{'width': width}", router=true)
      el-submenu(index="/admin/novel")
        template(slot="title")
          i.el-icon-document
          span 小说管理
        el-menu-item-group.group
          el-menu-item.menuItem(index="/admin/novel/list", style="min-width: 90%") 小说列表
          el-menu-item.menuItem(index="/admin/novel/add", style="min-width: 90%") 添加小说
          el-menu-item.menuItem(index="/admin/novel/catalog", disabled, style="min-width: 90%") 添加章节
          el-menu-item.menuItem(index="/admin/novel/modify", disabled, style="min-width: 90%") 修改小说
      el-submenu(index="/admin/user")
        template(slot="title")
          i.el-icon-menu
          span 用户管理
        el-menu-item-group.group
          el-menu-item.menuItem(index="/admin/user/list", style="min-width: 90%") 用户列表
          el-menu-item.menuItem(index="/admin/user/modify", disabled, style="min-width: 90%") 修改用户
      el-menu-item(index="/admin/self/modify")
        i.el-icon-setting
        span 个人信息
    .right(:style="{'width': rightWid, 'left': width}")
      .top
        .icon(@click="fold")
        .name
          el-dropdown.dropdown(@command="drop")
            el-button.button(type="primary") {{admin.name}}
              i.el-icon-arrow-down
            el-dropdown-menu(slot="dropdown")
              el-dropdown-item(command="gotoSelf") 修改信息
              el-dropdown-item(command="out") 退出登录
        .title 小说阅读网站后台管理系统
      router-view(v-on:modify="modify")
</template>

<script>
export default {
  data () {
    return {
      height: window.innerHeight,
      width: '15%',
      rightWid: '85%',
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
    this.init()
    this.$router.push({ path: '/admin/novel/list' })
  },
  watch: {
    height: function (val) {
      this.height = val
    },
    collapse: function (val) {
      if (val) {
        this.width = '10%'
        this.rightWid = '90%'
      } else {
        this.width = '15%'
        this.rightWid = '85%'
      }
    }
  },
  methods: {
    init () {
      this.$axios({
        url: '/admin/self/select',
        method: 'post',
        data: {
          id: this.$sessionStorage.getItem('id')
        }
      }).then(res => {
        if (res.data.success) {
          this.admin = res.data.admin
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    fold () {
      this.collapse = !this.collapse
    },
    gotoSelf () {
      this.activeIndex = '/admin/self/modify'
      this.$router.push({path: '/admin/self/modify'})
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
    },
    modify (data) {
      this.activeIndex = data
    }
  }
}
</script>

<style lang="scss">
  .admin{
    .menu{
      height: 100%;
      float: left;
      .el-submenu__title, .el-menu-item{
        text-align: center;
      }
      .menuItem{
        width: 50%;
        font-size: 14px;
        text-align: right;
      }
      .group{
        .el-submenu .el-menu-item{
          height: 50px;
          line-height: 50px;
          padding: 0 45px;
        }
      }
    }
    .right{
      .el-breadcrumb__inner{
        color: $font-color-base;
      }
      color: $font-color-base;
      position: absolute;
      top: 0;
      height: 100%;
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
          left: 0px;
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
      }
    }
    .head{
      cursor: pointer;
      background-color: $color-base-name;
      position: relative;
      height: 50px;
      .head-img{
        display: block;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin:  0 auto;
      }
    }
  }
</style>
