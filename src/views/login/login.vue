<template>
    <div class="login">
      <div class="header">登录</div>
      <div class="content">
        <div class="input-wrapper" :class="{'err': !vaildate}">
          <input type="text" v-model="token" placeholder="Access Token" />
          <span class="err" v-show="!vaildate">{{ errTxt }}</span>
        </div>
        <div class="loginbtn" @click="login">
          登录
        </div>

      </div>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {login, getUserInfo} from 'api/login/login'
  import {setSession} from 'js/util'

  export default {
    data () {
      return {
        token: '',
        vaildate: true,
        errTxt: ''
      }
    },
    methods: {
      login () {
        this.token = this.token.trim()
        if (this.token === '') {
          this.vaildate = false
          this.errTxt = '请输入用户名'
          return
        }

        login({accesstoken: this.token}).then((res) => {
          this._getUserInfo(res.data)
        }).catch(() => {
          this.vaildate = false
          this.errTxt = 'Access Token  输入错误'
        })
      },
      _getUserInfo (obj) {
        getUserInfo(obj.loginname).then((res) => {
          let user = Object.assign({}, res.data.data, obj)
          this.setToken({
            token: this.token,
            user: user
          })
          const path = decodeURIComponent(this.$route.query.redirect || '/')
          this.$router.push(path)
          setSession('user', user)
          setSession('token', {token: this.token})
        })
      },
      ...mapActions([
        'setToken'
      ])
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/variable.styl"

  .login
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 3
    .header
      height 3.5rem
      line-height 3.5rem
      background-color #1D8CE0
      text-align center
      font-size 1.2rem
      color #fff
    .content
      width 70%
      margin 45% auto 0
      .input-wrapper
        position relative
        &.err
          input
            border-color #f00
        input
          width 100%
          height 2.8rem
          font-size 1rem
          outline none
          border-bottom 2px solid #eaeaea
        .err
          position absolute
          top 3.2rem
          left 0
          color #f00
          font-size 1rem
      .loginbtn
        height 2.4rem
        line-height 2.4rem
        color #fff
        text-align center
        box-shadow 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)
        background-color $theme-color
        font-size 0.875rem
        margin-top 2.6rem
</style>
