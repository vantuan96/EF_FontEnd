// import IPDService from '@/services/IPD/IPD'
const state = {
  listShowTabs: [],
  listDoctors: [],
  IsLocked: false
}
const getters = {
  getIsLockedSigns: state => {
    return state.IsLocked
  },
  getListShowTabs: state => {
    return state.listShowTabs
  },
  getListDoctors: state => {
    return state.listDoctors
  }
}
const mutations = {
  setIsLockedSigns: (state, data) => {
    state.IsLocked = data
  },
  setListShowTabs: (state, data) => {
    state.listShowTabs = data
  },
  setListDoctors: (state, data) => {
    state.listDoctors = data
  }
}
const actions = {
  setIsLockedSigns ({ commit }, data) {
    commit('setIsLockedSigns', data)
  },
  setListShowTabs ({ commit }, data) {
    commit('setListShowTabs', data)
  },
  setListDoctors ({ commit }, data) {
    commit('setListDoctors', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
