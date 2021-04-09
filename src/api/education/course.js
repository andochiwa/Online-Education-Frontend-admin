import request from '@/utils/request'

export default {
  // 添加课程信息
  saveCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course`,
      method: 'post',
      data: courseInfo
    })
  },
  // 查询所有讲师
  getAllTeacher() {
    return request({
      url: '/eduservice/teacher',
      method: 'get'
    })
  }
}
