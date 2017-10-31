<template>
  <div class="hot-tag" ref="hotTag">
    <h2>热门标签</h2>
    <ul>
      <li v-for="items in tagArr">
        <router-link :to="'/search/' + items.text">
          <div class="title">
            <div class="left">
              <div class="bar"></div>
              <div class="tag">{{items.text}}</div>
            </div>
            <div class="right">
              <div class="more"></div>
            </div>
          </div>
        </router-link>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="item in items.emoticions">
              <router-link :to="'/gifdetail/' + item.guid">
                <img :src="item.gif_thumb" width="120" height="90" alt="">
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    name: 'seller',
    props: {
      tagArr: {
        type: Array,
        default: []
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._initPics()
      })
    },
    methods: {
      _initPics () {
        var temArr = null
        temArr = this.tagArr
        if (this.tagArr.length) {
          let picWidth = 120
          let margin = 6
          var picWrapper = document.querySelectorAll('.pic-wrapper')
          var picList = document.querySelectorAll('.pic-list')
//          var width
//          for (var j = 0; j < temArr[0].emoticions.length; j++) {
//            width[i] += (temArr[i].emoticions[j].width / temArr[i].emoticions[j].height)
//          }
          let width = (picWidth + margin) * temArr[0].emoticions.length - margin
          for (let i = 0; i < temArr.length; i++) {
            picList[i].style.width = width + 'px'
            this.picScroll = new BScroll(picWrapper[i], {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
//            this.$nextTick(() => {
//              if (!this.picScroll) {
//                this.picScroll = new BScroll(picWrapper[i], {
//                  scrollX: true,
//                  eventPassthrough: 'vertical'
//                })
//              } else {
//                this.picScroll.refresh()
//              }
//            })
          }
        }
      }
    },
    watch: {
      'tagArr' () {
        this.$nextTick(() => {
          this._initPics()
        })
      }
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .hot-tag
    background: #191919
    margin: 0 10px
    h2
      font-size: 22px
      color: #fff
      padding: 10px 0
      text-align: left
    ul
      line-height: 0
      li
        .title
          display: flex
          flex-direction: row
          align-items: center
          justify-content: space-between
          padding: 15px 0
          .left
            display: flex
            flex-direction: row
            align-items: center
            .bar
              width: 5px
              height: 13px
              background: #00FFFF
            .tag
              margin-left: 5px
              font-size: 16px
              color: #fff
          .right
            display: flex
            align-items: center
            .more
              align-self: flex-end
              width: 17px
              height: 17px
              background: url('../assets/images/icon-arrow-right.png') no-repeat 100% 100%
              background-size: contain
        .pic-wrapper
          overflow hidden
          white-space nowrap
          width 100%
          .pic-list
            font-size 0
            .pic-item
              display inline-block
              margin-right 6px
              height 90px
              &last-child
                margin 0
</style>
