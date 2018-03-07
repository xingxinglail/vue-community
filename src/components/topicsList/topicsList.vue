<template>
    <div class="topicslist">
      <ul>
        <li class="border-1px"
            v-for="(item, index) in data" @click="select(item)">
          <img :src="item.author.avatar_url" />
          <div class="content">
            <div class="title">
              <span class="label"
                    :class="{'active': filterLabelCls(item)}">
                {{ filterLabelTxt(item) }}</span>
              <p>{{ item.title }}</p>
            </div>
            <div class="date">
              <p>{{item.reply_count}} / {{item.visit_count}}</p>
              <p>{{ filterDate(item.last_reply_at) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import {dateFormat} from 'js/dateFormat'

  const TAB = {
    top: '置顶',
    all: '全部',
    good: '精华',
    weex: 'weex',
    share: '分享',
    ask: '问答',
    job: '招聘'
  }

  export default {
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      select (item) {
        this.$emit('select', item)
      },
      filterLabelCls (item) {
        if (item.top) {
          return true
        } else {
          if (item.good) {
            return true
          }
        }
        return false
      },
      filterLabelTxt (item) {
        if (item.top) {
          return TAB['top']
        }
        if (item.good) {
          return TAB['good']
        }
        return TAB[item.tab]
      },
      filterDate (date) {
        return dateFormat(date)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/mixin.styl"

  .topicslist
    ul
      li
        display flex
        border-1px(#666)
        padding 0.875rem
        img
          width 3rem
          height 3rem
          border-radius 50%
          margin-right 0.875rem
        .content
          flex 1
          display flex
          flex-direction column
          justify-content space-between
          .title
            .label
              font-size 0.75rem
              padding 0.2rem
              background-color #e5e5e5
              border-radius 0.2rem
              color #999
              &.active
                background-color #009688
                color #fff
            p
              font-size 0.875rem
              display inline
              color #3e3e3e
              font-weight 600
              line-height 1.4rem
        .date
          display flex
          justify-content space-between
          font-size 0.75rem
          color #999
</style>
