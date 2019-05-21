<template lang="pug">
  .user
    router-view(v-on:modify="modify")
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    modify (data) {
      this.$emit('modify', data)
    }
  }
}
</script>

<style lang="scss">
  .user{
  }
</style>
