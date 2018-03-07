<template>
    <div class="nav border-t-1px" ref="navbox">
      <router-link
        ref="link"
        class="link all"
        to="/all"
        @click.native="move(0)">全部</router-link>
      <router-link
        class="link good"
        to="/good"
        @click.native="move(1)">精华</router-link>
      <router-link
        class="link weex"
        to="/weex"
        @click.native="move(2)">weex</router-link>
      <router-link
        class="link share"
        to="/share"
        @click.native="move(3)">分享</router-link>
      <router-link
        class="link ask"
        to="/ask"
        @click.native="move(4)">问答</router-link>
      <router-link
        class="link job"
        to="/job"
        @click.native="move(5)">招聘</router-link>
      <span ref="bor"></span>
    </div>
</template>

<script>
  import {hasClass} from 'js/dom'

  export default {
    mounted () {
      this.$nextTick(() => {
        this._getWidth()
        this._init(window.location.pathname)
      })
    },
    methods: {
      _init (path) {
        const links = this.$refs.navbox.children
        path = path.replace('/', '')
        for (let i = 0; i < links.length; i++) {
          if (hasClass(links[i], path)) {
            this.move(i)
            return
          }
        }
      },
      _getWidth () {
        this.borWidth = this.$refs.link.$el.offsetWidth
        this.$refs.bor.style.width = `${this.borWidth}px`
      },
      move (index) {
        this.$refs.bor.style.transform = `translate3d(${this.borWidth * index}px,0,0)`
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/mixin.styl"
  @import "~assets/css/variable.styl"

  .nav
    display flex
    height 3rem
    line-height 3rem
    border-t-1px(#eaeaea)
    background-color $theme-color
    position relative
    .link
      flex 1
      text-align center
      font-size 1rem
      color #eaeaea
      transition 0.4s ease
      &.router-link-active
        color #fff
    span
      position absolute
      height 2px
      background-color #FF4949
      left 0
      bottom 0
      transition 0.3s ease
</style>
