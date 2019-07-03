import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from "jwt-decode"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token){
      state.token = token
      localStorage.setItem('token', token)
    },
    removeToken(state){
      localStorage.removeItem('token')
      state.token = null
    }
  },
  actions: { },
  getters: {
    isAuthUser(state, getters){
      return (state.token !== null)
    },
    getCurrentUser(state, getters){
      let jwtObject = jwtDecode(state.token)
      return jwtObject.nickname
    }
  }
})
