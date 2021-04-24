import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/acl/login',
    method: 'post',
    data: {
      username,password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/acl/index',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/acl/logout',
    method: 'post'
  })
}
