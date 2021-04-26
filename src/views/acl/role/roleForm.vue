<template>
  <div class="app-container">
    <el-tree
      :props="props"
      :data="menu"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      :default-checked-keys="menuIds">
    </el-tree>
    <router-link to="../list">
      <el-button type="primary" @click="saveButton" icon="el-icon-check">
        保存
      </el-button>
    </router-link>
  </div>
</template>

<script>
import menu from '@/api/acl/menu'
import role from '@/api/acl/role'

export default {
  data() {
    return {
      props: {
        children: 'children',
        label: 'name'
      },
      menu: [], // 树形数据
      menuIds: [], // 默认选中权限的id
      oldIds: [], // 已有权限的id
      roleId: '' // 角色id
    }
  },
  created() {
    this.getMenuInfo()
    this.roleId = this.$route.params.id
    this.getPermissionIdByRoleId()
  },
  methods: {
    // 获取所有分层数据
    getMenuInfo() {
      menu.getListPermission()
        .then(result => {
          this.menu = result.data.list
        })
    },
    // 获取权限列表的id
    getPermissionIdByRoleId() {
      role.getPermissionIdByRoleId(this.roleId)
        .then(result => {
          let data = result.data.items
          this.menuIds = []
          for (let i = 0; i < data.length; i++) {
            this.oldIds.push(data[i].id)
            if (data[i].type === 2) {
              this.menuIds.push(data[i].id)
            }
          }
        })
    },
    // 保存按钮点击后返回list并保存或删除数据
    saveButton(){
      let temp = this.$refs.tree.getCheckedNodes(false, true)
      let ids = []
      for (let i = 0; i < temp.length; i++) {
        ids.push(temp[i].id)
      }
      console.log(ids)
      console.log(this.oldIds)
      role.removeOrSavePermission(this.roleId, this.oldIds, ids)
        .then(() => {
          this.$message({
            type: 'success',
            message: '成功'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
