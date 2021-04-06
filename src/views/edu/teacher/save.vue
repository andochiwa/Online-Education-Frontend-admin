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
        <el-button type="primary" @click="saveTeacher">立即创建</el-button>
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
  created() {

  },
  methods: {
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
    }
  }
}
</script>

<style>

</style>
