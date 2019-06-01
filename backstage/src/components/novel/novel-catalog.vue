<template lang="pug">
  .novel-catalog
    .title
      el-breadcrumb.breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item(:to="{ path: '/admin/novel/list' }") 小说管理
        el-breadcrumb-item 添加章节
    .catalog
      .name
        span.bt *
        span.mc 章节名称
        el-input.mc-input(type="text",
          placeholder="请输入章节名称(第一章 山边小村)",
          prefix-icon="el-icon-tickets",
          v-model="catalog.name")
      .wordNum
        span.bt *
        span.zs 章节字数
        el-input.zs-input(type="text",
          placeholder="请输入字数",
          prefix-icon="el-icon-menu",
          v-model="catalog.wordNum")
      .content
        span.bt *
        span.nr 章节内容
        el-input.nr-input(type="textarea",
          placeholder="请输入内容",
          rows="8",
          v-model="catalog.content")
    .foot
      el-button(type="primary", @click="save") 保存
      el-button(type="primary", @click="back") 返回
</template>

<script>
export default {
  data () {
    return {
      catalog: {
        bookId: Number,
        name: '',
        content: '',
        wordNum: ''
      }
    }
  },
  mounted () {
    this.$emit('gotoModify', '/admin/novel/catalog')
    this.catalog.bookId = this.$route.query.id
  },
  methods: {
    save () {
      if (!this.catalog.bookId || !this.catalog.name || !this.catalog.content || !this.catalog.wordNum) {
        this.$alert('请输入完整章节信息，或者点击返回后重试')
        return false
      }
      this.$axios({
        url: '/admin/novel/catalog',
        method: 'post',
        data: this.catalog
      }).then(res => {
        if (res.data.success) {
          this.$alert('添加章节成功')
          this.back()
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    back () {
      this.$emit('gotoModify', '/admin/novel/list')
      this.$router.push({path: '/admin/novel/list'})
    }
  }
}
</script>

<style lang="scss">
.novel-catalog{
  .title{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid $color-base-gray;
    .breadcrumb{
      line-height: 50px;
      font-size: 14px;
    }
  }
  .catalog{
    .bt{
      color: $color-base-red;
      position: absolute;
      left: 10px;
      width: 20px;
      height: 40px;
      line-height: 40px;
    }
    .name, .wordNum, .content{
      width: 100%;
      position: relative;
      top: 10px;
    }
    .name{
      .mc{
        position: absolute;
        left: 20px;
        height: 40px;
        line-height: 40px;
        width: 70px;
      }
      .mc-input{
        position: absolute;
        left: 120px;
        width: 300px;
      }
    }
    .wordNum{
      top: 60px;
      .zs{
        position: absolute;
        left: 20px;
        height: 40px;
        line-height: 40px;
        width: 70px;
      }
      .zs-input{
        position: absolute;
        left: 120px;
        width: 300px;
      }
    }
    .content{
      top: 120px;
      .nr{
        position: absolute;
        left: 20px;
        height: 40px;
        line-height: 40px;
        width: 70px;
      }
      .nr-input{
        position: absolute;
        left: 120px;
        width: 800px;
      }
    }
  }
  .foot{
    text-align: center;
    position: relative;
    widows: 100%;
    top: 400px;
  }
}
</style>
