import http from '@/api/http'

function login(email, password) {
  return http.post('/api/user/login', {
    email,
    password,
  })
}

function getUserInfo(_id) {
  return http.get(`/api/user/info/${_id}`)
}

function update(info) {
  return http.patch(`/api/user/update/${info._id}`, {
    name: info.name,
  })
}

export { login, getUserInfo, update }
