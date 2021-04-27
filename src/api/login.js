import request from '@/utils/request'

// 登陆
export function login(username, password) {
  return request({
    url: '/acl/index/login',
    method: 'post',
    data: {
      username,password
    }
  })
}

// export function login(data) {
//   return request({
//     url: '/eduservice/user/login',
//     method: 'post',
//     data
//   })
// }

// 获取用户信息
export function getInfo() {
  return request({
    url: '/acl/index/info',
    method: 'get'
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/admin/acl/index',
//     method: 'get',
//     params: { token }
//   })
// }

// 登出
export function logout() {
  return request({
    url: '/acl/index/logout',
    method: 'post'
  })
}

// 获取菜单权限数据
export function getMenu() {
  return request({
    url: '/acl/index/menu',
    method: 'get'
  })
}

