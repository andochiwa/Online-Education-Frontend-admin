import request from '@/utils/request'

export default {

    // 教师列表，条件查询，分页
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            // teacherQuery条件对象，把对象转换成json
            data: teacherQuery
        })
    }
}