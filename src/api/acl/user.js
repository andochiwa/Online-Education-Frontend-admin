import request from '@/utils/request'

export default {
  // 条件分页获得用户列表
  getPageConditionList(current, limit, name) {
    return request({
      url: `/acl/user/${current}/${limit}`,
      method: 'get',
      params: {name: name}
    })
  },
  // 更新用户
  updateUser(user) {
    return request({
      url: `/acl/user`,
      method: 'put',
      data: user
    })
  },
  // 根据id删除用户
  deleteUser(userId) {
    return request({
      url: `/acl/user/${userId}`,
      method: 'delete'
    })
  },
  // 保存用户
  saveUser(user) {
    return request({
      url: `/acl/user`,
      method: 'post',
      data: user
    })
  }
}
