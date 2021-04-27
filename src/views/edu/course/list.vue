<template>
  <div class="app-container">
    <h1>课程列表</h1>

    <!-- 查询表单 -->
    <el-form :inline="true" :model="courseQuery" class="demo-form-inline">
      <el-form-item label="课程名称">
        <el-input v-model="courseQuery.title" placeholder="课程名称"></el-input>
      </el-form-item>

      <el-form-item label="发布状态">
        <el-select v-model="courseQuery.status" placeholder="发布状态">
          <el-option label="未发布" value="Draft"></el-option>
          <el-option label="已发布" value="Normal"></el-option>
        </el-select>
      </el-form-item>

      <!-- 设置查询时的函数 -->
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表单 -->
    <el-table :data="list" :header-cell-style="{textAlign: 'center'}" :cell-style="{'text-align':'center'}" border style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程标题"/>

      <el-table-column label="发布状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 'Normal' ? '已发布' : '未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="总课时"/>

      <el-table-column prop="viewCount" label="浏览数量"/>

      <el-table-column prop="price" label="课程价格"/>

      <el-table-column prop="gmtCreate" label="创建时间"/>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button v-if="hasPerm('course.update')" type="primary" icon="el-icon-edit" circle></el-button>
          </router-link>
          <el-button v-if="hasPerm('course.remove')" type="danger" icon="el-icon-delete" @click="deleteCourseInfo(scope.row.id)" circle></el-button>
        </template>
      </el-table-column>
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
import course from '@/api/education/course'

export default {
  data() {
    return {
      list: null, // 查询之后接口返回的数据
      page: 1,
      limit: 10,
      total: null,
      courseQuery: {

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 课程列表的方法
    getList(page = 1) {
      this.page = page
      course
        .getConditionCourseInfo(this.page, this.limit, this.courseQuery)
        .then((result) => {
          this.list = result.data.items
          this.total = result.data.total
        })
    },
    // 清空查询条件
    clear() {
      this.courseQuery = {}
      this.getList()
    },
    // 删除
    deleteCourseInfo(id) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        course.deleteCourseInfo(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList(this.page)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style>
</style>
