import { createStore } from 'vuex'
import * as auth from '../services/AuthService.js'

export default createStore({
  state: {
    isLoggedIn: false,
    apiUrl: `${window.location.protocol}//${window.location.host}:3000/api`,
    username: null,
    userId: null
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn();
      if(state.isLoggedIn) {
        state.username = auth.getUserName();
        state.userId = auth.getUserId();
      } else {
        state.username = null;
        state.userId = null;
      }
    }
  },
  actions: {
    authenticate(state) {
      state.commit('authenticate')
    }
  },
  modules: {
  }
})
