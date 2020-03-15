<template>
  <div class="recommend">
    <ScrollView class="recommend-content" ref="scroll" :data="discList" :listenPullingUp="listenPullingUp" :scrollbar="scrollbar" :pullUpLoad="pullUpLoad" :listenPullingDown="listenPullingDown" :pullDownRefresh="pullDownRefresh" @pullingUp="pullingUp" @pullingDown="pullingDown">
      <div>
        <div v-if="sliderList.length" class="slider-wrapper">
          <div class="slider-content">
            <slider ref="slider">
              <div v-for="(item,index) in sliderList" :key="index">
                <a :href="item.jump_info.url">
                  <img class="needsclick" @load="loadImg" :src="item.pic_info.url" />
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list" v-if="discList.length>0">
          <h1 class="recommend-list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item,index) in discList" class="recommend-list-item" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading />
      </div>
    </ScrollView>
  </div>
</template>

<script>
import { getSliderList, getDiscList } from 'api/recommend'
import Slider from 'base/slider/'
import ScrollView from 'base/scroll-view/'
import Loading from 'base/loading/'
import { ERR_OK } from 'api/config'

export default {
  name: 'recommend',
  components: {
    Slider, ScrollView, Loading
  },
  data() {
    return {
      sliderList: [],
      discList: [],
      // 上拉加载配置项
      pullUpLoad: {
        threshold: 20
      },
      // 滚动条配置项
      scrollbar: {
        fade: true
      },
      // 下拉刷新配置项
      pullDownRefresh: {
        threshold: 50,
        stop: 20
      },
      listenPullingUp: true, // 是否监听上拉加载
      listenPullingDown: true // 是否监听下拉刷新
    }
  },
  async created() {
    this.getSliderListData()
    this.getDiscListData()
  },
  methods: {
    // 获取轮播图信息
    async getSliderListData() {
      const { code, focus: { data }} = await getSliderList()
      if (code === ERR_OK) {
        this.sliderList = data.content
      }
    },
    // 获取热门歌单
    async getDiscListData() {
      const { code, data } = await getDiscList()
      if (code === ERR_OK) {
        this.discList = data.list
      }
    },
    // 轮播图片加载完成重新计算 better-scroll
    loadImg() {
      if (!this.checkloaded) {
        this.checkloaded = true
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    },
    // 下拉刷新
    pullingDown() {
      console.log('dfasf')
      this.$refs.scroll.finishPullDown()
    },
    // 上拉加载
    pullingUp() {
      console.log('lai')
    },
    // 打开歌单
    selectItem(item) {
      console.log(item)
    }
  }
}
</script>
<style lang="scss" >
@import "./index.scss";
</style>
