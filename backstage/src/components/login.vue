<template lang="pug">
  .login
    video(autoplay="autoplay", loop="loop", width="500px", height="500px")
      source(src="../assets/login.mp4", type="video/mp4")
    el-form.login-form(label-width="100px")
      el-form-item(label="用户名：")
        el-input(v-model="form.name")
      el-form-item(label="密码：")
        el-input(v-model="form.password", type="password")
      el-form-item  
        el-button 登录
</template>

<script>
export default {
  data () {
    return {
      wid: '',
      form: {
        name: '',
        password: ''
      }
    }
  },
  mounted () {
    console.log(this.$el.firstChild)
  },
  methods: {
    fn () {
      this.$axios({
        url: '/admin/login',
        method: 'post',
        data: {
          name: 'dj',
          password: '123'
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss">
  .login{
    z-index: 0;
    position: relative;
    p{
      color: $color-secondary-light;
    }
    .login-form{
      width: 400px;
      height: 300px;
      z-index: 1;
      position: absolute;
      left: 40%;
      top: 40%;
      background: rgba(0, 0, 0, 0.5);
      label{
        color: $color-base-success;
      }
    }
  }
</style>
