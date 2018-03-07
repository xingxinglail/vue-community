<template>
  <div class="topicsWrapper" ref="topicsWrapper">
    <loading v-show="loading"></loading>
    <scroll
      ref="scroll"
      :data="topicsList"
      :probeType="3"
      :listenerScroll="true"
      :pullDownRefresh="true"
      @scroll="scroll"
      @pullingDown="pullingDown"
      @scrollOnload="scrollOnload">
      <div>
        <topisc-list :data="topicsList" @select="select"></topisc-list>
        <div class="loadmore" ref="loadMore" v-show="!loading">
          <div v-show="!loadEnd">
            <img src="../../assets/image/loading.svg" />
            <span>正在加载...</span>
          </div>
          <div v-show="loadEnd">
            <span>已加载全部</span>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/scroll'
  import TopiscList from 'components/topicsList/topicsList'
  import Loading from 'components/common/loading/loading'
  import {limit, getTopics} from 'api/topics/topics'

  export default {
    props: {
      tab: {
        type: String,
        default: 'all'
      }
    },
    data () {
      return {
        topicsList: [],
        loading: true,
        loadEnd: false
      }
    },
    created () {
      this.page = 1 // 页码
      this.isLoad = true // 是否可以上啦加载
      this._getTopics()
    },
    methods: {
      select (item) {
        this.$router.push({
          path: `/index/${item.id}`
        })
      },
      pullingDown () {
        this.pullingTimer = setTimeout(() => {
          this.page = 1
          this._getTopics()
        }, 1200)
      },
      _getTopics () {
        getTopics(this.tab, this.page).then((res) => {
          this.topicsList = res.data.data
          this.loading = false
          if (this.topicsList.length < limit) {
            this.loadEnd = true
            this.isLoad = false
          }
        })
      },
      _loadMore () {
        if (!this.isLoad) {
          return
        }
        clearTimeout(this.timer)
        this.isLoad = false
        this.page++
        this.timer = setTimeout(() => { // 延迟请求
          getTopics(this.tab, this.page).then((res) => {
            this.topicsList = this.topicsList.concat(res.data.data)
            this.isLoad = true
            if (res.data.data.length < limit) {
              this.loadEnd = true
              this.isLoad = false
            }
          })
        }, 1000)
      },
      scroll (pos) {
        this._dropUpLoad(pos.y)
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pulldownInitTop)
          this.$refs.pulldown.style.transitionDuration = ''
          this.$refs.pulldown.style.top = `${Math.min(pos.y + this.pulldownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }
      },
      _dropUpLoad (y) {
        if (this.scrollHeight !== 0) {
          if (Math.abs(y) >= this.scrollHeight - this.wrapperHeight - (this.loadMoreHeight / 1.5)) {
            this._loadMore()
          }
        }
      },
      _dataRefresh () {
        this.topicsList = []
        this.loading = true
        this.loadEnd = false
        this.page = 1
        this.isLoad = true
        this.$refs.scroll.destroy()
        this.$refs.scroll.init()
      },
      scrollOnload () {
        this.wrapperHeight = this.$refs.topicsWrapper.offsetHeight
        this.loadMoreHeight = this.$refs.loadMore.offsetHeight
        this.scrollHeight = this.$refs.scroll.$el.children[0].offsetHeight
      }
    },
    watch: {
      tab () {
        this.$nextTick(() => {
          this._dataRefresh()
          this._getTopics()
          this.$refs.scroll.refresh()
        })
      }/* ,
      showContent (val) {
        const wrapper = this.$refs.topicsWrapper
        if (val) {
          wrapper.style.zIndex = 2
        } else {
          wrapper.style.zIndex = 0
        }
      } */
    },
    components: {
      Scroll,
      TopiscList,
      Loading
    }
  }
</script>

<style scoped lang="stylus">
  .topicsWrapper
    position fixed
    top 6.5rem
    left 0
    right 0
    bottom 2.8rem
    .loadmore
      padding 0.5rem
      text-align center
      img
        width 3rem
        height 3rem
        vertical-align middle
      span
        font-size 0.875rem
        vertical-align middle
</style>
