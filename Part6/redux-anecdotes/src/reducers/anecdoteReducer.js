import { setNotification } from './notificationReducer'
import service from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.data)
    case 'INITIALIZE':
      return action.data
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
    default: 
      return state
  }
}

export const newVote = anecdote => {
  return async dispatch => {
    dispatch(setNotification(`you liked '${anecdote.content}'`, 8000))
    const obj = { ...anecdote, votes: anecdote.votes + 1 } 
    const newAnecdote = await service.update(anecdote.id, obj)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const newAnecdote = await service.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = data => {
  return async dispatch => {
    dispatch(setNotification(`you created '${data}'`, 8000))

    const newAnecdote = await service.createNew(data)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export default reducer