<template lang="pug">
  .self-modify
    .title
      el-breadcrumb.breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item(:to="{ path: '/admin/self/modify' }") 个人信息
        el-breadcrumb-item 修改个人信息
    .information
      .headImg
        .tx
          span.bt *
          span 头像
        el-upload.avatar-uploader(
          action="/admin/self/head",
          :show-file-list="false",
          :on-success="uploadSuccess",
          :before-upload="beforeUpload")
          img.avatar(v-if="imageUrl", :src="imageUrl")
          i.el-icon-plus(v-else, class="avatar-uploader-icon")
      .name
        .mc
          span.bt *
          span 用户名
        el-input.mc-input(type="text",
          placeholder="请输入用户名",
          prefix-icon="el-icon-edit",
          v-model="admin.name")
      .pwd
        .mm
          span.bt *
          span 密码
        el-input.mm-input(type="password",
          placeholder="请输入密码",
          prefix-icon="el-icon-setting",
          v-model="admin.password")
      .checkPwd
        .check
          span.bt *
          span 确认密码
        el-input.mm-input(type="password",
          placeholder="请再次输入密码",
          prefix-icon="el-icon-setting",
          v-model="checkPass")
      .sex
        .xb
          span.bt *
          span 性别
        select.xb-select(v-model="admin.sex")
          option(value="1") 男
          option(value="0") 女
      .phone
        .sjhm
          span.bt *
          span 手机号码
        el-input.sjhm-input(type="text",
          placeholder="请输入手机号码",
          prefix-icon="el-icon-mobile-phone",
          v-model="admin.phone")
      .introduce
        .js
          span 简介
        el-input.js-input(type="textarea",
          placeholder="请输入个人简介",
          rows="4",
          v-model="admin.introduce")
    .foot
      el-button(type="primary", @click="save") 保存
      el-button(type="primary", @click="goback") 返回
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      checkPass: '',
      admin: Object
    }
  },
  mounted () {
    this.init()
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
          this.admin.password = ''
          this.imageUrl = this.admin.head
        } else {
          this.$alert(res.data.message)
        }
      }).catch(err => {
        this.$alert(err.statusText)
      })
    },
    uploadSuccess (res, file) {
      this.imageUrl = '/images/admin/' + res.file.filename
      this.admin.head = '/images/admin/' + res.file.filename
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
    },
    save () {
      if (!this.admin.name || !this.admin.password || !this.admin.head || !this.admin.phone || !this.checkPass) {
        this.$alert('请输入完整的管理员信息')
      } else {
        if (this.checkPass !== this.admin.password) {
          this.$alert('两次密码输入不一致，请重新输入')
        } else {
          this.$axios({
            url: '/admin/self/modify',
            method: 'post',
            data: this.admin
          }).then(res => {
            if (res.data.success) {
              this.$alert('修改个人信息成功, 请重新登录', {
                callback: () => {
                  this.$router.push({path: '/admin/login'})
                }
              })
            } else {
              this.$alert(res.data.message)
            }
          }).catch(err => {
            this.$alert(err.statusText)
            this.goback()
          })
        }
      }
    },
    goback () {
      this.$emit('modify', '/admin/novel/list')
      this.$router.push({path: '/admin/novel/list'})
    }
  }
}
</script>

<style lang="scss">
  .self-modify{
    .title{
      width: 100%;
      height: 50px;
      border-bottom: 1px solid $color-base-gray;
      .breadcrumb{
        line-height: 50px;
        font-size: 14px;
      }
    }
    .information{
      width: 100%;
      position: relative;
      .bt{
        color: $color-base-red;
      }
      .headImg{
        width: 100%;
        position: relative;
        top: 25px;
         .tx{
          width: 178px;
          height: 150px;
          position: absolute;
          left: 0;
          top: 2px;
          line-height: 150px;
        }
        .avatar-uploader:hover{
          border-color: $border-color-img;
        }
        .el-upload{
          width: 150px;
          height: 150px;
          border-radius: 75px;
          margin: 0 auto;
          overflow: hidden;
        }
        .avatar-uploader{
          border: 1px dashed #d9d9d9;
          border-radius: 75px;
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
            width: 150px;
            height: 150px;
            line-height: 150px;
            text-align: center;
            border-radius: 75px;
          }
        }
      }
      .name{
        position: relative;
        top: 200px;
        width: 100%;
        .mc{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .mc-input{
          width: 300px;
          position: absolute;
          left: 200px;
        }
      }
      .pwd{
        position: relative;
        top: 250px;
        width: 100%;
        .mm{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .mm-input{
          width: 300px;
          position: absolute;
          left: 200px;
        }
      }
      .checkPwd{
        position: relative;
        top: 300px;
        width: 100%;
        .check{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .mm-input{
          width: 300px;
          position: absolute;
          left: 200px;
        }
      }
      .sex{
        position: relative;
        top: 350px;
        width: 100%;
        .xb{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .xb-select{
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
      .phone{
        position: relative;
        top: 400px;
        width: 100%;
        .sjhm{
          position: absolute;
          left: 0;
          width: 178px;
          height: 40px;
          line-height: 40px;
        }
        .sjhm-input{
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
      text-align: center;
      width: 100%;
      position: relative;
      top: 600px;
    }
  }
</style>
