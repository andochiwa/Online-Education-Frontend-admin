<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="日期">
        <el-date-picker v-model="date" type="date"
                        placeholder="选择要统计的日期"
                        value-format="yyyy-MM-dd"
        />
        <el-button :disabled="btnDisabled" type="primary" @click="createStat()">
          生成统计图表
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import stat from '@/api/stat'

export default {
  data() {
    return {
      date: ''
    }
  },
  created() {
  },
  methods: {
    // 生成统计数据
    createStat() {
      stat.createStatData(date)
        .then(result => {

        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
