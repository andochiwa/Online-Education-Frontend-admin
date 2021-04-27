import { asyncRoutes, constantRoutes } from '@/router'
import { getMenu } from '@/api/login'
import Layout from '@/layout'

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, asyncRoutes) {
  try {
    // 过滤掉动态路由里的值
    return asyncRoutes.filter(route => {
      let temp = route.name
      if (asyncRouterMap[temp] === null || asyncRouterMap[temp] === undefined || asyncRouterMap[temp].length === 0) {
        return false
      }
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(asyncRouterMap, route.children)
      }
      return true
    })
  } catch (e) {
    console.log(e)
  }
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }) {
    // 取动态路由
    const asyncRouter = await getMenu()

    return new Promise(resolve => {
      const tmp = asyncRouter.data.items
      const accessedRoutes = filterAsyncRouter(tmp, asyncRoutes)
      // 为了防止刷新后404，在动态路由里push404页面
      accessedRoutes.push({
          path: '*',
          redirect: '/404',
          hidden: true
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
        })
      // 拼接动态路由和静态路由，搜索SET_ROUTES就可以看到上面的方法，它是把动态路由和静态路由拼在一起放在state中的routes里面
      commit('SET_ROUTES', accessedRoutes)
      // 把动态路由返回
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
