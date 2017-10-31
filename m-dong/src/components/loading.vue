<template>
  <div class="loading-box">
    <div class="cell">
      <img src="../assets/images/loading.gif" alt="加载中">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading-box
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    margin-top:20px
    .cell
      width: 72px
      img
        width: 100%
</style>
