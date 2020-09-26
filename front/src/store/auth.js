import * as authApi from '@/api/auth'

export default {
  namespaced: true,
  state: {
    token: null,
    _userId: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token
      state._userId = payload._id
      localStorage.setItem('token', payload.token)
      localStorage.setItem('_userId', payload._id)
    },
    logout(state) {
      state.token = null
      state._userId = null
      localStorage.removeItem('token')
      localStorage.removeItem('_userId')
    },
  },
  actions: {
    async login(context, { email, password }) {
      try {
        const response = await authApi.login(email, password)

        if (response.status === 200) {
          let payload = {
            token: response.data.token,
            _id: response.data._id,
          }
          context.commit('setToken', payload)
        }
      } catch (e) {
        alert(e.message)
      }
    },
    logout({ commit }) {
      commit('logout')
    },
  },
  getters: {
    token(state) {
      state.token = state.token || localStorage.token
      return state.token
    },
    _userId(state) {
      state._userId = state._userId || localStorage._userId
      return state._userId
    },
  },
}
