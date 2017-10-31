<template>
  <div class="agreement">
    <div class="container">
      <router-link to="/" class="head-logo">
        <div class="logo">
          <img src="../assets/images/logo.png" alt="logo">
        </div>
      </router-link>
      <div class="content">
        <h2>用户协议</h2>
        <p>动图宇宙是全球最大的中文动图搜索引擎，本程序是一个可以搜索，查找和自制表情的软件。在这里可以找到最新最热的表情，也可以快速自定义表情。是微信聊天，斗图的制胜法宝，带你装X带你飞。</p>
        <p>法律声明：</p>
        <p>1，部分表情来自网络，其版权归原作者/版权方所有。由于一些图片几次经过转载，导致原作者信息不详，若原作者/版权方有异议，请及时反馈，我们会尽快处理。</p>
        <p>2，用户明确了解并同意：关于本协议服务，动图宇宙不提供任何种类的明示或暗示担保或条件，包括但不限于商业适售性、特定用途适用性等。您对本协议软件及相关服务的使用行为必须自行承担相应风险。</p>
        <p>3，用户明确了解并同意，利用本软件制作的表情或其他内容，用户应遵守国家法律法规、维护公序良俗，保护他人合法权益，动图宇宙在能力范围内尽最大的努力按照相关法律法规进行判断和规避，但并不保证动图宇宙判断完全与司法机关、行政机关的判断一致，如因此产生的后果用户已经理解并同意自行承担。</p>
      </div>
    </div>
    <router-link to="/" class="close-wrapper">
      <div class="close">关闭</div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      onResize () {
        console.log(window.innerWidth)
        if (window.innerWidth > 100) {
          window.location.href = `http://dongtu.com/agreement`
        }
      }
    },
    mounted () {
      this.onResize()
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .agreement
    .container
      padding: 0 10px
      .head-logo
        display: flex
        text-align: left
        padding-top: 5px
      .content
        h2
          text-align: left
          color: #fff
          font-size: 22px
        p
          color: #FFFFFF
          font-size: 12px
          text-align: justify
          padding: 5px 0
    .close-wrapper
      position: fixed
      bottom: 0
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      height: 40px
      font-size: 14px
      color: #fff
      background: -webkit-gradient(linear, left top, right bottom, from(#EA0B86), to(#9933FF))
</style>
