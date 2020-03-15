<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script>
import { addClass } from 'utils/dom'
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  props: {
    // 是否无限滚动
    loop: {
      type: Boolean,
      default: true
    },
    // 是否自动滚动
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 滚动时间
    interval: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.setSliderWidth()
      this.initDots()
      this.initSlider()
      if (this.autoPlay) {
        this.handleAutoPlay()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider || !this.slider.enabled) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.slider.isInTransition) {
          this.onScrollEnd()
        } else {
          if (this.autoPlay) {
            this.handleAutoPlay()
          }
        }
        this.refresh()
      }, 60)
    })
  },
  deactivated() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  methods: {
    setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      const sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化轮播图
    initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', this.onScrollEnd)
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    refresh() {
      if (this.slider) {
        this.setSliderWidth(true)
        this.slider.refresh()
      }
    },
    onScrollEnd() {
      const pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this.handleAutoPlay()
      }
    },
    // 自动播放
    handleAutoPlay() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    initDots() {
      this.dots = new Array(this.children.length)
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
