// import * as mutationTypes from '../mutationTypes'

const state = {
  singer: {}
}

const actions = {
}

const mutations = {
  setSinger(state, res) {
    state.singer = res
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
