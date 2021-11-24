import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state(){
      return {
        page:'Dashboard'
        }
    },
    mutations: {
      renamePage (state, rename){
        state.page = rename
      },
      
    },
    actions: {
      
    }
  });

export default store;
