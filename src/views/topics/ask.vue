<template>
    <div class="ask">
      <topisc-wrapper :tab="'ask'"></topisc-wrapper>
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
  .ask
    position fixed
    top 6.5rem
    bottom 0
    left 0
    right 0
    overflow hidden
    z-index 1
</style>
