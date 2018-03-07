<template>
    <transition name="move">
      <div class="topics" v-show="show">
        <div class="head">
          <svg class="icon iconfont" aria-hidden="true" @click="back">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
          <span>{{ title }}</span>
        </div>
        <div class="content">
          <scroll ref="scroll" :data="topicsList">
            <div>
              <ul>
                <li v-for="(item, index) in topicsList"
                    :key="index"
                    @click="go(item.id)">
                  <img :src="item.author.avatar_url" />
                  <div class="info">
                    <p class="title">{{ item.title }}</p>
                    <p class="name">{{ item.author.loginname }}&nbsp;&nbsp;{{ filterDate(item.last_reply_at) }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </scroll>
        </div>
      </div>
    </transition>
</template>

<script>
  import Scroll from 'components/common/scroll/scroll'
  import {dateFormat} from 'js/dateFormat'

  export default {
    props: {
      tab: {
        type: String,
        default: 'collection'
      },
      show: {
        type: Boolean,
        default: false
      },
      topicsList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      filterDate (date) {
        return dateFormat(date)
      },
      back () {
        this.$emit('back')
      },
      go (id) {
        this.$router.push(`/index/${id}`)
      }
    },
    computed: {
      title () {
        if (this.tab === 'collection') {
          return '我收藏的话题'
        } else if (this.tab === 'join') {
          return '我参与的话题'
        } else {
          return '我最近的话题'
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/variable.styl"

  .topics
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color #eff2f7
    z-index 1
    .head
      height 3.5rem
      display flex
      align-items center
      background-color $theme-color
      .iconfont
        color #fff
        font-size 1.4rem
        padding 4%
      span
        color #fff
        font-size 1.2rem
    .content
      ul
        li
          display flex
          align-items center
          padding 0.875rem
          margin-bottom 1rem
          background-color #fff
          img
            width 3rem
            height 3rem
            border-radius 50%
            margin-right 0.875rem
          .info
            flex 1
            p.title
              font-size 0.875rem
              margin-bottom 0.75rem
            p.name
              font-size 0.75rem
              color #92a8c1
  .move-enter-active, .move-leave-active
    transition .3s ease
  .move-enter, .move-leave-to
    transform translate3d(0, 100%, 0)
</style>
