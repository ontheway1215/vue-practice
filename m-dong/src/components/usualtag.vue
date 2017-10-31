<template>
  <div>
    <div class="title">
      <div class="icon"></div>
      <div class="text">常用标签</div>
    </div>
    <div class="usual-word">
      <span class="tag" v-for="item in usualTagArr" @click="searchGif(item)">{{item}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { usualTag } from '@/assets/js/api/usualTag'
  import { ERR_OK } from '@/assets/js/api/config'
  export default {
    data () {
      return {
        usualTagArr: []
      }
    },
    methods: {
      getUsualTag () {
        usualTag().then((res) => {
          if (res.error_code === ERR_OK) {
            this.usualTagArr = res.data
          }
        })
      },
      searchGif (e) {
        this.$router.push({path: '/search/' + e})
        this.$emit('addHistory', e)
      }
    },
    mounted () {
      this.getUsualTag()
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .title
    display: flex
    flex-direction: row
    .icon
      width: 20px
      height: 20px
      background: url(../assets/images/icon-usual-search.png) no-repeat 100% 100%
      background-size: contain
    .text
      margin-left: 8px
      font-size: 16px
      color: #fff
  .usual-word
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-start
    .tag
      padding: 5px 15px
      background: #212121
      color: #fff
      font-size: 14px
      border-radius: 3px
      margin: 5px
</style>
