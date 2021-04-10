import request from '@/utils/request'

export default {
  // 根据课程id获取分类好的章节和小节数据
  getChapterVideo(courseId) {
    return request({
      url: `/eduservice/chapter/sort/${courseId}`,
      method: 'get'
    })
  },
  // 根据章节id获取章节
  getChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/${chapterId}`,
      method: 'get'
    })
  },
  // 保存章节数据
  saveChapter(chapter) {
    return request({
      url: '/eduservice/chapter',
      method: 'post',
      data: chapter
    })
  },
  // 更新章节数据
  updateChapter(chapter) {
    return request({
      url: '/eduservice/chapter',
      method: 'put',
      data: chapter
    })
  },
  // 删除章节数据
  removeChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/${chapterId}`,
      method: 'delete'
    })
  },

}
