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
    <router-link to="list">
      <el-button type="primary" @click="saveButton"/>
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
      menuIds: [], // 已有权限的id
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
          this.menuIds = result.data.items
          console.log(this.menuIds)
        })
    },
    // 保存按钮点击后返回list并保存或删除数据
    saveButton(){
      let ids = this.$refs.tree.getCheckedKeys()
    }
  }
}
</script>

<style scoped>

</style>
