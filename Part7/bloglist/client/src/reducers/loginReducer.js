import login from '../services/login'

export const handleLogin = loginObj => {
    return async dispatch => {
        const response = await login(loginObj)
        dispatch({
            type: 'LOGIN',
            data: response
        })
    }
}

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        default:
            return state
    }
}