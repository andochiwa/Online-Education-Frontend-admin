<template>
  <div class="app-container">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree">
    </el-tree>
  </div>
</template>

<script>

import subject from '@/api/teacher/subject'

export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  created() {
    this.getSubject()
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value) !== -1;
    },
    getSubject() {
      subject.getSubjectList()
        .then(response => {
          this.data = response.data.items
        })
    }
  },

  data() {
    return {
      filterText: '',
      data: [], // 返回所有分类的数据
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    };
  }
};
</script>
