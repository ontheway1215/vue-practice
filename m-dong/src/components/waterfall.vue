<template>
  <div class="waterfall-wrapper">
    <waterfall
      :align="align"
      :line-gap="180"
      :min-line-gap="100"
      :max-line-gap="280"
      :single-max-width="280"
      :watch="waterfallData"
      ref="waterfall"
    >
      <waterfall-slot
        v-for="(item, index) in waterfallData"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="item.index"
        move-class="item-move"
      >
        <div class="img-wrapper" :style="{backgroundColor: '#262626'}">
          <a :href="'/gifdetail/' + item.guid">
            <!--<img v-if="isSupportWebp" v-lazy="item.webp || item.main" class="" :alt="item.text" :title="item.text">-->
            <img v-lazy="item.main" class="" :alt="item.text" :title="item.text">
          </a>
        </div>
      </waterfall-slot>
    </waterfall>
    <loading v-show="isLoading"></loading>
    <div class="noMore" v-show="noMore">
      没有更多动图了
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Waterfall from '@/components/base/waterfall'
  import WaterfallSlot from '@/components/base/waterfall-slot'
  import Loading from '@/components/loading'
  import Vue from 'vue'
  import VueLazyload from 'vue-lazyload'
  Vue.use(VueLazyload, {
//    loading: 'http://cdn.uehtml.com/201402/1392662529680_1140x0.gif'
  })
  export default {
    props: {
      waterfallData: {
        type: Array,
        default: []
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      noMore: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        align: 'center',
        randomColor: '',
        isSupportWebp: false
      }
    },
    components: {
      Waterfall,
      WaterfallSlot,
      Loading
    },
    methods: {
      _isSupportWebp () {
        let isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
        if (isSupportWebp) {
          this.isSupportWebp = true
        } else {
          this.isSupportWebp = false
        }
      },
      _refresh () {
        this.$router.go(0)
      }
    },
    mounted () {
      this._isSupportWebp()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .waterfall-wrapper
    width: 100%
    .img-wrapper
      position: absolute
      overflow: hidden
      top: 5px
      left: 5px
      right: 5px
      bottom: 5px
      font-size: 1.2em
      a
        display: inline-block
        width: 100%
        height: 100%
        &:hover > img
          transform: scale(1.1)
          transition: all 1s
          cursor: pointer
      .shadow
        height: 35px
        line-height: 38px
        background: -webkit-gradient(linear, 0% 0%, 0% 95%,from(rgba(0,0,0,0.005)), to(rgba(0,0,0,0.9)))
        position: absolute
        bottom:0
        color: #fff
        font-size: 14px
        transition: all 1s
        opacity: 0
        z-index: 101
        width:100%
        span
          margin-left: 15px
      &:hover > .shadow
        opacity: 1
      .tag
        position: absolute
        display: flex
        flex-direction: column
        align-items: center
        justify-items: center
        justify-content: center
        z-index: -999
        width: 100%
        height: 100%
        span
          margin-top: 10px
          padding: 0 15px
          font-size: 12px
          color: #fff
      img
        width: 100%
        position: absolute
        left: 0
        transform: scale(1)
        transition: all 1s
      img[lazy=loading]
        width: 100%
        height: 100%
        object-fit: cover
  .noMore
    text-align: center
    font-size: 16px
    color: #A4A4A4
    padding: 20px 0 20px 0
  .item:after {
    content: attr(index);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
</style>
