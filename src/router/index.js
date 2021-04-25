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
    redirect: '/subject/table',
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
    redirect: '/course/table',
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
        meta: {title: '用户管理', icon: 'password'}
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: {title: '用户添加', icon: 'password'},
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: {title: '用户修改', icon: 'password'},
        hidden: true
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
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/andochiwa/Online-Education-Frontend-admin',
        meta: { title: '项目源码', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
