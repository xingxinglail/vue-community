<template>
    <transition name="fade">
      <div class="tip" v-show="show">
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
    top 50%
    left 50%
    padding 0.75rem
    transform translate(-50%, -50%)
    background-color rgba(0, 0, 0, 0.8)
    font-size 0.875rem
    border-radius 6px
    color #fff
  .fade-enter-active, .fade-leave-active
    transition .3s ease
  .fade-enter, .fade-leave-to
    opacity 0
</style>
