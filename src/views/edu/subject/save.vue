<template>
  <div class="app-container">
    <el-form label-width="120px">
      <!--   Excel模板说明   -->
      <el-form-item label="信息描述">
        <el-tag type="info">Excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'https://my-online-education-project.oss-cn-beijing.aliyuncs.com/Excel/template.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>

      <!-- 上传excel文件 -->
      <el-form-item label="选择Excel文件">
        <el-upload
          ref="upload"
          class="upload"
          drag
          :action="BASE_API"
          :limit="1"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <el-button style="margin-left: 10px;" size="small" type="success" icon="el-icon-upload" @click="submitUpload">上传到服务器</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API + '/eduservice/subject' // 接口Api地址
    }
  },
  created() {
  },
  methods: {
    // 上传到服务器按钮按下后
    submitUpload() {
      this.$refs.upload.submit()
    },
    // 上传成功
    fileUploadSuccess() {
      this.$message({
        type: 'success',
        message: '添加成功'
      })
      this.$router.push({
        path: '/subject/list'
      })
    },
    // 上传失败
    fileUploadError() {
      this.$message({
        type: 'error',
        message: '添加失败'
      })
    }
  }
}
</script>

<style scoped>

</style>
