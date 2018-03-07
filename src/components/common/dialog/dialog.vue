<template>
    <transition name="fade">
      <div class="dialog" v-show="show">
        <div class="bg"></div>
        <div class="dialog_wrapper">
          <div class="msg">没有登录</div>
          <div class="control border-t-1px">
            <a href="javascript:;" class="left border-r-1px" @click="left">{{ leftTxt }}</a>
            <a href="javascript:;" class="right" @click="right">{{ rightTxt }}</a>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      leftTxt: {
        type: String,
        default: '关闭'
      },
      rightTxt: {
        type: String,
        default: '确认'
      }
    },
    methods: {
      left () {
        this.$emit('left')
      },
      right () {
        this.$emit('right')
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/variable.styl"
  @import "~assets/css/mixin.styl"

  .dialog
    position fixed
    z-index 99
    top 0
    left 0
    right 0
    bottom 0
    .bg
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      background rgba(0, 0, 0, 0.6)
    .dialog_wrapper
      width 80%
      position absolute
      z-index 1
      overflow hidden
      background-color #fff
      text-align center
      border-radius 3px
      top 50%
      left 50%
      transform translate(-50%, -50%)
      .msg
        color #999
        padding 6%
        font-size 0.875rem
        line-height 1.4rem
        min-height 4rem
      .control
        height 3rem
        line-height 3rem
        display flex
        text-align center
        border-t-1px(#D5D5D6)
        a
          font-size 1.125rem
          flex 1
        a.left
          color #353535
          border-r-1px(#D5D5D6)
        a.right
          color $theme-color
  .fade-enter-active, .fade-leave-active
    transition .3s ease
  .fade-enter, .fade-leave-to
    opacity 0
</style>
