<template>
  <div class="recommend">
    <ScrollView class="recommend-content" ref="scroll" :data="discList" :listenPullingUp="listenPullingUp" :pullUpLoad="pullUpLoad" @pullingUp="pullingUp">
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
        <div class="recommend-list">
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
    </ScrollView>

  </div>
</template>

<script>
import { getSliderList, getDiscList } from 'api/recommend'
import Slider from 'base/slider/'
import ScrollView from '@/base/scroll-view/'

import { ERR_OK } from 'api/config'

export default {
  name: 'recommend',
  components: {
    Slider, ScrollView
  },
  data() {
    return {
      sliderList: [],
      discList: [],
      pullUpLoad: {
        threshold: 20
      }
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
    listenPullingUp() {

    },
    pullingUp() {
      console.log('lai')
    }
  }
}
</script>
<style lang="scss" >
@import "./index.scss";
</style>
