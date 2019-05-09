<template lang="pug">
  .novel
    router-view(v-on:gotoModify="modify")
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
  .novel{
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
