<template>
    <div class="all" ref="all">
      <topisc-wrapper :tab="'all'" @changeZindex="changeZindex"></topisc-wrapper>
    </div>
</template>

<script>
  import TopiscWrapper from 'components/topicsList/topicsWrapper'

  export default {
    methods: {
      changeZindex (val) {

      }
    },
    components: {
      TopiscWrapper
    }
  }
</script>

<style scoped lang="stylus">
  .all
    position fixed
    top 6.5rem
    bottom 2.8rem
    left 0
    right 0
    z-index 0
</style>
