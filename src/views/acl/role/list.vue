<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="name" placeholder="输入查询的角色名称"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getPageList()">查询</el-button>
      <el-button type="default" @click="refreshData">清空</el-button>
    </el-form>

    <div style="padding-left: 50px">
      <el-button type="primary" v-if="hasPerm('role.add')" @click="dialogFormVisible = true; dialogTitle = '添加角色'">添加角色</el-button>
    </div>

    <el-table :data="roleInfo" border>

      <el-table-column label="序号">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色名"/>

      <el-table-column prop="remark" label="备注"/>

      <el-table-column label="操作">
        <template slot-scope="scope">
        <router-link style="padding-right: 10px" :to="`distribution/${scope.row.id}`">
          <el-button v-if="hasPerm('role.acl')" type="info" size="mini" icon="el-icon-lock" />
        </router-link>
        <el-button v-if="hasPerm('role.update')" type="primary" size="mini" icon="el-icon-edit" @click="updateHelper(scope.row)"/>
        <el-button v-if="hasPerm('role.remove')" type="danger" size="mini" icon="el-icon-delete" @click="deleteRole(scope.row.id)"/>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页  -->
    <el-pagination
      :page-size="limit"
      :current-page="page"
      :total="total"
      layout="total, prev, pager, next, jumper"
      style="padding: 30px 0; text-align: center"
      @Current-change="getPageList"
      >
    </el-pagination>

    <!--  添加or修改表单  -->
    <el-dialog :before-close="refreshData" :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="role" :model="role" :rules="roleRules">
        <el-form-item label="角色名称" prop="roleName" label-width="120px">
          <el-input v-model="role.roleName" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="120px">
          <el-input v-model="role.remark" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refreshData">取 消</el-button>
        <el-button type="primary" @click="dialogClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import role from '@/api/acl/role'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      name: '', // 查询用
      roleInfo: [],
      total: null,
      role: {
        id: ''
      },
      dialogTitle: '',
      dialogFormVisible: false,
      roleRules: {
        roleName: [{required: true, trigger: 'blur', message: '角色名必须输入'}],
      },
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    // 分页获取角色
    getPageList(page = 1) {
      role.getPageConditionList(page, this.limit, this.name)
        .then(result => {
          this.roleInfo = result.data.items
          this.total = result.data.total
        })
    },
    // 更新角色
    updateRole() {
      this.role.gmtCreate = ''
      this.role.gmtModified = ''
      role.updateRole(this.role)
        .then(() => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.refreshData()
        })
    },
    // 删除角色
    deleteRole(id) {
      this.$confirm('此操作将永久删除角色，是否继续？', '警告', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        role.deleteRole(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.refreshData()
          })
      })

    },
    // 刷新页面数据
    refreshData() {
      this.role = { id: '' }
      this.name = ''
      this.dialogFormVisible = false
      this.getPageList()
    },
    // 保存数据
    saveRole() {
      role.saveRole(this.role)
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存数据成功'
          })
          this.refreshData()
        })
    },
    // 对话框确认按钮点击后
    dialogClick() {
      this.$refs.role.validate(valid => {
        if (valid) {
          if (this.role.id) {
            this.updateRole()
          } else {
            this.saveRole()
          }
        }
      })
    },
    // 修改按钮点击后
    updateHelper(data) {
      this.role = data
      this.dialogFormVisible = true
      this.dialogTitle = '修改角色'
    }
  }
}
</script>

<style scoped>

</style>
