<template>
  <div>
    <div class="search-bar">
      <router-link to="/" v-if="!showCategory">
        <div class="logo">
          <img src="../assets/images/logo.png" alt="logo">
        </div>
      </router-link>
      <div class="title" v-if="showCategory">全部频道</div>
      <div class="search" v-if="!showCategory">
        <search
          @result-click="resultClick"
          :results="results"
          v-model="value"
          position="absolute"
          auto-scroll-to-top top="0px"
          @on-focus="onFocus"
          @on-cancel="onCancel"
          @on-submit="onSubmit"
          ref="search"></search>
      </div>
      <div class="switch" @click="switchTab">
        <img :src='switchIcon' alt="切换">
      </div>
    </div>
    <transition name="component-fade" mode="out-in">
      <div class="nav" v-if="showCategory">
        <ul>
          <li v-for="item in categoryArr">
            <a :href="'/search/' + item.text">
              <img :src="item.background" alt="item.text">
              <span class="text">#{{item.text}}</span>
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Search } from 'vux'
  import { ERR_OK } from '@/assets/js/api/config'
  import { Category } from '@/assets/js/api/category'
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        results: [],
        categoryArr: [],
        showCategory: false,
        switchIcon: 'https://static.dongtu.com/icon-switch.png'
      }
    },
    components: {
      Search
    },
    methods: {
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      onSubmit (evt) {
        this.$refs.search.setBlur()
        console.log(evt)
        this.$emit('submit', evt)
      },
      onFocus (evt) {
        console.log('on focus')
        this.$emit('focus', evt)
      },
      onCancel (evt) {
        console.log('on cancel')
        this.$emit('cancel', evt)
      },
      switchTab () {
        this.showCategory = !this.showCategory
        this.$emit('switchTab', this.showCategory)
        this.switchIcon = this.showCategory ? 'https://static.dongtu.com/icon-close.png' : 'https://static.dongtu.com/icon-switch.png'
      },
      getCategory () {
        Category().then((res) => {
          if (res.error_code === ERR_OK) {
            this.categoryArr = res.data_list
          }
        })
      }
    },
    mounted () {
      this.getCategory()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .component-fade-enter-active, .component-fade-leave-active
    transition: opacity .3s ease
  .component-fade-enter, .component-fade-leave-active
    opacity: 0
  .search-bar
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 0 10px
    background: #000
    .title
      font-size: 20px
      color: #fff
      height: 44px
      line-height: 44px
    .logo
      flex: 0 0 83px
      width: 83px
      height: 44px
      display: flex
      align-items: center
      img
        width: 100%
    .search
      flex: 1
      margin: 0 10px
    .switch
      display: flex
      align-items: center
      justify-content: center
  .nav
    margin: 0 1%
    ul
      display: flex
      flex-direction: row
      flex-wrap: wrap
      li
        position: relative
        width: 48%
        height: 200px
        margin: 1%
        box-sizing: border-box
        .text
          position: absolute
          left: 50%
          top: 50%
          transform: translate(-50%, -50%)
          font-size: 18px
          color: #fff
        img
          width: 100%
          height: 100%
          opacity: 0.5
          object-fit: cover
</style>
