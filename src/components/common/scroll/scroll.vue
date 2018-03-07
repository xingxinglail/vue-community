<template>
    <div class="scroll" ref="scroll">
      <slot>

      </slot>
      <div ref="pulldown" class="pulldown-wrapper" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="pulling" class="loading">
            <img src="../../../assets/image/loading.svg" />
          </div>
          <div v-else><span>刷新成功</span></div>
        </div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Bubble from 'components/common/scroll/bubble'

  export default {
    data () {
      return {
        beforePullDown: true,
        isPullingDown: false,
        pulling: false,
        isPullUpLoad: false,
        bubbleY: 0
      }
    },
    props: {
      data: {
        default: () => {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 0
      },
      click: {
        type: Boolean,
        default: true
      },
      listenerScroll: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.pulldownInitTop = -50
    },
    mounted () {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      init () {
        this.BScroll = new BScroll(this.$refs.scroll, {
          click: this.click,
          probeType: this.probeType,
          pullDownRefresh: this.pullDownRefresh
        })

        if (this.listenerScroll) {
          this.BScroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        if (this.pullDownRefresh) {
          this.BScroll.on('pullingDown', () => {
            this.$emit('pullingDown')
            this.beforePullDown = false
            this.isPullingDown = true
            this.pulling = true
          })

          this.BScroll.on('scroll', (pos) => {
            if (this.beforePullDown) {
              this.bubbleY = Math.max(0, pos.y + this.pulldownInitTop)
              this.$refs.pulldown.style.transitionDuration = ''
              this.$refs.pulldown.style.top = `${Math.min(pos.y + this.pulldownInitTop, 5)}px`
            } else {
              this.bubbleY = 0
            }
          })
        }
      },
      destroy () {
        this.BScroll && this.BScroll.destroy()
      },
      refresh () {
        this.BScroll && this.BScroll.refresh()
      },
      scrollOnload () {
        this.$emit('scrollOnload')
      },
      finishPullDown () {
        this.BScroll && this.BScroll.finishPullDown()
      }
    },
    components: {
      Bubble
    },
    watch: {
      data (val) {
        this.$nextTick(() => {
          if (val.length > 0) {
            console.log(val)
            this.refresh()
            this.scrollOnload()
            if (this.pullDownRefresh && this.isPullingDown) {
              this.pulling = false
              setTimeout(() => {
                this.finishPullDown()
                this.isPullingDown = false
                setTimeout(() => {
                  this.beforePullDown = true
                  this.refresh()
                }, this.BScroll.options.bounceTime)
              }, 600)
            }
          }
        })
      },
      isPullingDown (val) {
        if (this.pullDownRefresh && !val) {
          this.$refs.pulldown.style.top = `${this.pulldownInitTop}px`
          this.$refs.pulldown.style.transitionDuration = '700ms'
          this.$refs.pulldown.style.transitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        }
      },
      pullDownRefresh () {
        this.BScroll.destroy()
        this._init()
      }
    }
  }
</script>

<style scoped lang="stylus">
  .scroll
    position relative
    height 100%
    overflow hidden
    .pulldown-wrapper
      position absolute
      width 100%
      left 0
      top -50px
      display flex
      flex-pack: center
      justify-content: center
      flex-align: center
      align-items: center
      transition: all
      img
        width 3rem
        height 3rem
</style>
