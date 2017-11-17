<template>
  <div class="container" v-show="tagArr.length > 0">
    <searchbar @focus="onFocus" @cancel="onCancel" @submit="onSubmit" @switchTab="switchCategory"></searchbar>
    <div class="main" v-if="mainPage" :style="{position: mainPosition}">
      <hottag :tagArr="tagArr"></hottag>
      <div class="hot-gif">
        <h2>热门动图</h2>
        <waterfall :waterfallData="hotGif" :isLoading="isLoading" :noMore="noMore"></waterfall>
      </div>
    </div>
    <div class="search-input-page" v-if="searchInputPage">
      <historysearch :historyArr="historyArr" @clear="clearHistory"></historysearch>
      <usualtag class="usual-tag" @addHistory="onAddHistory"></usualtag>
    </div>
    <Foot v-if="!searchInputPage"></Foot>
  </div>
</template>

<script type="text/ecmascript-6">
  import searchbar from '@/components/searchbar'
  import hottag from '@/components/hottag'
  import historysearch from '@/components/historysearch'
  import usualtag from '@/components/usualtag'
  import Foot from '@/components/footer'
  import waterfall from '@/components/waterfall'
  import { hotGif } from '@/assets/js/api/hotgif'
  import { hotTag } from '@/assets/js/api/hottag'
  import { ERR_OK } from '@/assets/js/api/config'
  import { IsPC } from '@/assets/js/util'
  export default {
    data () {
      return {
        searchInputPage: false,
        mainPage: true,
        historyArr: [],
        mainPosition: 'static',
        tagArr: [],
        hotGif: [],
        isLoading: false,
        noMore: false,
        p: 1,
        isFinished: true
      }
    },
    components: {
      searchbar,
      hottag,
      historysearch,
      usualtag,
      Foot,
      waterfall
    },
    methods: {
      onFocus () {
        this.mainPage = false
        this.searchInputPage = true
      },
      onCancel () {
        this.mainPage = true
        this.searchInputPage = false
      },
      clearHistory () {
        this.historyArr = []
        localStorage.removeItem('historyArr')
      },
      onSubmit (evt) {
        var q = evt
        this.addToHistory(q)
        this.historyArr.unshift(q)
        localStorage.setItem('historyArr', this.historyArr)
        this.$router.push({path: '/search/' + q})
      },
      getHistory () {
        this.historyArr = localStorage.getItem('historyArr') ? localStorage.getItem('historyArr').split(',') : []
      },
      switchCategory (msg) {
        this.mainPosition = msg ? 'fixed' : 'static'
      },
      addToHistory (q) {
        var historyArr = this.historyArr
        if (historyArr) {
          for (var i = 0; i < historyArr.length; i++) {
            if (historyArr && q === historyArr[i]) {
              historyArr.splice(i, 1)
            }
          }
        }
      },
      onAddHistory (e) {
        this.addToHistory(e)
        this.historyArr.unshift(e)
        localStorage.setItem('historyArr', this.historyArr)
      },
      onResize () {
        if (IsPC()) {
          window.location.href = 'http://dongtu.com'
        }
      },
      _getHotGif () {
        hotGif(this.p).then((res) => {
          if (res.error_code === ERR_OK) {
            this.hotGif = res.data_list
          }
        })
      },
      handleScroll () {
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
          if (this.isFinished) {
            setTimeout(() => {
              this.p = this.p + 1
              this._getLoadMore(this.p)
              this.isFinished = false
            }, 500)
          }
        }
      },
      _getLoadMore (p) {
        this.isLoading = true
        hotGif(p).then((res) => {
          if (res.error_code === ERR_OK) {
            this.hotGif.push.apply(this.hotGif, res.data_list)
            if (res.data_list.length === 0) {
              this.isFinished = false
              this.noMore = true
            } else {
              this.isFinished = true
              this.noMore = false
            }
            this.isLoading = false
          }
        })
      }
    },
    created () {
      hotTag().then((res) => {
        if (res.error_code === ERR_OK) {
          this.tagArr = res.data_list.slice(0, 7)
        }
      })
    },
    mounted () {
      this.onResize()
      window.addEventListener('resize', this.onResize)
      this.getHistory()
      this._getHotGif()
      window.addEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .container
    background: #191919
    min-height: 100vh
    .main
      display: block
      .hot-gif
        background: #191919
        margin: 0 10px
        h2
          font-size: 22px
          color: #fff
          padding: 10px 0
          text-align: left
    .search-input-page
      padding: 0 10px
      display: block
      .usual-tag
        margin-top: 20px
</style>
