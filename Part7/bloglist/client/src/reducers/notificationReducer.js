let handleTime
export const createNotification = data => {
  return async dispatch => {
    dispatch({
      type: 'NEW',
      data
    })
    if (handleTime) clearTimeout(handleTime)
    handleTime = setTimeout(() => {
      dispatch({
        type: 'REMOVE',
        data: { type: null, text: null }
      })
    }, 5000)
  }
}

const reducer = (state = { type: null, text: null }, action) => {
  switch (action.type) {
  case 'NEW':
  case 'REMOVE':
    return action.data
  default:
    return state
  }
}

export default reducer