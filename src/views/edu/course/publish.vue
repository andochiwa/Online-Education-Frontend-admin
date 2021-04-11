<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="publishInfo.cover" alt="">
      <div class="main">
        <h2>{{ publishInfo.title }}</h2>
        <p class="gray"><span>共{{ publishInfo.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ publishInfo.subjectFirst }} — {{ publishInfo.subjectSecond }}</span></p>
        <p>课程讲师：{{ publishInfo.teacherName }}</p>
        <h3 class="red">￥{{ publishInfo.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="disabledSaveButton" type="primary" @click="publish">发布课程</el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/education/course'

export default {
  data() {
    return {
      disabledSaveButton: false,
      courseId: '',
      publishInfo: ''
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getPublishCourseInfo(this.courseId)
    }
  },
  methods: {
    // 根据课程id查询课程发布确认信息
    getPublishCourseInfo(courseId) {
      course.getPublishCourseInfo(courseId)
        .then(result => {
          this.publishInfo = result.data.items
        })
    },
    // 发布
    next() {
      this.$router.push({
        path: '/course/publish/1'
      })
    },
    // 返回上一步
    previous() {
      this.$router.push({
        path: '/course/chapter/' + this.courseId
      })
    },
    // 发布课程
    publish() {
      course.updatePublishCourseInfo(this.courseId)
        .then(() => {
          this.$message({
            type: 'success',
            message: '发布课程成功'
          })
          this.$router.push({
            path: '/course/list'
          })
        })
    }
  }
}
</script>

<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #DDD;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.ccInfo .main {
  margin-left: 520px;
}

.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}

.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
