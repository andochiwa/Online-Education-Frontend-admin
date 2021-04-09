<template>
  <div class="app-container">

    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-form label-width="200px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder="请输入课程标题"/>
      </el-form-item>

      <!--  所属分类 TODO  -->

      <!--  课程教师 TODO  -->

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum"/>
      </el-form-item>

      <!--  课程简介 TODO  -->

      <!--  课程封面 TODO    -->

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" placeholder="请输入课程价格"/>
      </el-form-item>
    </el-form>

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
      disabledSaveButton: false,
      courseInfo: {
        title: '',
        lessonNum: '',
        subjectId: '',
        price: '',
        description: '',
        cover: '',
        teacherId: ''
      }
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
