import userService from '../services/userService'

export const initialUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USER',
      data: users
    })
  }
}

export const createUser = (newUser) => {
  return async dispatch => {
    // const user = await userService.create(newUser)
    // dispatch({
    //   type: 'CREATE_USER',
    //   data: user
    // })
    dispatch({
      type: 'CREATE_USER',
      data: newUser
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USER':
    return action.data
  case 'CREATE_USER':
    return state.concat(action.data)
  default:
    return state
  }
}

export default reducer