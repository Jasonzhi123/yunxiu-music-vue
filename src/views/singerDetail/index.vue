<template>
  <transition appear name="slide">
    <music-list :title="title" :bgImage="bgImage" :songsData="songList"></music-list>
  </transition>
</template>
<script>
import { getSingerSongList } from 'api/singerInfo'
import { createNamespacedHelpers, mapState } from 'vuex'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import MusicList from 'components/musicList/'
const { mapGetters } = createNamespacedHelpers('singer')

export default {
  name: 'singerDetail',
  components: {
    MusicList
  },
  data() {
    return {
      songList: []
    }
  },
  created() {
    this.getSingerSongListData()
  },
  methods: {
    async getSingerSongListData() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      const { code, singerSongList } = await getSingerSongList(this.singer)
      if (code === ERR_OK) {
        this.songList = this.normallizeSong(singerSongList.data.songList)
        console.log(this.songList)
      }
    },
    // 格式化数据
    normallizeSong(data) {
      return data.map(item => {
        return createSong(item.songInfo)
      })
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      console.log(this.singer.avatar)
      return this.singer.avatar
    },
    ...mapState({
      singer: state => state.singer.singer
    }),
    ...mapGetters(['getSinger'])
  }
}

</script>
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
