<template>
  <div class="app-container">

    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="1" process-status="wait" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-form label-width="200px" style="width: 50%">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder="请输入课程标题"/>
      </el-form-item>

      <el-form-item label="课程分类">
        <el-cascader v-model="value"
                     :options="subjectList"
                     :props="defaultProps"
                     @change="handleChange"
                     placeholder="请选择课程分类">
        </el-cascader>
      </el-form-item>

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
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <el-form-item label="课程封面">
        <el-upload
          :action="BASE_API + '/edu-oss/file'"
          :show-file-list="false"
          :on-preview="beforeCoverUpload"
          :on-success="handleCoverSuccess"
          accept="image/*"
          class="avatar-uploader">
          <img :src="courseInfo.cover" width="100%" height="100%" alt=""/>
        </el-upload>
      </el-form-item>

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
import subject from '@/api/education/subject'
import tinymce from '@/components/Tinymce'

export default {
  components: {tinymce},
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API + "/",
      disabledSaveButton: false,
      courseInfo: {
        title: '',
        lessonNum: '',
        subjectId: '',
        price: '',
        description: '',
        cover: process.env.BASE_URL + 'img/1.jpg',
        teacherId: '',
        subjectParentId: ''
      },
      teacherList: {},
      subjectList: [],
      defaultProps: {
        value: 'id',
        children: 'children',
        label: 'title',
        expandTrigger: 'hover'
      }
    }
  },
  created() {
    this.getTeacher()
    this.getSubject()
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
    },
    // 查询课程分类
    getSubject() {
      subject.getSubjectList()
        .then(result => {
          this.subjectList = this.getTreeData(result.data.items)
        })
    },
    // 递归判断，把最后一层children空数组置为undefined
    getTreeData(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length === 0) {
          data[i].children = undefined
        } else {
          this.getTreeData(data[i].children)
        }
      }
      return data
    },
    // 课程分类改变时，把id绑定给courseInfo.subjectId
    handleChange(data) {
      this.courseInfo.subjectParentId = data[0]
      this.courseInfo.subjectId = data[1]
    },
    // 上传封面之前
    beforeCoverUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message.error("大小不能超过20M")
      }
      return isLt20M
    },
    // 上传封面成功后
    handleCoverSuccess(result) {
      this.courseInfo.cover = result.data.url
    }
  }
}
</script>

<style scoped>

</style>
