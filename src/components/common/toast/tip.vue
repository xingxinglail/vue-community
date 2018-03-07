<template>
    <transition name="fade">
      <div class="tip" v-show="show">
        <svg class="icon iconfont" aria-hidden="true">
          <use :xlink:href="icon"></use>
        </svg>
        <p>{{ txt }}</p>
      </div>
    </transition>
</template>

<script>
  export default {
    props: {
      show: { // 是否显示
        type: Boolean,
        default: false
      },
      txt: { // 文字说明
        type: String,
        default: '已完成'
      },
      status: { // 成功or失败
        type: Boolean,
        default: true
      }
    },
    created () {
      this.timer = null
    },
    methods: {
      closed () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$emit('closed')
        }, 2500)
      }
    },
    computed: {
      icon () {
        return this.status ? '#icon-artboard' : '#icon-shibai'
      }
    },
    watch: {
      show (val) {
        if (val) {
          this.closed()
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .tip
    position fixed
    z-index 100
    top 20%
    left 50%
    width 7.6rem
    height 7.6rem
    margin-left -3.8rem
    background-color rgba(17, 17, 17, 0.7)
    border-radius 5px
    text-align center
    color #fff
    .iconfont
      font-size 3.4rem
      margin 0.8rem
  .fade-enter-active, .fade-leave-active
    transition .3s ease
  .fade-enter, .fade-leave-to
    opacity 0
</style>
