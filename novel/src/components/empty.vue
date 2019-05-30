<template lang="pug">
  .empty
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    this.$router.replace({path: '/user/kind', query: {kind: this.$route.query.kind}})
  }
}
</script>

<style lang="scss">
  .empty{
  }
</style>
