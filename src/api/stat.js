import request from '@/utils/request'

export default {
  // 生成统计数据
  createStatData(date) {
    return request({
      url: `/stat/statistics-daily/${date}`,
      method: 'get'
    })
  }
}
