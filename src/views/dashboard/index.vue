<template>
  <div class="app-container">
    <el-form :inline="true" label-width="500px">

      <el-form-item label="查询">
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="showChart()"
      >查询
      </el-button>
    </el-form>

    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%"/>
    </div>
  </div>
</template>

<script>
import stat from '@/api/stat'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      searchObj: {
      },
      xData: [],
      yData: [],
      names: [],
      timer: null
    }
  },
  created() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    this.createStat(`${year}-${month}-${day}`)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    // 生成统计数据
    createStat(date) {
      stat.createStatData(date)
        .then(() => {
          this.showChart()
        })
      this.timer = setInterval(() => {
        this.showChart()
      }, 5000)
    },

    showChart() {
      stat.getStatData(this.searchObj.begin, this.searchObj.end)
        .then(result => {
          let val = result.data
          // this.yData = result.data.countList
          this.xData = val.dateList
          this.yData = []
          this.names = val.names
          for (let i = 0; i < val.countList.length; i++) {
            this.yData.push({
              name: val.names[i],
              type: 'line',
              // stack: '总量',
              data: val.countList[i],
              smooth: true,
            })
          }

          //调用下面生成图表的方法，改变值
          this.setChart()
        })
    },
    setChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('chart'))

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '数据统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.names
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        dataZoom: [{
          show: true,
          height: 25,
          xAxisIndex: [
            0
          ],
          bottom: 15,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          textStyle: {
            color: '#1f1a1a'
          },
          borderColor: '#90979c'
        },
          {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }],
        // x轴是类目轴（离散数据）,必须通过data设置类目数据
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        // y轴是数据轴（连续数据）
        yAxis: {
          type: 'value'
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: this.yData
      }

      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
