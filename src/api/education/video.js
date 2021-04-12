import request from '@/utils/request'

export default {
  // 添加小节
  saveVideo(video) {
    return request({
      url: `/eduservice/video`,
      method: 'post',
      data: video
    })
  },
  // 更新小节
  updateVideo(video) {
    return request({
      url: `/eduservice/video`,
      method: 'put',
      data: video
    })
  },
  // 删除小节
  deleteVideo(videoId) {
    return request({
      url: `/eduservice/video/${videoId}`,
      method: 'delete'
    })
  },
  // 根据id获取小节
  getVideo(videoId) {
    return request({
      url: `/eduservice/video/${videoId}`,
      method: 'get'
    })
  },
  // 删除视频
  deleteVideoFile(videoId) {
    return request({
      url: `/edu-vod/video/${videoId}`,
      method: 'delete'
    })
  }
}
