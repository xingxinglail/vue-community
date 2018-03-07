<template>
    <div class="weex">
      <topisc-wrapper :tab="'weex'"></topisc-wrapper>
    </div>
</template>

<script>
  import TopiscWrapper from 'components/topicsList/topicsWrapper'

  export default {
    components: {
      TopiscWrapper
    }
  }
</script>

<style scoped lang="stylus">
  .weex
    position fixed
    top 6.5rem
    bottom 0
    left 0
    right 0
    overflow hidden
    z-index 1
</style>
