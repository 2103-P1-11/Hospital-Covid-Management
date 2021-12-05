import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state() {
    return {
      page: 'Dashboard',
      patientName: '',
      patientID: '',
      hospitalID: '',
      wardID: '',
    }
  },
  mutations: {
    renamePage(state, rename) {
      state.page = rename
    },
    renamePatient(state, n) {
      state.patientName -= n
    },
    renameID(state, n) {
      state.patientID -= n
    },
    renameHospital(state, n) {
      state.hospitalID -= n
    },
    renameWard(state, n) {
      state.wardID -= n
    },

  },
  actions: {
    changeUser({ commit }, name) {
      setTimeout(() => {
        commit('userName', name)
      }, 1000)
    },
  }
});

export default store;
