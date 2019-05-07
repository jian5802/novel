<template lang="pug">
  .novel
    router-view
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
  .novel{
    width: 200px;
    height: 200px;
    border: 1px solid gray;
    position: relative;
    left: 200px;
  }
</style>
