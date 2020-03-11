<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="tips">ewrewrewrewr</div>
    <div class="tips">ewrewrewrewr</div>
    <div class="tips">ewrewrewrewr</div>
    <div class="tips">ewrewrewrewr</div>
    <div class="tips">ewrewrewrewr</div>
    <div class="tips">ewrewrewrewr</div>
    <div class="tips">ewrewrewrewr</div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss" scoped>
.tips {
  color: $color-theme;
}
</style>
