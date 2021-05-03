import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'

const AnecodeList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {orderedAnecdotes.map(anecodote => (
                <div key={anecodote.id}>
                    <div>
                        {anecodote.content}
                    </div>
                    <div>
                        has {anecodote.votes}
                        <button onClick={() => dispatch(newVote(anecodote.id))}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecodeList