<template>
    <div class="put">
      <div class="wrapper">
        <div class="box">
          <p>选择模块</p>
          <select v-model="tab" @change="saveData">
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
          </select>
        </div>
        <div class="box">
          <p>标题</p>
          <input type="text" v-model="title" placeholder="10个字符以上" @blur="saveData" />
        </div>
        <div class="box">
          <textarea v-model="content" placeholder="输入文本，支持markdown格式" @blur="saveData"></textarea>
        </div>
        <a href="javascript:;" class="send" @click="submit">{{ submittxt }}</a>
      </div>
      <min-tip :show="showTip"
               :txt="tipTxt"
               @closed="closetip"></min-tip>
      <my-tip :show="showMyTip"
              :txt="myTipTxt"
              :status="myTipState"
              @closed="closeMyTip"></my-tip>
    </div>
</template>

<script>
  import MinTip from 'components/common/toast/mintip'
  import MyTip from 'components/common/toast/tip'
  import {setLocal, getLocal, delLocal} from 'js/util'
  import {createTopic} from 'api/topics/topics'
  import {mapGetters} from 'vuex'

  const saveName = 'put'

  export default {
    data () {
      return {
        tab: 'share',
        title: '',
        content: '',
        showTip: false,
        tipTxt: '',
        sending: false,
        showMyTip: false,
        myTipTxt: '',
        myTipState: true
      }
    },
    created () {
      const data = getLocal(saveName)
      if (data !== null) {
        this.tab = data.tab
        this.title = data.title
        this.content = data.content
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      submittxt () {
        return this.sending ? '正在发布...' : '发布'
      }
    },
    methods: {
      closeMyTip () {
        this.showMyTip = false
      },
      closetip () {
        this.showTip = false
      },
      saveData () {
        setLocal(saveName, {
          tab: this.tab,
          title: this.title,
          content: this.content
        })
      },
      submit () {
        if (this.sending) {
          return
        }
        if (this.title.trim() === '') {
          this.showTip = true
          this.tipTxt = '请填写标题！'
          return
        }
        if (this.title.trim().length < 10) {
          this.showTip = true
          this.tipTxt = '标题不得少于10个字符！'
          return
        }
        if (this.content === '') {
          this.showTip = true
          this.tipTxt = '请填写内容！'
          return
        }
        this.sending = true
        createTopic({
          accesstoken: this.token,
          title: this.title,
          tab: this.tab,
          content: this.content
        }).then((res) => {
          this.showMyTip = true
          if (res.data.success) {
            this.myTipTxt = '发布成功'
            this.myTipState = true
            this.sending = false
            this.title = ''
            this.tab = 'share'
            this.content = ''
            delLocal(saveName)
          } else {
            this.myTipTxt = '发布失败'
            this.myTipState = false
          }
          this.sending = false
        }).catch(() => {
          this.sending = false
          this.showMyTip = true
          this.myTipTxt = '发布失败'
          this.myTipState = false
        })
      }
    },
    components: {
      MinTip,
      MyTip
    }
  }
</script>

<style scoped lang="stylus">
  .put
    .wrapper
      padding 0 4% 24%
      margin-top 5%
      .box
        margin-bottom 1.8rem
        p
          font-size 0.875rem
          color #bfbfbf
        select, input
          outline 0
          -webkit-appearance none
          border 0
          margin-top 0.5rem
          width 100%
          padding 0.5rem 0
          border-bottom 1px solid #bfbfbf
          font-size 1rem
        textarea
          width 96%
          padding 4% 2%
          border 0
          outline 0
          resize none
          background-color #f7f7f7
          min-height 15rem
          max-height 15rem
          overflow auto
          line-height 1.4rem
          font-size 1rem
        &:nth-child(3)
          margin-bottom 0.5rem
      a.send
        display block
        height 2.4rem
        line-height 2.4rem
        color #fff
        text-align center
        box-shadow 0 1px 6px rgba(0,0,0,0.118), 0 1px 4px rgba(0,0,0,0.118)
        background-color #1d8ce0
        font-size 0.875rem
</style>
