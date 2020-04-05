<template>
  <div class="music-list">
    <div class="head-box flex-align-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
    </div>
    <div class="bg-image" ref="bgImage" :style="bgStyle">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songsData.length>0" class="play" @click="randomPlaySong">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scrollView :data="songsData" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songsData="songsData" :rank="rank" @select="selectSong" />
      </div>
      <div class="loading-container" v-show="!songsData || !songsData.length">
        <loading />
      </div>
    </scrollView>
  </div>
</template>
<script>
import ScrollView from 'base/scroll-view/'
import SongList from 'base/songList/'
import Loading from 'base/loading/'
import { prefixStyle } from 'utils/dom'

const RESERVED_HEIGHT = 40 // 标题高度
let minTranslateY = 0 // 歌单滚动最小坐标 Y
let imgHeight = 0 // 背景图片高度

const transform = prefixStyle('transform') // transform 添加css前缀
const backdrop = prefixStyle('backdrop-filter')

export default {
  name: 'musicList',
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    songsData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      rank: true,
      listenScroll: true,
      probeType: 3,
      scrollY: -1
    }
  },
  mounted() {
    imgHeight = this.$refs.bgImage.clientHeight
    minTranslateY = -imgHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${imgHeight}px`
  },
  methods: {
    // 返回
    back() {
      this.$router.back()
    },
    // 滚动
    scroll(pos) {
      this.scrollY = pos.y
    },
    selectSong() {

    },
    randomPlaySong() {

    }
  },
  watch: {
    scrollY(newVal) {
      const translateY = Math.max(minTranslateY, newVal) // 返回最大值
      let scale = 1// 图片放大倍数
      let zIndex = 0
      let blur = 0 // 高斯模糊比例
      const percent = Math.abs(newVal / imgHeight) // 比例
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`

      if (newVal < minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImage})`
    }
  },
  components: {
    SongList, ScrollView, Loading
  }
}
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>
