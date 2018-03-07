<template>
    <div class="index">
      <div class="nav border-t-1px" ref="navbox">
        <a ref="link"
           v-for="(item, index) in navList"
           :key="index"
           :to="'/index/' + item.tab"
           :class="{[item.tab]: item.tab, 'active': item.tab === tab}"
           @click="change(item, index)">{{ item.zh }}</a>
        <span ref="bor"></span>
      </div>
      <topisc-wrapper :tab="tab"></topisc-wrapper>
      <transition name="move">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
  import {hasClass} from 'js/dom'
  import TopiscWrapper from 'components/topicsList/topicsWrapper'

  export default {
    data () {
      return {
        navList: [
          {
            zh: '全部',
            tab: 'all'
          },
          {
            zh: '精华',
            tab: 'good'
          },
          {
            zh: 'weex',
            tab: 'weex'
          },
          {
            zh: '分享',
            tab: 'share'
          },
          {
            zh: '问答',
            tab: 'ask'
          },
          {
            zh: '招聘',
            tab: 'job'
          }

        ],
        tab: 'all'
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._getWidth()
        // this._init()
      })
    },
    methods: {
      _getWidth () {
        this.borWidth = this.$refs.link[0].offsetWidth
        this.$refs.bor.style.width = `${this.borWidth}px`
      },
      change (item, index) {
        if (item) {
          this.tab = item.tab
        }
        this.$refs.bor.style.transform = `translate3d(${this.borWidth * index}px,0,0)`
      },
      _init (cls) {
        const links = this.$refs.link
        if (!cls) {
          cls = 'router-link-active'
        }
        for (let i = 0; i < links.length; i++) {
          if (hasClass(links[i], cls)) {
            this.change(null, i)
            return
          }
        }
      }
    },
    components: {
      TopiscWrapper
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/mixin.styl"
  @import "~assets/css/variable.styl"

  .index
    .nav
      display flex
      height 3rem
      line-height 3rem
      border-t-1px(#eaeaea)
      background-color $theme-color
      position relative
      a
        flex 1
        text-align center
        font-size 1rem
        color #eaeaea
        transition 0.4s ease
        &.active
          color #fff
      span
        position absolute
        height 2px
        background-color #FF4949
        left 0
        bottom 0
        transition 0.3s ease
  .move-enter-active, .move-leave-active
    transition .4s ease
  .move-enter, .move-leave-to
    transform translate3d(0, 100%, 0)
</style>
