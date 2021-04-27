import { constantRoutes } from '@/router'
import { getMenu } from '@/api/login'
import Layout from '@/layout'

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  try {
    return asyncRouterMap.filter(route => {
      if (route.component) {
        if (route.component === 'Layout') { // Layout组件特殊处理
          route.component = Layout
        } else {
          const component = route.component
          route.component = () => {
            require([`@/views${component}.vue`], resolve)
          }
          // console.log(route.component)
        }
      }
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
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
    // 取后台路由
    const asyncRouter = await getMenu()

    return new Promise(resolve => {
      // permissionList中放着所有的一级父路由，一级父路由中有children，children中放着二级菜单和三级按钮变化的子路由，二级菜单和三级按钮变化的子路由中都没有children
      const tmp = asyncRouter.data.items
      // 对一级父路由列表进行处理，生成动态路由
      const accessedRoutes = filterAsyncRouter(tmp)
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
