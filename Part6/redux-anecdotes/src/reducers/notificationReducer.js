
export const setNotification = (content, time) => {
    return dispatch => {
        dispatch({
            type: 'SET',
            content
        })
        setTimeout(() => {
            dispatch({ type: 'REMOVE' })
        }, time)
    } 
}

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET':
            return action.content
        case 'REMOVE': 
            return ''
        default: 
            return state
    }
}

export default reducer