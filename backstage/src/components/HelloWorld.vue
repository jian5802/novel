<template lang="pug">
  .hellow
    el-button(@click="fn", type="primary") 点击
    p 123456
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
  .hellow{
    p{
      color: $color-secondary-light;
    }
  }
</style>
