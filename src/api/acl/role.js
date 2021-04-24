import request from '@/utils/request'

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
  }
}
