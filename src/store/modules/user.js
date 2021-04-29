import { getInfo, login, logout } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    buttons: [],
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_BUTTONS: (state, buttons) => {
      state.buttons = buttons
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          removeToken()
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    async GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const data = response.data

            if (data.roleNames && data.roleNames.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roleNames)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }

            const buttonAuthList = []
            data.permissionValues.forEach(button => {
              buttonAuthList.push(button)
            })

            commit('SET_NAME', data.username)
            commit('SET_AVATAR', data.avatar)
            commit('SET_BUTTONS', buttonAuthList)
            resolve(response)
          }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')// 清空前端vuex中存储的数据
            commit('SET_ROLES', [])// 清空前端vuex中存储的数据
            commit('SET_BUTTONS', [])
            removeToken()// 清空cookie
            resolve()
          }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        debugger
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user

