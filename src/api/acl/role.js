import request from '@/utils/request'

const qs = require('qs');

export default {
  //分页获取角色
  getPageConditionList(current, limit, name) {
    return request({
      url: `/acl/role/${current}/${limit}`,
      method: 'get',
      params: {
        name: name
      }
    })
  },
  // 更新角色
  updateRole(role) {
    return request({
      url: `/acl/role`,
      method: 'put',
      data: role
    })
  },
  // 删除角色
  deleteRole(roleId) {
    return request({
      url: `/acl/role/${roleId}`,
      method: 'delete'
    })
  },
  // 插入角色
  saveRole(role) {
    return request({
      url: `/acl/role`,
      method: 'post',
      data: role
    })
  },
  // 根据权限id获取权限列表的所有id
  getPermissionIdByRoleId(roleId) {
    return request({
      url: `/acl/role/auth/${roleId}`,
      method: 'get'
    })
  },
  // 插入或删除权限列表数据
  removeOrSavePermission(roleId, oldPermissionIds, newPermissionIds) {
    return request({
      url: `/acl/role/auth/${roleId}`,
      method: 'Post',
      params: {
        oldPermissionIds: oldPermissionIds,
        newPermissionIds: newPermissionIds},
      paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      }
    })
  }
}
