export const filterWords = (content) => {
    return {
        type: 'CHANGE',
        content
    }
}

const reducer = (state='', action) => {
    switch (action.type) {
        case 'CHANGE':
            return action.content
        default:
            return state
    }
}

export default reducer