<template>
  <transition appear name="slide">
    fasdf
    <div class="music-list">
      dfsfasdf
    </div>
    <!-- <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list> -->
  </transition>
</template>
<style lang='scss' scoped>
@import "./index.scss";
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
