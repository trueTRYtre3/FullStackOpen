import blogService from '../services/blogService'

export const handleLogin = loginObj => {
  return async dispatch => {
    blogService.setToken(loginObj.token)
    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify(loginObj)
    )
    dispatch({
      type: 'LOGIN',
      data: loginObj
    })
  }
}

export const isLogged = (userObj) => {
  return async dispatch => {
    blogService.setToken(userObj)
    dispatch({
      type: 'STAY',
      data: userObj
    })
  }
}

export const handleLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch({
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