import request from '@/utils/request'

// export function login(username, password) {
//   return request({
//     url: '/admin/acl/login',
//     method: 'post',
//     data: {
//       username,password
//     }
//   })
// }

export function login(data) {
  return request({
    url: '/eduservice/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/eduservice/user/info',
    method: 'get',
    params: { token }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/admin/acl/index',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/admin/acl/logout',
    method: 'post'
  })
}

