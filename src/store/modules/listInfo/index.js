// import IPDService from '@/services/IPD/IPD'
const state = {
  statusCustomer: null,
  isLocked: null,
  addRessCustomer: null,
  InitialAssessmentForPediatricInPatient: null,
  currentFormId: null
}
const getters = {
  getCurrentFormId: state => {
    return state.currentFormId
  },
  getStatusCustomer: state => {
    return state.statusCustomer
  },
  getIsLocked: state => {
    return state.isLocked
  },
  getAddress: state => {
    return state.addRessCustomer
  },
  getInitialAssessmentForPediatricInPatient: state => {
    return state.InitialAssessmentForPediatricInPatient
  }
}
const mutations = {
  setCurrentFormId: (state, payload) => {
    state.currentFormId = payload
  },
  setStatusCustomer: (state, data) => {
    state.statusCustomer = data
  },
  setIsLocked: (state, data) => {
    state.isLocked = data
  },
  setAddress: (state, data) => {
    state.addRessCustomer = data
  },
  setInitialAssessmentForPediatricInPatient: (state, data) => {
    state.InitialAssessmentForPediatricInPatient = data
  }
}
const actions = {
  setCurrentFormId: ({ commit }, payload) => {
    commit('setCurrentFormId', payload)
  },
  setStatusCustomer ({ commit }, data) {
    commit('setStatusCustomer', data)
  },
  setIsLocked ({ commit }, data) {
    commit('setIsLocked', data)
  },
  setAddress ({ commit }, data) {
    commit('setAddress', data)
  },
  setInitialAssessmentForPediatricInPatient ({ commit }, data) {
    commit('setInitialAssessmentForPediatricInPatient', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
