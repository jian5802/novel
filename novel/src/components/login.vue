<template lang="pug">
  .login
    video.video(autoplay="autoplay", loop="loop", muted)
      source(src="../assets/login.mp4", type="video/mp4")
      | 此视频文件为支付宝所有，在此仅供样式参考，如用到商业用途，请自行更换为其他视频或图片，否则造成的任何问题使用者本人承担，谢谢
    el-form.login-form(label-width="100px", size="medium", :rules="rules", ref="form", :model="form", status-icon)
      el-form-item.oneItem(label="用户名：", prop="name", label-width="80px")
        el-input(v-model="form.name", type="text")
      el-form-item.twoItem(label="密码：", prop="password", label-width="80px")
        el-input(v-model="form.password", type="password")
      el-form-item
        el-button.submit(type="primary", @click="submit()") 登录
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios({
            url: '/user/login',
            method: 'post',
            data: {
              name: this.form.name,
              password: this.form.password
            }
          }).then(res => {
            if (res.data.r === 'u_not') {
              this.$alert('用户名不存在', {
                confirmButtonText: '确定',
                callback: () => {
                  return false
                }
              })
            } else if (res.data.r === 'p_err') {
              this.$alert('密码错误', {
                confirmButtonText: '确定',
                callback: () => {
                  return false
                }
              })
            } else if (res.data.r === 'ok') {
              this.$sessionStorage.setItem('id', res.data.user.id)
              this.$router.push({path: '/user'})
            }
          }).catch(err => {
            alert(err.statusText)
            return false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .login{
    z-index: 0;
    position: relative;
    background-size:cover;
    overflow: hidden;
    .video{
      width: 100%;
      height: 100%;
    }
    p{
      color: $color-secondary-light;
    }
    .login-form{
      width: 400px;
      height: 300px;
      z-index: 1;
      position: absolute;
      left: 40%;
      top: 20%;
      background: rgba(0, 0, 0, 0.5);
      label{
        color: $color-base-orange;
      }
      .oneItem{
        position: absolute;
        top: 70px;
        left: 35px;
      }
      .twoItem{
        position: absolute;
        top: 130px;
        left: 35px;
      }
      .submit{
        position: absolute;
        top: 200px;
        left: 70px;
      }
    }
  }
</style>
