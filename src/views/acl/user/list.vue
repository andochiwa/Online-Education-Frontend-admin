<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="name" placeholder="输入查询的用户名"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getPageList()">查询</el-button>
      <el-button type="default" @click="refreshData">清空</el-button>
    </el-form>

    <div style="padding-left: 50px">
      <el-button v-if="hasPerm('user.add')" type="primary" @click="dialogFormVisible = true; dialogTitle = '添加用户'">添加用户</el-button>
    </div>

    <el-table :data="userInfo" border>

      <el-table-column label="序号">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"/>

      <el-table-column prop="nickName" label="用户昵称"/>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="hasPerm('user.assign')" type="info" size="mini" icon="el-icon-lock" @click="getRoleHelper(scope.row)" />
          <el-button v-if="hasPerm('user.update')" type="primary" size="mini" icon="el-icon-edit" @click="updateHelper(scope.row)"/>
          <el-button v-if="hasPerm('user.remove')" type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row.id)"/>
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
      <el-form ref="user" :model="user" :rules="userRules">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="user.username" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="120px">
          <el-input type="password" v-model="user.password" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName" label-width="120px">
          <el-input v-model="user.nickName" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="上传头像" label-width="120px">
          <el-upload
            class="avatar-uploader"
            :action="actionUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            accept="image/*"
          >
            <img v-if="user.avatar" :src="user.avatar" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refreshData">取 消</el-button>
        <el-button type="primary" @click="dialogClick">确 定</el-button>
      </div>
    </el-dialog>
    <!--  修改角色框  -->
    <el-dialog :before-close="refreshData" title="用户角色切换" :visible.sync="dialogUserRole">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedRole" @change="handleCheckedRoleChange">
        <el-checkbox v-for="role in role" :label="role.id" :key="role.id">{{role.roleName}}</el-checkbox>
      </el-checkbox-group>
      <div style="margin: 15px 0;"></div>
      <el-button type="primary" @click="saveButton" icon="el-icon-check">
        保存
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/api/acl/user'
import role from '@/api/acl/role'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      name: '', // 查询用
      userInfo: [],
      total: null,
      user: {
        id: ''
      },
      checkAll: false,
      role: [], // 所有权限
      checkedRole: [], // 选中的
      dialogTitle: '',
      roleOldId: [], // 保存旧角色id用
      dialogFormVisible: false,
      dialogUserRole: false,
      isIndeterminate: false,
      userRules: {
        username: [{required: true, trigger: 'blur', message: '用户名必须输入'}],
        password: [{required: true, trigger: 'blur', message: '密码必须输入'}],
        nickName: [{required: true, trigger: 'blur', message: '用户昵称必须输入'}],
      },
      // 以下是头像部分
      actionUrl: process.env.VUE_APP_BASE_API + '/edu-oss/file',
    }
  },
  created() {
    this.getPageList()
    this.getRole()
  },
  methods: {
    // 查询所有角色
    getRole() {
      role.getAllRole()
        .then(result => {
          this.role = result.data.items
        })
    },
    // 分页获取用户
    getPageList(page = 1) {
      user.getPageConditionList(page, this.limit, this.name)
        .then(result => {
          this.userInfo = result.data.list
          this.total = result.data.total
        })
    },
    // 更新用户
    updateUser() {
      this.user.gmtCreate = ''
      this.user.gmtModified = ''
      user.updateUser(this.user)
        .then(() => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.refreshData()
        })
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm('此操作将永久删除用户，是否继续？', '警告', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        user.deleteUser(id)
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
      this.user = { id: '' }
      this.name = ''
      this.dialogFormVisible = false
      this.dialogUserRole = false
      this.isIndeterminate = false
      this.getPageList()
      this.checkedRole = []
      this.roleOldId = []
      this.checkAll = false
    },
    // 保存数据
    saveUser() {
      user.saveUser(this.user)
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
      this.$refs.user.validate(valid => {
        if (valid) {
          if (this.user.id) {
            this.updateUser()
          } else {
            this.saveUser()
          }
        }
      })
    },
    // 修改按钮点击后
    updateHelper(data) {
      this.user = data
      this.dialogFormVisible = true
      this.dialogTitle = '修改用户信息'
    },
    // 上传头像成功后
    handleAvatarSuccess(res) {
      this.user.avatar = res.data.url
    },
    // 修改角色按钮点击后
    getRoleHelper(data) {
      this.user = data
      this.dialogUserRole = true
      role.getRoleByUserId(data.id)
        .then(result => {
          for (let i = 0; i < result.data.items.length; i++) {
            this.checkedRole.push(result.data.items[i].id)
            this.roleOldId.push(result.data.items[i].id)
          }
          this.checkAll = result.data.items.length === this.role.length
        })
    },
    // 选中多选框
    handleCheckedRoleChange(data) {
      this.checkAll = data.length === this.role.length
      this.isIndeterminate = data.length > 0 && data.length < this.role.length
    },
    // 多选框全选
    handleCheckAllChange(data) {
      if (data) {
        for (let i = 0; i < this.role.length; i++) {
          this.checkedRole.push(this.role[i].id)
        }
      } else {
        this.checkedRole = []
      }
      this.isIndeterminate = false;
    },
    // 角色保存按钮
    saveButton() {
      user.saveOrRemoveRole(this.user.id, this.roleOldId, this.checkedRole)
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.refreshData()
        })
    }
  }
}
</script>

<style scoped>
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
