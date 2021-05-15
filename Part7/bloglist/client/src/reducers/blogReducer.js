import blogService from '../services/blogService'

export const initialBlog = () => {
	return async dispatch => {
		const response = await blogService.getAll()
		response.sort((a,b) => b.likes-a.likes)
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
		const updatedBlog = await blogService.update()
		dispatch({
			type: 'UPDATE',
			data: updatdeBlog
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
		return state.concat(action.data)
	case 'UPDATE':
		return state.map(n => n.id === action.data.id ? action.data : n)
	case 'DELETE':
		return state.filter(n => n.id !== action.data)
	default:
		return state
	}
}

export default reducer