import blogService from '../services/blogService'

export const initialBlog = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: response
    })
  }
}

export const createBlog = (newObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const updateBlog = (id, newObject) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, newObject)
    dispatch({
      type: 'UPDATE',
      data: updatedBlog
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const newComment = await blogService.addComment(id, { comment })
    dispatch({
      type: 'COMMENT',
      data: newComment
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE':
    return action.data
  case 'CREATE':
  case 'UPDATE':
  case 'COMMENT':
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