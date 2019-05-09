<template lang="pug">
  .novel-add
    .title
      el-breadcrumb.breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item(:to="{ path: '/admin/novel/list' }") 小说管理
        el-breadcrumb-item 添加小说
    .book
      el-form(ref="book", :model="book", label-width="80%")
        el-form-item(label="封面", label-width="80px")
          el-upload.avatar-uploader(
            action="/admin/novel/head",
            :show-file-list="false",
            :on-success="uploadSuccess",
            :before-upload="beforeUpload")
          i.el-icon-plus(class="avatar-uploader-icon")
    .catalog
    .foot
      el-button(type="primary") 保存
      el-button(type="primary") 重置
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .novel-add{
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
      .avatar-uploader, .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader, .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
    }
  }
</style>
