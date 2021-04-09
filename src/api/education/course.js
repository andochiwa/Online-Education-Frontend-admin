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
  getCourseInfo(CourseId) {
    return request({
      url: `/eduservice/course/${CourseId}`,
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
  }
}
