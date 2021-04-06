<template>
  <div class="app-container">
    <h1>教师列表</h1>

    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号" width="70">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级教师" : "首席教师" }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="创建时间" width="80" />

      <el-table-column prop="gmtModified" label="修改时间" width="80" />

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column prop="intro" label="资历"> </el-table-column>
    </el-table>

    <el-pagination 
      background
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    >
    </el-pagination>
  </div>
</template>

<script>
import teacher from "@/api/teacher/teacher.js";

export default {
  data() {
    return {
      list: null, // 查询之后接口返回的数据
      page: 1,
      limit: 10,
      total: null,
      teacherQuery: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 讲师列表的方法
    getList(page = 1) {
      this.page = page
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((result) => {
          this.list = result.data.items;
          this.total = result.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
