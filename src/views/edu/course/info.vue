<template>
  <div class="app-container">

    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-form label-width="200px" style="width: 50%">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder="请输入课程标题"/>
      </el-form-item>

      <!--  所属分类 TODO  -->

      <!--  课程教师 TODO  -->
      <el-form-item label="课程教师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择课程教师">
          <el-option
            v-for="teacher in teacherList"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum"/>
      </el-form-item>

      <el-form-item label="课程简介">
        <el-input type="textarea" v-model="courseInfo.description" :autosize="{minRows: 2, maxRows: 10}" placeholder="请输入课程简介"/>
      </el-form-item>

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
import course from '@/api/education/course'

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
      },
      teacherList: {}
    }
  },
  created() {
    this.getTeacher()
  },
  methods: {
    // 跳转到下一部
    next() {
      // 发送请求到后端
      course.saveCourseInfo(this.courseInfo)
        .then(result => {
          this.$message({
            type: 'success',
            message: '成功'
          })
          this.$router.push({
            path: '/course/chapter/' + result.data.id
          })
        })
    },
    // 查询所有讲师
    getTeacher() {
      course.getAllTeacher()
        .then(result => {
          this.teacherList = result.data.items
        })
    }
  }
}
</script>

<style scoped>

</style>
