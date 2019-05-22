<template lang="pug">
  .user
    router-view
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$router.push({path: '/user/first', query: {user: this.$route.query.user}})
  }
}
</script>

<style lang="scss">
  .user{
    margin: 0px;
    padding: 0px;
  }
</style>
