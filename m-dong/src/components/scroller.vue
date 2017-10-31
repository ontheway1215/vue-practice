<template>
  <div>
    <scroller lock-x height="" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="0">
      <div class="box2">
        <Waterfall :waterfallData="searchResults" :isLoading="isLoading" :noMore="noMore"></Waterfall>
        <load-more tip="正在加载中..."></load-more>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Scroller, LoadMore } from 'vux'
  import Waterfall from '@/components/waterfall'
  import { searchResult } from '@/assets/js/api/search'
  import { ERR_OK } from '@/assets/js/api/config'
  export default {
    components: {
      Scroller,
      LoadMore,
      Waterfall
    },
    data () {
      return {
        onFetching: false,
        bottomCount: 20,
        searchResults: [],
        isLoading: false,
        noMore: false,
        page: 1
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getSearchResult()
        this.$refs.scrollerBottom.reset()
      })
    },
    methods: {
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          this.page ++
          searchResult('哈哈', this.page, 20).then((res) => {
            if (res.error_code === ERR_OK) {
              this.searchResults = this.searchResults.concat(res.gifs)
            }
          })
          setTimeout(() => {
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      },
      getSearchResult () {
        searchResult('哈哈', 1, 20).then((res) => {
          if (res.error_code === ERR_OK) {
            this.searchResults = res.gifs
            this.count = res.count
          }
        })
      }
    }
  }
</script>

<style scope>

</style>
