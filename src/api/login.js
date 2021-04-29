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

// 获取用户信息
export function getInfo() {
  return request({
    url: '/acl/index/info',
    method: 'get'
  })
}

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

