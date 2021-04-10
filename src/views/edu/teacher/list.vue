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

      <el-form-item>
        <el-button @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表单 -->
    <el-table :data="list" :cell-style="{'text-align':'center'}" border style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="姓名"/>

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级教师' : '首席教师' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="创建时间"/>

      <el-table-column prop="gmtModified" label="修改时间"/>

      <el-table-column prop="sort" label="排序"/>

      <el-table-column prop="intro" label="资历"></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </router-link>
          <el-button type="danger" icon="el-icon-delete" @click="deleteTeacherById(scope.row.id)" circle></el-button>
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
import teacher from '@/api/education/teacher.js'

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
        })
    },
    // 清空查询条件
    clear() {
      this.teacherQuery = {}
      this.getList()
    },
    // 删除
    deleteTeacherById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.deleteTeacherById(id)
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
