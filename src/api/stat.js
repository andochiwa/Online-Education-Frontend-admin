import request from '@/utils/request'

export default {
  // 生成统计数据
  createStatData(date) {
    return request({
      url: `/stat/statistics-daily/${date}`,
      method: 'post'
    })
  },
  // 获取图表数据
  getStatData(begin, end) {
    return request({
      url: `/stat/statistics-daily/${begin}/${end}`,
      method: 'get'
    })
  }
}
