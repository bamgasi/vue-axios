import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
})

instance.interceptors.request.use(function(config) {
  if (store.state.auth.token !== null) {
    config['headers'] = {
      Authorization: store.state.auth.token,
    }
  }

  return config
})

instance.interceptors.response.use(
  function(response) {
    store.commit('error/setValidationError', {})

    return response
  },
  function(error) {
    //console.log(error.response.status, error.response.data.message)
    if (error.response.status === 422) {
      store.commit('error/setValidationError', error.response.data.message)
    } else {
      return Promise.reject({
        status: error.response.status,
        message: error.response.data.message,
      })
    }
  }
)

export default instance
