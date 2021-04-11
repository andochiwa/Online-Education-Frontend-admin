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
  // 查询所有教师
  getAllTeacher() {
    return request({
      url: '/eduservice/teacher',
      method: 'get'
    })
  },
  // 根据id查询课程信息
  getCourseInfo(courseId) {
    return request({
      url: `/eduservice/course/${courseId}`,
      method: 'get'
    })
  },
  // 更新课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course',
      method: 'put',
      data: courseInfo
    })
  },
  // 查询发布课程时所需的课程确认信息
  getPublishCourseInfo(courseId) {
    return request({
      url: `/eduservice/course/publish/${courseId}`,
      method: 'get'
    })
  },
  // 发布课程，发送请求修改发布状态
  updatePublishCourseInfo(courseId) {
    return request({
      url: `/eduservice/course/publish/${courseId}`,
      method: 'put'
    })
  }
}
