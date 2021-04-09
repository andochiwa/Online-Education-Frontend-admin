<template>
  <div class="app-container">

    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-form label-width="200px">
      <el-form-item>
        <el-button style="margin-top: 12px;" type="primary" :disabled="disabledSaveButton" @click="next">下一步</el-button>
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
    next() {
      // 跳转到下一部
      this.$router.push({
        path: '/course/chapter/1'
      })
    }
  }
}
</script>

<style scoped>

</style>
