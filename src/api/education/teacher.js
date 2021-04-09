import request from '@/utils/request'

export default {

  // 教师列表，条件查询，分页
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  // 删除教师
  deleteTeacherById(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  // 添加教师
  saveTeacher(teacherData) {
    return request({
      url: `/eduservice/teacher`,
      method: 'post',
      data: teacherData
    })
  },
  // 根据id查询教师
  getTeacherById(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method:'get'
    })
  },
  // 根据id修改教师
  updateTeacherById(teacherData) {
    return request({
      url: '/eduservice/teacher',
      method: 'put',
      data: teacherData
    })
  }

}
