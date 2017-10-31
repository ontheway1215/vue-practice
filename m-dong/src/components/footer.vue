<template>
  <div class="footer">
    <div class="info">
      <div>动图宇宙 © 2017&nbsp;&nbsp;</div>
      <router-link to="/agreement">
        <div class="agreement">|&nbsp;&nbsp;用户协议&nbsp;&nbsp;|</div>
      </router-link>
      &nbsp;
      <a href="mailto:business@dongtu.com">
        <div>&nbsp;&nbsp;联系我们</div>
      </a>
    </div>
    <div class="beian">沪ICP备10216111号-4</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .footer
    padding: 15px 0
    font-size: 10px
    color: #C0C0C0
    .info
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      a
        font-size: 10px
        color: #C0C0C0
    .beian
      padding-top: 5px
      text-align: center
</style>
