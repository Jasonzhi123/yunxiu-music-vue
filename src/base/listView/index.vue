<template>
  <ScrollView @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" :data="data" class="listview" ref="listview">
    <ul>
      <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="(item,index) in group.items" :key="index" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
  </ScrollView>
</template>

<script>
import ScrollView from 'base/scroll-view/'
// import Loading from 'base/loading/'
export default {
  name: 'listView',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      probeType: 3,
      listenScroll: true
    }
  },
  components: {
    ScrollView
    // Loading
  },
  async created() {

  },
  methods: {
    scroll() {

    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
