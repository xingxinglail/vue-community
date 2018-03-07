<template>
    <div class="header">
      <div class="wrapper">
        <img src="../../assets/image/logo.png" alt="vuejs" />
        <p>Vue.js 中文社区</p>
        <svg class="icon iconfont" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </div>
    </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus">
  .header
    height 3.5rem
    background-color #1D8CE0
    .wrapper
      display flex
      align-items center
      height 100%
      img
        width 2.375rem
        height 2.375rem
        margin-left 0.75rem
      p
        flex 1
        font-size 1.2rem
        color #fff
        text-align center
      .iconfont
        font-size 2rem
        color #fff
        padding 0.75rem
</style>
