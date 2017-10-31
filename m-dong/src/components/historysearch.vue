<template>
  <transition name="component-fade" mode="out-in">
    <div class="history-search" v-if="historyArr.length">
      <div class="title">
        <div class="left">
          <div class="icon"></div>
          <div class="text">历史搜索</div>
        </div>
        <div class="right" @click="clearLocalStorage">清除历史</div>
      </div>
      <div class="history-word">
        <span class="word" v-for="item in historyArr" @click="searchGif(item)">{{item}}</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      historyArr: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
      }
    },
    methods: {
      clearLocalStorage (evt) {
        this.$emit('clear', evt)
      },
      searchGif (e) {
        this.$router.push({path: '/search/' + e})
      }
    },
    mounted () {

    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .component-fade-enter-active, .component-fade-leave-active
    transition: opacity .3s ease
  .component-fade-enter, .component-fade-leave-active
    opacity: 0
  .history-search
    margin-top: 20px
    .title
      display: flex
      flex-direction: row
      justify-content: space-between
      .left
        display: flex
        flex-direction: row
        align-items: center
        .icon
          width: 22px
          height: 22px
          background: url('../assets/images/icon-history.png') no-repeat 100% 100%
          background-size: contain
        .text
          margin-left: 8px
          font-size: 16px
          color: #fff
      .right
        font-size: 14px
        color: rgba(255, 255, 255, 0.5)
        line-height: 25px
    .history-word
      display: flex
      flex-direction: row
      flex-wrap: wrap
      justify-content: flex-start
      padding: 10px 0
      .word
        padding: 5px 15px
        background: #212121
        color: #fff
        font-size: 14px
        border-radius: 3px
        margin: 5px
</style>
