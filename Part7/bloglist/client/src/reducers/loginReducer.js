import blogService from '../services/blogService'

export const handleLogin = loginObj => {
  return async dispatch => {
    blogService.setToken(loginObj.token)
    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify(loginObj)
    )
    await dispatch({
      type: 'LOGIN',
      data: loginObj
    })
  }
}

export const isLogged = (userObj) => {
  return async dispatch => {
    blogService.setToken(userObj)
    await dispatch({
      type: 'STAY',
      data: userObj
    })
  }
}

export const handleLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    await dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
  case 'STAY':
  case 'LOGOUT':
    return action.data
  default:
    return state
  }
}

export default reducer