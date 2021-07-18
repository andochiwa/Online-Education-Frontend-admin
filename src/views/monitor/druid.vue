<template>
  <div>
    <br/><br/><br/><br/><br/><br/>
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <el-button style="width: 300px" type="primary">
          <a href="http://localhost:8001/druid" target="_blank">
            service_edu
          </a>
        </el-button>
      </el-col>
      <el-col :span="6" >
        <el-button style="width: 300px" type="primary">
          <a href="http://localhost:8002/druid" target="_blank">
            service_oss
          </a>
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-button style="width: 300px" type="primary">
          <a href="http://localhost:8003/druid" target="_blank">
            service_vod
          </a>
        </el-button>
      </el-col>
    </el-row>
    <br/>
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <el-button style="width: 300px" type="primary">
          <a href="http://localhost:8004/druid" target="_blank">
            service_cms
          </a>
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-button style="width: 300px" type="primary">
          <a href="http://localhost:8005/druid" target="_blank">
            service_center
          </a>
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-button style="width: 300px" type="primary">
          <a href="http://localhost:8006/druid" target="_blank">
            service_order
          </a>
        </el-button>
      </el-col>
    </el-row>
    <br/>
    <el-row :gutter="20">
      <el-col :span="6" :offset="6">
        <el-button style="width: 300px" type="primary">
          <a href="http://localhost:8007/druid" target="_blank">
            service_statistic
          </a>
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-button style="width: 300px" type="primary">
          <a href="http://localhost:8008/druid" target="_blank">
            service_acl
          </a>
        </el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {}
</script>

<style>
</style>
