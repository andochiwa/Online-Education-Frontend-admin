import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '统计面板',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '统计面板', icon: 'dashboard' }
    }]
  },

]

// 动态路由
export const asyncRoutes = [
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: '教师管理',
    meta: { title: '教师管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '教师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '教师列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加教师',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '添加教师', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '编辑教师',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '编辑教师', noCache: true},
        hidden: true
      }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    name: '课程分类管理',
    redirect: '/subject/list',
    meta: { title: '课程分类管理', icon: 'tree'},
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: '课程分类列表', icon: 'nested'}
      },
      {
        path: 'save',
        name: '添加课程分类',
        component: () => import('@/views/edu/subject/save'),
        meta: { title: '添加课程分类', icon: 'form'}
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    name: '课程管理',
    redirect: '/course/list',
    meta: { title: '课程管理', icon: 'nested'},
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/edu/course/list'),
        meta: { title: '课程列表', icon: 'table'}
      },
      {
        path: 'info',
        name: '添加课程',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '添加课程', icon: 'form'}
      },
      {
        path: 'info/:id',
        name: '添加课程基本信息',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '添加课程基本信息', icon: 'form'},
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: '编辑课程大纲',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true},
        hidden: true
      },
      {
        path: 'publish/:id',
        name: '发布课程',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: '发布课程', noCache: true},
        hidden: true
      }
    ]
  },

  {
    path: '/acl',
    component: Layout,
    name: '权限管理',
    redirect: '/acl/menu/list',
    meta: { title: '权限管理', icon: 'password'},
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/acl/user/list'),
        meta: {title: '用户管理', icon: 'user'}
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/acl/role/list'),
        meta: {title: '角色管理', icon: 'password'}
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: '角色权限',icon: 'password' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: '菜单管理',icon: 'password' }
      },
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    name: '监控页面',
    redirect: '/monitor/sentinel',
    meta: { title: '监控页面', icon: 'eye-open'},
    children: [
      {
        path: 'druid',
        name: 'druid',
        component: () => import('@/views/monitor/druid'),
        meta: { title: 'druid',icon: 'eye' },
      },
      {
        path: 'http://localhost:8848/nacos',
        name: 'nacos',
        meta: {title: 'nacos', icon: 'link'}
      },
      {
        path: 'http://localhost:8858',
        name: 'sentinel',
        meta: {title: 'sentinel', icon: 'link'}
      },
      {
        path: 'http://localhost:15672/',
        name: 'rabbitmq',
        meta: { title: 'rabbitmq',icon: 'link' }
      },
    ]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
