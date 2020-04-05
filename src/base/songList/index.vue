<template>
  <div class="song-list">
    <ul v-if="songsData">
      <li v-for="(song,index) in songsData" :key="song.id" class="item" @click="selectSong(song, index)">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getSongDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    songsData: {
      type: Array,
      default: () => []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getSongDesc(song) {
      return `${song.singer} - ${song.album}`
    },
    selectSong(song, index) {
      this.$emit('select', song, index)
    },
    getRankCls(index) {
      if (index < 3) {
        return `icon icon${index}`
      }
      return 'text'
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1
      }
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
