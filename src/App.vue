<template>
  <div id="app">
    <my-header></my-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyHeader from 'components/header/header'
  import MyFooter from 'components/footer/footer'

  export default {
    name: 'app',
    components: {
      MyHeader,
      MyFooter
    }
  }
</script>

<style lang="stylus">

</style>
