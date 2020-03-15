<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: false
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    direction: {
      type: String,
      default: DIRECTION_V
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
      })
      // 滚动过程中，具体时机取决于选项中的 probeType。
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      // 滚动结束
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
      // 滚动开始之前
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    // 禁用 better-scroll
    disable() {
      this.scroll && this.scroll.disable()
    },
    // 启用 better-scrol
    enable() {
      this.scroll && this.scroll.enable()
    },
    // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 滚动到指定的位置
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 滚动到指定的目标元素
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
