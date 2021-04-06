<template>
  <div class="app-container">
    <h1>教师列表</h1>

    <!-- 查询表单 -->
    <el-form :inline="true" :model="teacherQuery" class="demo-form-inline">
      <el-form-item label="教师姓名">
        <el-input v-model="teacherQuery.name" placeholder="教师姓名"></el-input>
      </el-form-item>

      <el-form-item label="教师头衔">
        <el-select v-model="teacherQuery.level" placeholder="教师头衔">
          <el-option label="高级教师" value="1"></el-option>
          <el-option label="首席教师" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择时间">
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            placeholder="开始时间"
            v-model="teacherQuery.begin"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          ></el-date-picker>
        </el-col>

        <el-col class="line" :span="2">-</el-col>

        <el-col :span="11">
          <el-date-picker
            type="datetime"
            placeholder="截止时间"
            v-model="teacherQuery.end"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <!-- 设置查询时的函数 -->
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表单 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号" width="70">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="80"/>

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级教师' : '首席教师' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="创建时间" width="80"/>

      <el-table-column prop="gmtModified" label="修改时间" width="80"/>

      <el-table-column prop="sort" label="排序" width="60"/>

      <el-table-column prop="intro" label="资历"></el-table-column>
    </el-table>

    <el-pagination
      background
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    >
    </el-pagination>
  </div>
</template>

<script>
import teacher from '@/api/teacher/teacher.js'
import qs from 'qs'

export default {
  data() {
    return {
      list: null, // 查询之后接口返回的数据
      page: 1,
      limit: 10,
      total: null,
      teacherQuery: {

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 教師列表的方法
    getList(page = 1) {
      this.page = page
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((result) => {
          this.list = result.data.items
          this.total = result.data.total
        })
        .catch((err) => {
          console.log(err)
          console.log(this.teacherQuery)
          console.log(qs.stringify(this.teacherQuery))
        })
    }
  }
}
</script>

<style>
</style>
