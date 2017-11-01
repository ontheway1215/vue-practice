<template>
  <div class="ipPage">
    <searchbar @focus="onFocus" @cancel="onCancel" @submit="onSubmit" @switchTab="switchCategory"></searchbar>
    <div class="banner" @click="showInfo">
      <img :src="ipDetailArr.miniBanner" alt="">
      <div class="info-wrapper">
        <div class="name-wrapper">
          <h2 class="name">{{ipDetailArr.name}}</h2>
          <div class="official">官方主页</div>
        </div>
        <div class="miniinfo">
          <span class="text">{{ipDetailArr.description}}</span>
          <span class="icon"></span>
        </div>
      </div>
    </div>
    <div class="pic-wrapper">
      <Waterfall :waterfallData="picArr" :isLoading="isLoading" :noMore="noMore"></Waterfall>
    </div>
    <Popup v-model="show" class="showDetail">
      <div class="detail-wrapper">
        <h2 class="name">{{ipDetailArr.name}}</h2>
        <span class="icon" @click="closeDetail"></span>
      </div>
      <div class="content">
        {{ipDetailArr.description}}
      </div>
    </Popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Popup } from 'vux'
  import searchbar from '@/components/searchbar'
  import { ERR_OK } from '@/assets/js/api/config'
  import { ipDetail } from '@/assets/js/api/ipdetail'
  import Waterfall from '@/components/waterfall'
  export default {
    components: {
      searchbar,
      Waterfall,
      Popup
    },
    data () {
      return {
        isLoading: false,
        noMore: false,
        show: false,
        ipDetailArr: [],
        picArr: [],
        q: ''
      }
    },
    methods: {
      switchCategory (msg) {
        this.mainPosition = msg ? 'fixed' : 'static'
      },
      onSubmit (evt) {
        var q = evt
        this.$router.push({path: '/search/' + q})
      },
      onFocus () {
        console.log('focus')
      },
      onCancel () {
        console.log('cancel')
      },
      showInfo () {
        this.show = true
      },
      closeDetail () {
        this.show = false
      },
      getIpDetail () {
        const q = window.location.pathname.split('/')[2]
        this.q = q
        console.log(decodeURI(q))
        ipDetail(q).then((res) => {
          if (res.error_code === ERR_OK) {
            this.ipDetailArr = res.data
            this.picArr = res.data.emoticionList
          }
        })
      },
      onResize () {
        if (window.innerWidth > 414) {
          window.location.href = `http://dongtu.com/u/${this.q}`
        }
      }
    },
    mounted () {
      this.onResize()
      window.addEventListener('resize', this.onResize)
      this.getIpDetail()
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .ipPage
    .banner
      position: relative
      img
        width: 100%
        opacity: 0.9
      .info-wrapper
        position: absolute
        bottom: 10px
        width: 100%
        .name-wrapper
          padding: 0 30px
          display: flex
          flex-direction: row
          align-items: center
          .official
            font-size: 10px
            color: #fff
            padding: 1px 3px
            margin-left: 3px
            background: -webkit-gradient(linear, left top, right bottom, from(#EA0B86), to(#9933FF))
          h2
            text-align: left
            color: #fff
            font-size: 14px
        .miniinfo
          display: flex
          flex-direction: row
          justify-content: center
          padding:0 30px
          .text
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
            font-size: 12px
            color: #BCBCBC
          .icon
            flex: 0 0 21px
            margin-left: 15px
            width: 21px
            height: 21px
            background: url("../assets/images/icon-ellipsis.png") no-repeat 100% 100%
            background-size: contain
    .showDetail
      background: #000
      .detail-wrapper
        margin-top: 20px
        padding: 0 30px
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        .name
          color: #fff
          font-size: 14px
        .icon
          width: 11px
          height: 11px
          background: url("../assets/images/icon-close.png") no-repeat 100% 100%
          background-size: contain
      .content
        padding: 0 30px
        color: #fff
        text-align: justify
        letter-spacing: 1px
        font-size: 12px
        margin: 20px 0

</style>
