<template>
  <div class="search">
    <searchbar @focus="onFocus" @cancel="onCancel" :value="value" @submit="onSubmit" @switchTab="switchCategory"></searchbar>
    <div class="search-result">
      <!--<div class="box" v-if="boxShow"></div>-->
      <div class="count">共{{count}}条结果</div>
      <div class="result-wrapper">
        <Waterfall :waterfallData="searchResults" :isLoading="isLoading" :noMore="noMore"></Waterfall>
      </div>
    </div>
    <div class="no-result" v-show="count === 0">
      <div class="icon">
        <img src="../assets/images/icon-noresult.png" alt="没有结果">
      </div>
      <span class="text">哎呀，没搜到相关动图</span>
      <div class="info-btn" @click="showCategory">试试按频道浏览</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Search } from 'vux'
  import Waterfall from '@/components/waterfall'
  import { searchResult } from '@/assets/js/api/search'
  import searchbar from '@/components/searchbar'
  import { ERR_OK } from '@/assets/js/api/config'
  import { ipCheck } from '@/assets/js/api/ipcheck'
  import { IsPC } from '@/assets/js/util'
  export default {
    data () {
      return {
        searchResults: [],
        value: '',
        isLoading: true,
        noMore: false,
        count: null,
        boxShow: false,
        currentP: 1,
        isFinished: true,
        isShowCategory: false
      }
    },
    components: {
      Search,
      Waterfall,
      searchbar
    },
    methods: {
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      onSubmit (evt) {
        let q = evt
//        this.$refs.search.setBlur()
        this.boxShow = true
        this.$router.push({path: '/search/' + q})
        this.getSearchResult()
      },
      onFocus () {
        this.boxShow = true
      },
      onCancel () {
        this.boxShow = false
      },
      switchCategory (msg) {
        this.mainPosition = msg ? 'fixed' : 'static'
      },
      showCategory () {
        this.$router.push({path: '/'})
      },
      getSearchResult () {
        this.isLoading = true
        let q = window.location.pathname.split('/')[2]
        this.value = decodeURI(q)
        ipCheck(q).then((res) => {
          if (res.error_code === 10001) {
            searchResult(q, 1, 20).then((res) => {
              if (res.error_code === ERR_OK) {
                this.searchResults = res.gifs
                this.count = res.count
                this.isLoading = false
              }
            })
          } else {
            let ipCode = res.data.inner_link ? res.data.inner_link : ''
            this.$router.push({path: '/u/' + ipCode})
          }
        })
      },
      handleScroll () {
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
          var currentSearchWord = window.location.pathname.split('/')[2] || ''
          if (this.isFinished) {
            setTimeout(() => {
              this.currentP = this.currentP + 1
              this._getLoadMore(decodeURI(currentSearchWord), this.currentP, 20)
              this.isFinished = false
            }, 500)
          }
        }
      },
      _getLoadMore (q, p, size) {
        this.isLoading = true
        searchResult(q, p, size).then((res) => {
          if (res.error_code === ERR_OK) {
            this.searchResults.push.apply(this.searchResults, res.gifs)
            if (res.gifs.length === 0) {
              this.isFinished = false
              this.noMore = true
            } else {
              this.isFinished = true
              this.noMore = false
            }
            this.isLoading = false
          }
        })
      },
      onResize () {
        if (IsPC()) {
          window.location.href = `http://192.168.19.173:7000/search/${this.value}`
        }
      }
    },
    mounted () {
      this.getSearchResult()
      window.addEventListener('scroll', this.handleScroll)
      this.onResize()
      window.addEventListener('resize', this.onResize)
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .search
    /*min-height: 100vh*/
    background: #191919
    .search-wrapper
      display: flex
      flex-direction: row
      align-items: center
      .logo
        margin-left: 10px
        height: 30px
        img
          height: 100%
    .search-result
      padding: 0 7px
      .box
        width: 100%
        height: 14px
      .count
        padding: 8px 0 4px 0
        text-align: left
        font-size: 14px
        color: rgba(255, 255, 255, 0.5)
    .no-result
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      margin-top: 40%
      .text
        margin: 10px 0
        font-size: 14px
        color: #787878
      .info-btn
        color: #D8D8D8
        font-size: 14px
        padding: 5px 15px
        background: -webkit-gradient(linear, left top, right bottom, from(#EA0B86), to(#9933FF))
</style>
