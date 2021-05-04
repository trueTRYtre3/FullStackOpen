

export const setNotification = content => {
    return {
        type: 'SET',
        content
    } 
}

export const removeNotification = () => {
    return {
        type: 'REMOVE'
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