import request from '@/utils/request'

export default {
  // 根据课程id获取分类好的章节和小节数据
  getChapterVideo(courseId) {
    return request({
      url: `/eduservice/chapter/${courseId}`,
      type: 'get'
    })
  }
}
