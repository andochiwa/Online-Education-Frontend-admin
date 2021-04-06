<template>
  <div class="app-container">
    <h1>添加教师</h1>

    <!--    添加教师表单    -->
    <el-form label-width="80px">
      <el-form-item label="教师名称">
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

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import teacher from '@/api/teacher/teacher'

export default {
  data() {
    return {
      teacherData: {
        sort: 0
      }
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
      if (this.teacherData.id) {
        this.updateTeacher()
      } else {
        this.saveTeacher()
      }
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
    }
  },
}
</script>

<style>

</style>
