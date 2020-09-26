import * as authApi from '@/api/auth'

export default {
  namespaced: true,
  state: {
    token: null,
    _userId: null,
    user: {
      email: null,
      name: null,
    },
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
    SET_USER(state, { email, name }) {
      state.user.email = email
      state.user.name = name
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
    async getUserInfo({ commit }, id) {
      try {
        const response = await authApi.getUserInfo(id)
        if (response.status == 200) {
          commit('SET_USER', response.data)
        }
      } catch (e) {
        throw e
      }
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
    userInfo(state) {
      return state.user
    },
  },
}
