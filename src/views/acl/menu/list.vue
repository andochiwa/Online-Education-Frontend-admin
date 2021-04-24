<template>
  <div class="app-container">

    <el-table
      :data="menuInfo"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="名称"/>

      <el-table-column prop="path" label="访问路径"/>

      <el-table-column prop="component" label="组件路径"/>

      <el-table-column prop="permissionValue" label="权限值"/>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 添加菜单 -->
          <el-button
            v-if="(scope.row.level === 0 || scope.row.level === 1)"
            type="primary"
            size="mini"
            icon="el-icon-circle-plus-outline"
            @click="dialogFormVisible = true; menu.pid = scope.row.id"
          />
          <!-- 添加功能 -->
          <el-button
            v-if="scope.row.level === 2"
            type="primary"
            size="mini"
            icon="el-icon-circle-plus-outline"
            @click="dialogPermissionVisible = true; permission.pid = scope.row.id"
          />
          <!-- 修改功能 -->
          <el-button
            v-if="scope.row.level === 3"
            type="success"
            size="mini"
            icon="el-icon-edit"
            @click="updateFunction(scope.row)"
          />
          <!-- 修改菜单 -->
          <el-button
            v-if="scope.row.level !== 3"
            type="success"
            size="mini"
            icon="el-icon-edit"
            @click="updateMenu(scope.row)"
          />
          <!-- 删除 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deletePermission(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisible" :title="dialogFormValue">
      <el-form ref="menu" :model="menu" :rules="menuValidateRules" label-width="120px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menu.name"/>
        </el-form-item>
        <el-form-item label="访问路径" prop="path">
          <el-input v-model="menu.path"/>
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="menu.component"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="restData()">取 消</el-button>
        <el-button type="primary" @click="append()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加功能的窗口 -->
    <el-dialog :visible.sync="dialogPermissionVisible" title="添加功能">
      <el-form ref="permission" :model="permission" :rules="permissionValidateRules" label-width="120px">
        <el-form-item label="功能名称" prop="name">
          <el-input v-model="permission.name"/>
        </el-form-item>
        <el-form-item label="访问路径">
          <el-input v-model="permission.path"/>
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="permission.component"/>
        </el-form-item>
        <el-form-item label="功能权限值" prop="permissionValue">
          <el-input v-model="permission.permissionValue"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="restData()">取 消</el-button>
        <el-button type="primary" @click="appendPermission()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import menu from '@/api/acl/menu'

const menuInfo = {
  permissionValue: '',
  type: '2',
  name: '',
  path: '',
  component: '',
  pid: 0
}
const permissionInfo = {
  permissionValue: '',
  type: '2',
  name: '',
  path: '',
  component: '',
  pid: 0
}

export default {
  data() {
    return {
      menuInfo: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      dialogFormValue: '添加菜单',
      menuValidateRules: {
        name: [{required: true, trigger: 'blur', message: '菜单名必须输入'}],
        path: [{required: true, trigger: 'blur', message: '菜单路径必须输入'}],
        component: [{required: true, trigger: 'blur', message: '组件名称必须输入'}]
      },
      permissionValidateRules: {
        name: [{required: true, trigger: 'blur', message: '功能名称必须输入'}],
        permissionValue: [{required: true, trigger: 'blur', message: '功能权限值必须输入'}]
      },
      menu: menuInfo,
      permission: permissionInfo
    }
  },
  created() {
    this.getListPermission()
  },
  methods: {
    // 查询菜单
    getListPermission() {
      menu.getListPermission()
        .then(result => {
          this.menuInfo = result.data.list
        })
    },
    // 删除
    deletePermission(data) {
      this.$confirm('此操作将永久删除该记录以及子记录，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        menu.deletePermission(data.id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getListPermission()
            this.restData()
          })
      })
    },
    // 保存数据
    savePermission(permission) {
      menu.savePermission(permission)
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.getListPermission()
          this.restData()
        })
    },
    // 更新数据
    updatePermission(permission) {
      permission.gmtCreate = ''
      permission.gmtModified = ''
      menu.updatePermission(permission)
        .then(() => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.getListPermission()
          this.restData()
        })
    },
    // 开启菜单修改保存框
    updateMenu(data) {
      this.dialogFormVisible = true
      this.menu = data
    },
    // 开启功能修改保存框
    updateFunction(data) {
      this.dialogPermissionVisible = true
      this.permission = data
    },
    restData() {
      this.dialogPermissionVisible = false
      this.dialogFormVisible = false
      this.menu = {...menuInfo}
      this.permission = {...permissionInfo}
    },
    appendPermission() {
      this.$refs.permission.validate(valid => {
        if (valid) {
          if (this.permission.id) {
            this.updatePermission(this.permission)
          } else {
            this.savePermission(this.permission)
          }
        }
      })
    },
    append() {
      this.$refs.menu.validate(valid => {
        if (valid) {
          if (!this.menu.id) { // 添加
            this.savePermission(this.menu)
          } else { // 修改
            this.updatePermission(this.menu)
          }
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
