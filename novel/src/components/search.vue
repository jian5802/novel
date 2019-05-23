<template lang="pug">
  .search
    .top
      img.headImg(:src="user.head", @click="modify")
      .kind
        span.lx(v-for="item in kinds", :key="item.id")
          span.text {{item.kind}}
      el-dropdown.dropdown
        el-button 更多
          i.el-icon-arrow-down(class="el-icon--right")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item 全部作品
          el-dropdown-item 二次元
          el-dropdown-item 奇幻
          el-dropdown-item 武侠
          el-dropdown-item 悬疑灵异
          el-dropdown-item 军事
          el-dropdown-item 现实
          el-dropdown-item 体育
      el-input.search(v-model="book", type="text")
      .ssbtn(@click="search")
</template>

<script>
export default {
  data () {
    return {
      book: '',
      user: Object,
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
        }
      ]
    }
  },
  mounted () {
    this.init()
    this.book = this.$route.query.name
    console.log(this.book)
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
    modify () {
      this.$router.push({path: '/user/modify', query: {user: this.user}})
    },
    search () {
      console.log(this.book)
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
      .headImg{
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        left: 10%;
        top: 0px;
      }
      .kind{
        width: 30%;
        height: 50px;
        position: absolute;
        left: 15%;
        top: 0px;
        .lx{
          width: 15%;
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
        left: 45%;
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
      .search{
        width: 16%;
        height: 40px;
        position: absolute;
        left: 54%;
        top: 5px;
        .el-input__inner{
          padding: 0px;
          border-radius: 0px;
          border: none;
          border-bottom: 1px solid $font-color-placeholder;
          background-color: $color-base-user-menu;
          color: $font-color-placeholder;
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
        left: 70%;
      }
    }
  }
</style>
