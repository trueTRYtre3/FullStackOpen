import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'

const AnecodeList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filterWords }) => {
        if (filterWords.length === 0) {
            return anecdotes
        }
        return anecdotes.filter(n => 
            n.content.toLowerCase().includes(filterWords.toLowerCase()))
    })

    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes)
            .map(anecdote => (
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(newVote(anecdote))}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecodeList