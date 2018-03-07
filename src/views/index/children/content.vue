<template>
    <div class="topics_content">
      <loading v-show="loading"></loading>
      <div class="wrapper">
        <scroll ref="scroll"
                :data="data"
                v-if="data !== null">
          <div v-show="!loading" class="inner">
            <h2>{{data.title}}</h2>
            <div class="author">
              <img :src="data.author.avatar_url" />
              <span class="name">{{ data.author.loginname }}</span>
              <span class="time">{{ filterDate(data.last_reply_at) }}</span>
            </div>
            <div class="info" v-html="data.content"></div>
          </div>
        </scroll>
      </div>
      <div class="rating" v-if="data !== null">
        <div class="icon" @click="back">
          <svg class="icon iconfont" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
        </div>
        <div class="input" @click="showRating">
          <span>说点什么吧</span>
        </div>
        <div class="icon" @click="showRating">
          <div class="count" v-show="data.reply_count > 0">{{ data.reply_count }}</div>
          <svg class="icon iconfont" aria-hidden="true">
            <use xlink:href="#icon-xiaoxi"></use>
          </svg>
        </div>
        <div class="icon" @click="getCollection">
          <svg class="icon iconfont" aria-hidden="true" :class="{'collection': collectionCls}">
            <use xlink:href="#icon-shoucang"></use>
          </svg>
        </div>
      </div>
      <div v-if="data !== null">
        <transition name="cmove">
          <div class="rating-wrapper" v-show="rating">
            <div class="head">
              <p>{{ data.reply_count }}条评论</p>
            </div>
            <div class="body">
              <scroll ref="scroll2"
                      :data="data.replies">
                <div>
                  <ul>
                    <li v-for="(item, index) in data.replies" :key="index">
                      <div class="avatar">
                        <img :src="item.author.avatar_url" />
                      </div>
                      <div class="content">
                        <p class="name">{{ item.author.loginname }}</p>
                        <p class="time">{{ filterDate(item.create_at) }}</p>
                        <p class="info" v-html="item.content"></p>
                      </div>
                      <div class="like">
                        <svg class="icon iconfont"
                             aria-hidden="true"
                             :class="{'active': user !== null && item.ups.indexOf(user.id) !== -1}"
                             @click="up(item)">
                          <use xlink:href="#icon-dianzan"></use>
                        </svg>
                        <span>{{ item.ups.length }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </scroll>
            </div>
            <div class="foot">
              <div class="icon" @click="showRating">
                <svg class="icon iconfont" aria-hidden="true">
                  <use xlink:href="#icon-fanhui"></use>
                </svg>
              </div>
              <div class="input" @click="setRate">
                <span>说点什么吧</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <transition name="cfade">
        <div class="dailog-wrapper" v-show="dailog">
          <div class="bg" @click="dailog = false"></div>
          <div class="content">
            <textarea v-model="rateTxt"></textarea>
            <a href="javascript:;" @click="send">{{ sendTxt }}</a>
          </div>
        </div>
      </transition>
      <toast :show="showToast"
             :txt="toastTxt"
             :status="toastStatus"
             @closed="closed"></toast>
      <my-dialog :show="showDialog"
                 :rightTxt="'去登录'"
                 @left="closeDialog"
                 @right="login"></my-dialog>
    </div>
</template>

<script>
  import {getTopicContent, collection, deCollect} from 'api/topics/topics'
  import {dateFormat} from 'js/dateFormat'
  import Scroll from 'components/common/scroll/scroll'
  import Loading from 'components/common/loading/loading'
  import Toast from 'components/common/toast/tip'
  import MyDialog from 'components/common/dialog/dialog'
  import {mapGetters, mapActions} from 'vuex'
  import {createRate, giveUp} from 'api/ratings/ratings'
  import {getUserInfo} from 'api/login/login'

  export default {
    data () {
      return {
        data: null,
        loading: true,
        rating: false,
        dailog: false,
        sending: false,
        rateTxt: '',
        showToast: false,
        showDialog: false,
        toastTxt: '发送成功',
        toastStatus: true
      }
    },
    created () {
      this.timer = null
      this._getTopicContent(this.$route.params.id)
    },
    computed: {
      ...mapGetters([
        'token',
        'user'
      ]),
      sendTxt () {
        return this.sending ? '发送中...' : '发送'
      },
      collectionCls () {
        if (this.user && this.user.collect_topics) {
          const collects = this.user.collect_topics
          if (collects.length === 0) {
            return false
          }
          for (let i = 0; i < collects.length; i++) {
            if (collects[i].id === this.data.id) {
              return true
            }
          }
        }
        return false
      }
    },
    methods: {
      ...mapActions([
        'setToken'
      ]),
      getCollection () {
        if (this.user === null) {
          this.showDialog = true
          return
        }
        if (this.collectionCls) {
          deCollect({
            accesstoken: this.token,
            topic_id: this.data.id
          }).then((res) => {
            if (res.data.success) {
              this._getUserInfo()
            }
          })
        } else {
          collection({
            accesstoken: this.token,
            topic_id: this.data.id
          }).then((res) => {
            if (res.data.success) {
              this._getUserInfo()
            }
          })
        }
      },
      _getUserInfo () {
        getUserInfo(this.user.loginname).then((res) => {
          let user = Object.assign({}, this.user, res.data.data)
          this.setToken({
            token: this.token,
            user: user
          })
        })
      },
      up (item) {
        if (this.user === null) {
          this.showDialog = true
          return
        }
        giveUp({
          replyId: item.id,
          accesstoken: this.token
        }).then((res) => {
          if (res.data.success) {
            if (res.data.action === 'up') {
              item.ups.push(this.user.id)
            } else {
              for (let i = 0; i < item.ups.length; i++) {
                if (item.ups[i] === this.user.id) {
                  item.ups.splice(i, 1)
                  return
                }
              }
            }
          }
        })
      },
      setRate () {
        if (this.token === '' || this.token === undefined) {
          this.showDialog = true
          return
        }
        this.dailog = true
      },
      closeDialog () {
        this.showDialog = false
      },
      login () {
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      },
      closed () {
        this.showToast = false
      },
      send () {
        if (this.sending) {
          return
        }
        this.rateTxt = this.rateTxt.trim()
        if (this.rateTxt !== '') {
          this.sending = true
          createRate({
            topicId: this.data.id,
            accesstoken: this.token,
            content: this.rateTxt
          }).then((res) => {
            if (res.data.success) {
              this.toastTxt = '发送成功'
              this.toastStatus = true
              this.showToast = true
              this.sending = false
              this.dailog = false
              this._createNewRate(res.data)
            }
          }).catch(() => {
            this.toastTxt = '发送失败'
            this.toastStatus = false
          })
        }
      },
      _createNewRate (data) {
        let obj = {
          id: data.reply_id,
          ups: [],
          create_at: Date.now(),
          content: this.rateTxt,
          author: {
            avatar_url: this.user.avatar_url,
            loginname: this.user.loginname
          }
        }
        this.data.replies.push(obj)
        this.$nextTick(() => {
          this.$refs.scroll2.refresh()
        })
      },
      showRating () {
        this.rating = !this.rating
        if (this.rating) {
          this.$nextTick(() => {
            this.$refs.scroll2.refresh()
          })
        }
      },
      _getTopicContent (id) {
        getTopicContent(id).then((res) => {
          this.data = res.data.data
          this.loading = false
          this._refresh()
        })
      },
      filterDate (date) {
        return dateFormat(date)
      },
      _refresh () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 1000)
      },
      back () {
        clearTimeout(this.timer)
        this.$router.push({
          path: '/index'
        })
      }
    },
    watch: {
      token (val) {
        if (val !== '' && val !== undefined) {
          this.showDialog = false
        }
      }
    },
    components: {
      Scroll,
      Loading,
      Toast,
      MyDialog
    }
  }
</script>

<style lang="stylus">
  @import "~assets/css/variable.styl"

  .topics_content
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 2
    background-color #fff
    .wrapper
      position absolute
      top 0
      left 0
      bottom 3rem
      right 0
      padding 0 4%
    .inner
      padding-bottom 2rem
    h2
      font-size 1.125rem
      font-weight 600
      line-height 2.2rem
      margin 1.2rem 0
    .author
      height 3.125rem
      font-size 0.875rem
      display flex
      align-items center
      img
        width 2.2rem
        height 2.2rem
        border-radius 50%
      .name
        color #1f2d3d
        margin-left 0.5rem
      .time
        color #d3dce6
        flex 1
        text-align right
    .info
      font-size 1.25rem
      h1
        font-size 1.5rem
        margin 1.2rem 0
        font-weight 700
      p
        font-size 0.875rem
        text-align justify
        margin-bottom 0.875rem
        line-height 1.6rem
        img
          width 100%
          text-align center
      pre
        font-size 0.875rem
        line-height 1.6rem
        white-space pre-wrap
        word-break break-all
      ul, li
        list-style initial
        padding 10
        font-size 0.875rem
        a
          font-size 0.875rem
          color #ff4081
      li
        line-height 1.4rem
      h3
        font-size 1rem
        margin 0.8rem 0
        font-weight 700
    .rating
      position absolute
      display flex
      overflow hidden
      align-items center
      bottom 0
      left 0
      width 100%
      height 3rem
      background-color #fff
      box-shadow 0 0 4px 0px rgba(0,0,0,0.2)
      .icon
        position relative
        padding 0.4rem
        .iconfont
          font-size 1.4rem
          color #1f2d3d
          &.collection
            color #e96900
        .count
          position absolute
          padding 0 0.4rem
          height 1.2rem
          line-height 1.2rem
          z-index 1
          top 0
          right 0
          border-radius 1rem
          color #fff
          text-align center
          background-color #e96900
          font-size 0.75rem
      .input
        flex 1
        padding 0.65rem
        margin 0 0.6rem
        color #b2c2d4
        background-color #eff2f7
    .rating-wrapper
      position absolute
      z-index 2
      top 0
      left 0
      right 0
      bottom 0
      background-color #eff2f7
      .head
        position absolute
        left 0
        top 0
        width 94%
        padding 1.2rem 3%
        p
          border-left 4px solid #e96900
          padding-left 0.4rem
          font-size 0.875rem
      .foot
        position absolute
        display flex
        overflow hidden
        align-items center
        bottom 0
        left 0
        width 100%
        height 3rem
        background-color #fff
        box-shadow 0 0 4px 0px rgba(0,0,0,0.2)
        .icon
          position relative
          padding 0.4rem
          .iconfont
            font-size 1.4rem
            color #1f2d3d
        .input
          flex 1
          padding 0.65rem
          margin 0 0.6rem
          color #b2c2d4
          background-color #eff2f7
      .body
        position absolute
        top 3.25rem
        bottom 3rem
        left 0
        right 0
        overflow hidden
        ul
          li
            display flex
            background-color #fff
            margin-bottom 0.4rem
            padding 0.8rem 1rem
            .avatar
              img
                width 2.8rem
                height 2.8rem
                border-radius 50%
            .content
              flex 1
              margin 0 0.6rem
              font-size 0.875rem
              p
                line-height 1.4rem
                &.name
                  font-weight 700
                &.time
                  color #7588a1
                &.info
                  padding 0.875rem
                  p
                    word-wrap break-word
                    a
                      color #ff4081
            .like
              width 3rem
              .iconfont
                font-size 1.2rem
                color #d3dce6
                &.active
                  color $theme-color
              span
                font-size 0.875rem
    .dailog-wrapper
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      z-index 3
      .bg
        width 100%
        height 100%
        background rgba(0, 0, 0, 0.6)
      .content
        position absolute
        top 20%
        left 50%
        margin-left -41%
        width 76%
        padding 3%
        border-radius 3px
        background-color #fff
        textarea
          width 94%
          padding 3%
          background-color #f6f8fa
          height 7rem
          border 0
          resize none
          margin-bottom 0.5rem
          outline none
          line-height 1.4rem
        a
          display block
          width 4rem
          padding 0.6rem 0
          text-align center
          margin 0 auto
          color #41b883
  .cmove-enter-active, .cmove-leave-active, .cfade-enter-active, .cfade-leave-active
    transition .4s ease
  .cmove-enter, .cmove-leave-to
    transform translate3d(0, 100%, 0)
  .cfade-enter, .cfade-leave-to
    opacity 0

</style>
