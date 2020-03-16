<template>
  <div class="singer-page">
    <ListView :data="singerList"></ListView>
  </div>
</template>

<script>
import { getSingerList } from 'api/singerList'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listView/'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
  name: 'singerList',
  data() {
    return {
      singerList: []
    }
  },
  components: {
    ListView
  },
  async created() {
    this.getSingerListData()
  },
  methods: {
    // 获取歌手数据
    async getSingerListData() {
      const { code, data: { list }} = await getSingerList()
      if (code === ERR_OK) {
        this.singerList = this.normalizeSinger(list)
        console.log(this.singerList)
      }
    },
    // 格式化数据
    normalizeSinger(list) {
      const map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      // 数据分类
      list.forEach((item, index) => {
        // 获取热榜
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }

        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      // 为了得到有序列表，需要处理
      const ret = []
      const hot = []
      for (const key in map) {
        const val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 按照a-z排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>
<style lang="scss" >
@import "./index.scss";
</style>
