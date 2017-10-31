<template>
  <div class="hot-gif">
    <h2>热门动图</h2>
    <waterfall :waterfallData="hotGif" :isLoading="isLoading" :noMore="noMore"></waterfall>
  </div>
</template>

<script type="text/ecmascript-6">
  import waterfall from '@/components/waterfall'
  import { hotGif } from '@/assets/js/api/hotgif'
  import { ERR_OK } from '@/assets/js/api/config'
  export default {
    data () {
      return {
        hotGif: [],
        isLoading: false,
        noMore: false
      }
    },
    components: {
      waterfall
    },
    methods: {
      _getHotGif () {
        hotGif().then((res) => {
          if (res.error_code === ERR_OK) {
            this.hotGif = res.data_list
          }
        })
      }
    },
    mounted () {
      this._getHotGif()
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .hot-gif
    background: #191919
    margin: 0 10px
    h2
      font-size: 22px
      color: #fff
      padding: 10px 0
      text-align: left
</style>
