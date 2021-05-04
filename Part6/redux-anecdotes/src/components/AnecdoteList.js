import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecodeList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filterWords }) => {
        if (filterWords.length === 0) {
            return anecdotes
        }
        return anecdotes.filter(n => 
            n.content.toLowerCase().includes(filterWords.toLowerCase()))
    })

    const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    const vote = ({ id, content }) => {
        dispatch(newVote(id))
        dispatch(setNotification(`you liked ${content}`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <div>
            {orderedAnecdotes.map(anecodote => (
                <div key={anecodote.id}>
                    <div>
                        {anecodote.content}
                    </div>
                    <div>
                        has {anecodote.votes}
                        <button onClick={() => vote(anecodote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecodeList