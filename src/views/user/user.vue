<template>
    <div class="user" ref="user" v-if="user !== null">
      <div class="head">
        <img :src="user.avatar_url" />
        <div class="msg">
          <p class="name">{{ user.loginname }}</p>
          <p>ID：{{ user.id }}</p>
        </div>
        <div class="score">
          <svg class="icon iconfont" aria-hidden="true">
            <use xlink:href="#icon-jifen"></use>
          </svg>
          &nbsp;
          <span>{{ user.score }}</span>
        </div>
      </div>
      <div class="content">
        <ul>
          <li @click="show('collection', user.collect_topics)">
            <svg class="icon iconfont titleicon collection" aria-hidden="true">
              <use xlink:href="#icon-favoritesfilling"></use>
            </svg>
            <div class="info border-1px">
              <p>我收藏的话题</p>
              <span class="count">{{ user.collect_topics.length }}</span>
              <svg class="icon iconfont go collection" aria-hidden="true">
                <use xlink:href="#icon-iconfont552cc1babd9aa"></use>
              </svg>
            </div>
          </li>
          <li @click="show('join', user.recent_replies)">
            <svg class="icon iconfont titleicon join" aria-hidden="true">
              <use xlink:href="#icon-xiaoxi1"></use>
            </svg>
            <div class="info border-1px">
              <p>我参与的话题</p>
              <span class="count">{{ user.recent_replies.length }}</span>
              <svg class="icon iconfont go" aria-hidden="true">
                <use xlink:href="#icon-iconfont552cc1babd9aa"></use>
              </svg>
            </div>
          </li>
          <li @click="show('recently', user.recent_topics)">
            <svg class="icon iconfont titleicon recently" aria-hidden="true">
              <use xlink:href="#icon-rfq"></use>
            </svg>
            <div class="info">
              <p>我最近的话题</p>
              <span class="count">{{ user.recent_topics.length }}</span>
              <svg class="icon iconfont go" aria-hidden="true">
                <use xlink:href="#icon-iconfont552cc1babd9aa"></use>
              </svg>
            </div>
          </li>
        </ul>
      </div>
      <div class="loginout border-1px border-t-1px" @click="loginout">
        退出登录
      </div>
      <topics :show="showTopics"
              :tab="tab"
              :topicsList="topicsList"
              @back="closeTop"></topics>
    </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import Topics from 'components/topics/topics'
  import {delSession} from 'js/util'

  export default {
    data () {
      return {
        showTopics: false,
        tab: '',
        topicsList: []
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      ...mapMutations({
        'setToken': 'TOKEN',
        'setUser': 'USER'
      }),
      loginout () {
        this.setToken('')
        this.setUser(null)
        delSession('user')
        delSession('token')
        this.$router.push('/index')
      },
      closeTop () {
        this.showTopics = false
        this.$refs.user.style.zIndex = 0
      },
      show (tab, list) {
        this.$refs.user.style.zIndex = 2
        this.tab = tab
        this.showTopics = true
        this.topicsList = list
      }
    },
    mounted () {
      console.log(this.user)
    },
    components: {
      Topics
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/mixin.styl"
  @import "~assets/css/variable.styl"

  .user
    position fixed
    top 3.5rem
    left 0
    right 0
    bottom 2.8rem
    background-color #eff2f7
    .head
      margin 1.2rem 0
      background-color #fff
      padding 0.5rem 0.875rem
      display flex
      align-items center
      position relative
      img
        width 3.125rem
        height 3.125rem
        border-radius 4px
      .msg
        flex 1
        font-size 0.875rem
        padding 0 0.75rem
        line-height 1.4rem
        white-space nowrap
        p.name
          color #1f2d3d
          font-weight 700
      .score
        position absolute
        top 0.5rem
        right 0.875rem
        padding 0 0.4rem
        background-color #eff2f7
        border-radius 10px
        display flex
        align-items center
        height 1.2rem
        .iconfont
          color #fcc015
          font-size 1.2rem
        span
          font-size 0.875rem
    .content
      background-color #fff
      margin-bottom 1.2rem
      ul
        li
          display flex
          align-items center
          .titleicon
            margin 0 0.875rem
            font-size 1.2rem
            &.collection
              color #fcc015
            &.join
              color $theme-color
            &.recently
              color #f86161
          .info
            flex 1
            border-1px(#e9edf4)
            display flex
            align-items center
            height 2.875rem
            p
              flex 1
              font-size 0.875rem
            .count
              padding 0.3rem 0.4rem
              border-radius 16px
              background-color #e5e9f2
              font-size 0.75rem
            .go
              font-size 1.2rem
              margin 0 0.2rem
    .loginout
      display block
      background-color #fff
      text-align center
      font-size 0.875rem
      height 2.875rem
      line-height 2.875rem
      border-1px(#e5e9f2)
      border-t-1px(#e5e9f2)
</style>
