<template>
  <div class="detail">
    <Searchbar @switchTab="switchCategory" @submit="onSubmit"></Searchbar>
    <div class="pic-content" :style="{position: mainPosition}">
      <div class="pic-wrapper" v-show="gifDetail.main">
        <div class="pic">
          <img :src="gifDetail.main" alt="">
        </div>
        <div class="info">
          <span class="finger"></span>
          <span class="text">长按保存图片 ({{gifDetail.width}} * {{gifDetail.height}}px)</span>
        </div>
      </div>
      <div class="relation-tag">
        <a :href="ipList.inner_link" v-if="ipList">
          <div class="ip-tag">
            <img :src="ipList.icon" alt="">
            <span class="tag" style="margin-left: 0">{{ipList.name}}</span>
          </div>
        </a>
        <div class="tag" v-for="item in gifDetail.keywords">
          <a :href="'/search/' + item">
            <span class="tag">{{item}}</span>
          </a>
        </div>
      </div>
      <h2 class="relation-title">相关动图</h2>
      <div class="relation-pic">
        <Waterfall :waterfallData="relationList" :isLoading="isLoading" :noMore="noMore"></Waterfall>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Searchbar from '@/components/searchbar'
  import { gifDetail, getRelation } from '@/assets/js/api/gifdetail'
  import { ERR_OK } from '@/assets/js/api/config'
  import Waterfall from '@/components/waterfall'

  export default {
    data () {
      return {
        gifDetail: [],
        relationList: [],
        relationkeywords: [],
        ipList: [],
        isLoading: false,
        noMore: false,
        guid: '',
        mainPosition: 'static'
      }
    },
    components: {
      Searchbar,
      Waterfall
    },
    methods: {
      getDetailPic () {
        const guid = window.location.pathname.split('/')[2]
        this.guid = guid
        gifDetail(guid).then((res) => {
          if (res.error_code === ERR_OK) {
            this.gifDetail = res.data
            this.ipList = res.data.ip_list[0]
            var word = res.data.keywords.slice(0, 3).join(' ')
            var relationkeywords = res.data.keywords.slice(0, 3)
            this.searchWord = word
            this.relationkeywords = relationkeywords
            getRelation(relationkeywords).then((res) => {
              if (res.error_code === ERR_OK) {
                this.relationList = res.gifs
              }
            })
          }
        })
      },
      switchCategory (msg) {
        this.mainPosition = msg ? 'fixed' : 'static'
      },
      onSubmit (evt) {
        var q = evt
        this.$router.push({path: '/search/' + q})
      },
      onResize () {
        console.log(window.innerWidth)
        if (window.innerWidth > 414) {
          window.location.href = `http://dongtu.com/gifdetail/${this.guid}`
        }
      }
    },
    mounted () {
      this.getDetailPic()
      this.onResize()
      window.addEventListener('resize', this.onResize)
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .detail
    min-height: 100vh
    background: #111
    .pic-content
      padding: 0 10px
      .pic-wrapper
        background: #262626
        .pic
          height: 90%
          img
            height: 100%
            width: 100%
            object-fit: contain
        .info
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          margin-top: 5px
          .finger
            width: 13px
            height: 17px
            background: url('../assets/images/icon-shape.png') no-repeat 100% 100%
            background-size: contain
          .text
            font-size: 11px
            color: #878787
      .relation-tag
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: flex-start
        margin-top: 10px
        .ip-tag
          margin-left: 5px
          display: flex
          flex-direction: row
          align-items: center
          img
            width: 30px
            height: 30px
        .tag
          padding: 5px 15px
          background: #212121
          color: #fff
          font-size: 14px
          border-radius: 3px
          margin: 5px
      .relation-title
        margin: 20px 0
        font-size: 22px
        color: #fff
        text-align: left
</style>
