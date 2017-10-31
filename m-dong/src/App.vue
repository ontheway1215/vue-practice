<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    background: #191919;
    box-sizing: border-box;
    border-bottom:1px solid #191919;
  }
  .weui-search-bar {
    background: #000 !important;
  }
  .weui-search-bar:before {
    border: none !important;
  }
  .weui-search-bar .weui-search-bar__label {
    background: #262626;
  }
  .weui-search-bar .weui-search-bar__form {
    background: #262626;
  }
  .weui-search-bar .weui-search-bar__form:after {
    background: #262626;
    border: none;
  }

  .weui-search-bar_focusing {
    background: #000;
  }
  .weui-search-bar_focusing .weui-search-bar__form {
    background: #fff;
  }
  .weui-search-bar_focusing .weui-search-bar__form:after {
    background: #fff;
  }
  .weui-search-bar_focusing .weui-search-bar__cancel-btn {
    color: #fff;
  }
  .weui-search-bar:after {
    border-bottom: none !important;
  }
  .weui-search-bar__cancel-btn {
    color: #fff;
  }
  @import '~vux/src/styles/reset.less';
</style>
