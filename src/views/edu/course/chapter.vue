<template>
  <div class="app-container">

    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="2" process-status="wait" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-tree :data="chapterVideoList" :props="defaultProps"></el-tree>

    <el-form label-width="200px">
      <el-form-item>
        <el-button style="margin-top: 12px;" type="primary" :disabled="disabledSaveButton" @click="previous">上一步</el-button>
        <el-button style="margin-top: 12px;" type="primary" :disabled="disabledSaveButton" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import chapter from '@/api/education/chapter'

export default {
  data() {
    return {
      disabledSaveButton: false,
      courseId: '',
      chapterVideoList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.courseId = this.$route.params.id
    this.getChapterVideo(this.courseId)
  },
  methods: {
    // 根据课程id查询章节和小节
    getChapterVideo(courseId) {
      chapter.getChapterVideo(courseId)
        .then(result => {
          this.chapterVideoList = result.data.items
        })
    },
    // 跳转到下一步
    next() {
      this.$router.push({
        path: '/course/publish/' + this.courseId
      })
    },
    // 返回上一步
    previous() {
      this.$router.push({
        path: '/course/info/' + this.courseId
      })
    }
  }
}
</script>

<style scoped>

</style>
