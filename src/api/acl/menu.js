import request from '@/utils/request'

export default {
  // 查询所有分层菜单
  getListPermission() {
    return request({
      url: `/acl/permission`,
      method: 'get'
    })
  },
  // 根据菜单id删除当前以及子级菜单
  deletePermission(permissionId) {
    return request({
      url: `/acl/permission/${permissionId}`,
      method: 'delete'
    })
  },
  // 给角色分配权限
  saveRolePermission(roleId, permissionIds) {
    return request({
      url: `/acl/permission/auth`,
      method: 'post',
      params: {roleId, permissionIds}
    })
  },
  // 保存菜单或功能
  savePermission(permission) {
    return request({
      url: `/acl/permission`,
      method: 'post',
      data: permission
    })
  },
  // 更新菜单或功能
  updatePermission(permission) {
    return request({
      url: `/acl/permission`,
      method: 'put',
      data: permission
    })
  }
}
