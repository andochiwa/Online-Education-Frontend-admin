<template>
  <div class="app-container">
    教师列表
  </div>
</template>

<script>
import teacher from '@/api/teacher/teacher.js'

export default {
    data() {
      return {
        list: null,
        page: 1,
        limit: 10,
        teacherQuery: {

        }
      }
    }, 
    created() {
      this.getList()
    },
    methods: {
        // 讲师列表的方法
        getList() {
          teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
              .then((result) => {
                this.data = result.data.items
                console.log(result)
              }).catch((err) => {
                console.log(err)
              });
        }
    }
}
</script>

<style>

</style>
