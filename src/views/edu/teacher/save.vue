<template>
  <div class="app-container">
    <h1>添加教师</h1>

    <!--    添加教师表单    -->
    <el-form ref="teacher" :rules="rules" :model="teacherData" label-width="80px">
      <el-form-item label="教师名称" prop="name">
        <el-input v-model="teacherData.name"></el-input>
      </el-form-item>
      <el-form-item label="教师排序">
        <el-input-number v-model="teacherData.sort" :min="0"/>
      </el-form-item>
      <el-form-item label="教师头衔">
        <el-select v-model="teacherData.level" placeholder="请选择教师头衔">
          <el-option label="高级教师" :value="1"></el-option>
          <el-option label="首席教师" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教师资历">
        <el-input v-model="teacherData.career"/>
      </el-form-item>
      <el-form-item label="教师简介">
        <el-input v-model="teacherData.intro" type="textarea"/>
      </el-form-item>

      <!--   上传头像   -->
      <el-form-item label="上传头像">
        <el-upload
          class="avatar-uploader"
          :action="actionUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="teacherData.avatar" :src="teacherData.avatar" class="avatar" alt="">
          <img v-else-if="avatar" :src="avatar" class="avatar" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!--   上传头像结束   -->

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        <router-link to="/teacher/table">
          <el-button>取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import teacher from '@/api/education/teacher'

export default {
  data() {
    return {
      teacherData: {
        sort: 0,
        avatar: '',
      },
      avatar: '',
      rules: {
        name: [{required: true, trigger: 'blur', message: '教师名称必须输入'}]
      },
      actionUrl: process.env.VUE_APP_BASE_API + '/edu-oss/file',
    }
  },
  // 监听
  watch: {
    // 监听路由变换的方式
    $route() {
      this.judgePath()
    }
  },
  created() {
    this.judgePath()
  },
  methods: {
    // 判断路径是否有id值，以此来判断是保存还是添加
    judgePath() {
      if (this.$route.params && this.$route.params.id) {
        this.getTeacher(this.$route.params.id)
      } else {
        // 置空
        this.teacherData = {}
      }
    },
    // 判断是保存还是添加
    saveOrUpdate() {
      this.$refs.teacher.validate(data => {
        if (data) {
          if (this.teacherData.id) {
            this.updateTeacher()
          } else {
            this.saveTeacher()
          }
        }
      })
    },
    // 保存教师
    saveTeacher() {
      teacher.saveTeacher(this.teacherData)
        .then(() => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })

          // 回到列表中，用路由跳转
          this.$router.push({
            path: '/teacher/table'
          })

        })
    },
    // 通过id获取教师
    getTeacher(id) {
      teacher.getTeacherById(id)
        .then(result => {
          this.teacherData = result.data.items
        })
    },
    // 修改教师
    updateTeacher() {
      this.teacherData.gmtCreate = null
      this.teacherData.gmtModified = null
      teacher.updateTeacherById(this.teacherData)
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })

          this.$router.push({
            path: '/teacher/table'
          })
        })
    },
    // 上传头像成功
    handleAvatarSuccess(res) {
      this.avatar = res.data.url
      this.teacherData.avatar = res.data.url
    },
    // 上传头像前判断
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt20M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return (isJPG || isPNG) && isLt20M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
