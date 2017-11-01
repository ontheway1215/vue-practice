<template>
  <div class="container">
    <searchbar @focus="onFocus" @cancel="onCancel" @submit="onSubmit" @switchTab="switchCategory"></searchbar>
    <div class="main" v-if="mainPage" :style="{position: mainPosition}">
      <hottag :tagArr="tagArr"></hottag>
      <hotgif></hotgif>
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
  import hotgif from '@/components/hotgif'
  import historysearch from '@/components/historysearch'
  import usualtag from '@/components/usualtag'
  import Foot from '@/components/footer'
  import { hotTag } from '@/assets/js/api/hottag'
  import { ERR_OK } from '@/assets/js/api/config'
  export default {
    data () {
      return {
        searchInputPage: false,
        mainPage: true,
        historyArr: [],
        mainPosition: 'static',
        tagArr: []
      }
    },
    components: {
      searchbar,
      hottag,
      hotgif,
      historysearch,
      usualtag,
      Foot
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
        console.log(window.innerWidth)
        if (window.innerWidth > 414) {
          window.location.href = 'http://dongtu.com'
        }
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
      this.getHistory()
      this.onResize()
      window.addEventListener('resize', this.onResize)
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .container
    background: #191919
    min-height: 100vh
    .main
      display: block
    .search-input-page
      padding: 0 10px
      display: block
      .usual-tag
        margin-top: 20px

</style>
