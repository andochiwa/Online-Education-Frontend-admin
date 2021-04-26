import request from '@/utils/request'

const qs = require('qs')

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
  },
  // 保存或删除用户角色
  saveOrRemoveRole(userId, oldRoleIds, newRoleIds) {
    return request({
      url: `/acl/user/role/${userId}`,
      method: 'post',
      params: {
        oldRoleIds: oldRoleIds,
        newRoleIds: newRoleIds
      },
      paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      }
    })
  }
}
