import store from '@/store'

/**
 *
 * @param value
 * @returns {boolean}
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    return roles.some(role => {
      return permissionRoles.includes(role)
    });

  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

// 控制按钮的显示
export function hasBtnPermission(permission) {
  const myBtn = store.getters.buttons
  return myBtn.indexOf(permission) > -1
}
