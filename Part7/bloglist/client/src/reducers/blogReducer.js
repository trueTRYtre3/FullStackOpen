import blogService from '../services/blogService'
import { createNotification } from './notificationReducer'


export const initialBlog = () => {
  return async dispatch => {
    try {
      const response = await blogService.getAll()
      dispatch({
        type: 'INITIALIZE',
        data: response
      })
    } catch(exception) {
      console.log(exception)
    }
  }
}

export const createBlog = newObject => dispatch => {
  dispatch({
    type: 'CREATE',
    data: newObject
  })
  dispatch(createNotification({
    type: 'success',
    text: `a new blog '${newObject.title}' by ${newObject.author} added`
  }))
}


export const updateBlog = newObject => dispatch => {
  dispatch({
    type: 'UPDATE',
    data: newObject
  })
}


export const commentBlog = (newComment) => dispatch => {
  dispatch({
    type: 'COMMENT',
    data: newComment
  })
}


export const removeBlog = (blog) => {
  return dispatch => {
    dispatch({
      type: 'DELETE',
      data: blog.id
    })
    dispatch(createNotification({
      type: 'success',
      text: `'${blog.title}' by ${blog.author} was deleted`
    }))
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE':
    return action.data
  case 'UPDATE':
  case 'COMMENT':
  case 'CREATE':
    for (const n of state) {
      if (n.user && (action.data.user === n.user.id)) {
        action.data.user = n.user
        break
      }
    }
    if (action.type === 'CREATE') {
      return state.concat(action.data)
    }
    return state.map(n => n.id === action.data.id ? action.data : n)
  case 'DELETE':
    return state.filter(n => n.id !== action.data)
  default:
    return state
  }
}

export default reducer