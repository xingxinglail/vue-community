<template>
    <div class="footer">
      <div class="wrapper">
        <router-link to="/index" tag="div" class="link">
          <svg class="icon iconfont" aria-hidden="true">
            <use xlink:href="#icon-shouye"></use>
          </svg>
          <p>首页</p>
        </router-link>
        <router-link to="/put" tag="div" class="center">
          <div>
            <svg class="icon iconfont" aria-hidden="true">
              <use xlink:href="#icon-iconfont7"></use>
            </svg>
          </div>
          <p>发布</p>
        </router-link>
        <router-link to="/user" tag="div" class="link">
          <svg class="icon iconfont" aria-hidden="true">
            <use xlink:href="#icon-wode"></use>
          </svg>
          <p>我的</p>
        </router-link>
      </div>
    </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus">
  @import "~assets/css/variable.styl"

  .footer
    position fixed
    width 100%
    height 2.8rem
    bottom 0
    left 0
    z-index 1
    background-color #fff
    box-shadow 0 0 4px 0px rgba(0,0,0,.2)
    .wrapper
      display flex
      justify-content space-between
      height 100%
      padding 0 10%
      position relative
      .link
        width 25%
        text-align center
        padding 0.3rem 0
        &.active
          .iconfont
            color $theme-color
        .iconfont
          font-size 1.4rem
        p
          font-size 0.625rem
          margin-top 0.3rem
      .center
        text-align center
        position absolute
        width 2.6rem
        height 2.6rem
        background-color #fff
        border-radius 50%
        left 50%
        top -1.2rem
        padding 0.2rem
        margin-left -1.3rem
        box-shadow 0px -2px 9px -5px rgba(0,0,0,1)
        div
          width 100%
          height 100%
          border-radius 50%
          background-color $theme-color
          line-height 2.7rem
          .iconfont
            font-size 1.2rem
            color #fff
        p
          font-size 0.625rem
          margin-top 0.3rem
</style>
