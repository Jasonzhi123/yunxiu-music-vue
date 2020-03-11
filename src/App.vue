<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <keep-alive>
      <router-view />

    </keep-alive>
  </div>
</template>
<script >
import Header from 'components/header/'
import Tab from 'components/tab/'
// import Player from 'components/player/player'

export default {
  components: {
    Header,
    Tab
    // Player
  }
}
</script>

<style lang="scss">
</style>
