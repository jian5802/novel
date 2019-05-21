<template lang="pug">
  .novel-modify
    .title
      el-breadcrumb.breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item(:to="{ path: '/admin/novel/list' }") 小说管理
        el-breadcrumb-item 修改小说
    .book
      .cover
        .fm
          span.bt *
          span 封面
        el-upload.avatar-uploader(
          action="/admin/novel/head",
          :show-file-list="false",
          :on-success="uploadSuccess",
          :before-upload="beforeUpload")
          img.avatar(v-if="imageUrl", :src="imageUrl")
          i.el-icon-plus(v-else, class="avatar-uploader-icon")
      .name
        .sm
          span.bt *
          span 书名
        el-input.sm-input(type="text",
          placeholder="请输入书名",
          prefix-icon="el-icon-tickets",
          v-model="book.name")
      .author
        .zz
          span.bt *
          span 作者
        el-input.zz-input(type="text",
          placeholder="请输入作者",
          prefix-icon="el-icon-edit",
          v-model="book.author")
      .kind
        .zl
          span.bt *
          span 种类
        select.zl-select(v-model="book.kind")
          option(value="玄幻") 玄幻
          option(value="奇幻") 奇幻
          option(value="武侠") 武侠
          option(value="仙侠") 仙侠
          option(value="都市") 都市
          option(value="现实") 现实
          option(value="军事") 军事
          option(value="历史") 历史
          option(value="游戏") 游戏
          option(value="体育") 体育
          option(value="科幻") 科幻
          option(value="悬疑灵异") 悬疑灵异
          option(value="女生网") 女生网
          option(value="二次元") 二次元
      .wordNum
        .zs
          span.bt *
          span 字数(万)
        el-input.zs-input(type="text",
          placeholder="请输入字数",
          prefix-icon="el-icon-menu",
          v-model="book.wordNum")
      .readNum
        .ydl
          span.bt *
          span 阅读量(万)
        el-input.ydl-input(type="text",
          placeholder="请输入阅读量",
          prefix-icon="el-icon-mobile-phone",
          v-model="book.readNum")
      .introduce
        .js
          span.bt *
          span 简介
        el-input.js-input(type="textarea",
          placeholder="请输入作品简介",
          rows="4",
          v-model="book.introduce")
    .foot
      el-button(type="primary", @click="save") 保存
      el-button(type="primary", @click="goCatalog") 添加章节
      el-button(type="primary", @click="goBack") 返回
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      book: {
        id: Number,
        cover: '',
        name: '',
        author: '',
        kind: '玄幻',
        introduce: '',
        wordNum: '',
        readNum: ''
      }
    }
  },
  mounted () {
    this.$emit('gotoModify', '/admin/novel/modify')
    this.book = this.$route.query.book
    this.imageUrl = this.book.cover
  },
  methods: {
    uploadSuccess (res, file) {
      this.imageUrl = '/images/book/' + res.file.filename
      this.book.cover = '/images/book/' + res.file.filename
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
    },
    save () {
      if (!this.book.cover || !this.book.name || !this.book.author || !this.book.introduce || !this.book.wordNum || !this.book.readNum) {
        this.$alert('请填写完整小说信息')
        return false
      }
      this.$axios({
        url: '/admin/novel/modify',
        method: 'post',
        data: this.book
      }).then(res => {
        if (res.data.success) {
          this.$alert('修改小说成功')
          this.goBack()
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
        this.goBack()
      })
    },
    goCatalog () {
      this.$router.push({path: '/admin/novel/catalog', query: {id: this.book.id}})
    },
    goBack () {
      this.$emit('gotoModify', '/admin/novel/list')
      this.$router.push({path: '/admin/novel/list'})
    }
  }
}
</script>

<style lang="scss">
  .novel-modify{
    .bt{
      color: $color-base-red;
    }
    .title{
      width: 100%;
      height: 50px;
      border-bottom: 1px solid $color-base-gray;
      .breadcrumb{
        line-height: 50px;
        font-size: 14px;
      }
    }
    .book{
      width: 100%;
      position: relative;
      .cover{
        width: 100%;
        position: relative;
        .fm{
          width: 178px;
          height: 178px;
          position: absolute;
          left: 0;
          top: 2px;
          line-height: 178px;
        }
        .avatar-uploader:hover{
          border-color: $border-color-img;
        }
        .el-upload{
          width: 130px;
          height: 173px;
          margin: 0 auto;
          overflow: hidden;
        }
        .avatar-uploader{
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: absolute;
          left: 200px;
          top: 2px;
          overflow: hidden;
          .avatar{
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            display: block;
          }
          .avatar-uploader-icon{
            font-size: 28px;
            color: #8c939d;
            width: 130px;
            height: 173px;
            line-height: 173px;
            text-align: center;
          }
        }
      }
      .name{
        position: relative;
        top: 200px;
        width: 100%;
        .sm{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .sm-input{
          width: 300px;
          position: absolute;
          left: 200px;
        }
      }
      .author{
        position: relative;
        top: 250px;
        width: 100%;
        .zz{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .zz-input{
          width: 300px;
          position: absolute;
          left: 200px;
        }
      }
      .kind{
        position: relative;
        top: 300px;
        width: 100%;
        .zl{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .zl-select{
          width: 300px;
          height: 40px;
          position: absolute;
          left: 200px;
          border-radius: 5px;
          border-color: #DCDFE6;
          color: #606266;
          padding-left: 20px;
        }
      }
      .wordNum{
        position: relative;
        top: 350px;
        width: 100%;
        .zs{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .zs-input{
          width: 300px;
          position: absolute;
          left: 200px;
        }
      }
      .readNum{
        position: relative;
        top: 400px;
        width: 100%;
        .ydl{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .ydl-input{
          width: 300px;
          position: absolute;
          left: 200px;
        }
      }
      .introduce{
        position: relative;
        top: 450px;
        width: 100%;
        .js{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .js-input{
          width: 60%;
          position: absolute;
          left: 200px;
        }
      }
    }
    .foot{
      width: 100%;
      position: relative;
      top: 600px;
    }
  }
</style>
