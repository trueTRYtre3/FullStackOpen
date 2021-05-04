import React from 'react'
import { useDispatch } from 'react-redux'
import { filterWords } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = event => {
        const word = event.target.value
        dispatch(filterWords(word))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div>
            filter <input style={style} onChange={handleChange} />
        </div>
    )
}

export default Filter