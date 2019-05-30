<template lang="pug">
  #app
    router-view(v-if="show")
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    reload () {
      this.show = false
      this.$nextTick(function () {
        this.show = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  position: relative;
}
body{
  position: relative;
  margin: 0px;
  padding: 0px;
}
</style>
