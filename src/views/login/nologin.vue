<template>
    <div class="nologin">
      <a href="javascript:;" @click="login">请先登录</a>
    </div>
</template>

<script>
  export default {
    methods: {
      login () {
        this.$router.replace({
          path: '/login',
          query: {
            redirect: this.$route.query.redirect
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .nologin
    a
      display block
      width 80%
      height 2.4rem
      line-height 2.4rem
      color #fff
      text-align center
      box-shadow 0 1px 6px rgba(0,0,0,0.118), 0 1px 4px rgba(0,0,0,0.118)
      background-color #1d8ce0
      font-size 0.875rem
      margin 60% auto 0
</style>
