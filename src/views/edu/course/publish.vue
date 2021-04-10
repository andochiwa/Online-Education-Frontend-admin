<template>
  <div class="app-container">

    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="3" process-status="wait" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-form label-width="200px">
      <el-form-item>
        <el-button style="margin-top: 12px;" type="primary" icon="el-icon-back" :disabled="disabledSaveButton" @click="previous">上一步</el-button>
        <el-button style="margin-top: 12px;" type="primary" icon="el-icon-check" :disabled="disabledSaveButton" @click="next">发布课程</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      disabledSaveButton: false
    }
  },
  created() {
  },
  methods: {
    // 跳转到下一部
    next() {
      this.$router.push({
        path: '/course/publish/1'
      })
    },
    // 返回上一步
    previous() {
      this.$router.push({
        path: '/course/chapter/1'
      })
    }
  }
}
</script>

<style scoped>

</style>
