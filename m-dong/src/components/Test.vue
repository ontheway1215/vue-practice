<template>
    <section class="container">
      <scroller lock-y :scrollbar-x=false>
        <div class="box1">
          <div class="box1-item" v-for="item in tagArr.emoticions">
            <img :src="item.gif_thumb" alt="">
          </div>
        </div>
      </scroller>
    </section>
</template>

<script type="text/ecmascript-6">
  import { Scroller } from 'vux'
  import { hotTag } from '@/assets/js/api/hottag'
  import { ERR_OK } from '@/assets/js/api/config'
  export default {
    components: {
      Scroller
    },
    methods: {
    },
    data () {
      return {
        tagArr: []
      }
    },
    created () {
      hotTag().then((res) => {
        if (res.error_code === ERR_OK) {
          this.tagArr = res.data_list.slice(0, 7)[0]
          var data = res.data_list.slice(0, 7)
//          var Width = new Array(7)
          for (var j = 0; j < 7; j++) {
            console.log(j)
            for (var i = 0; i < data[0].emoticions.length; i++) {
              console.log(i)
//              Width += (data[j].emoticions[i].width / data[j].emoticions[i].height)
            }
//            console.log(Width)
          }
        }
      })
    }
  }
</script>

<style scope>
  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
</style>
