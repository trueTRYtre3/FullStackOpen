import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/custom'

const Create = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [creation, changeCreation] = useState(false)
  const dispatch = useDispatch()

  const creationButton = { display: creation ? 'none' : '' }
  const creationForm = { display: creation ? '' : 'none' }

  const resetState = () => {
    [title,author,url].forEach(n => n.reset())
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      dispatch(createBlog({
        title: title.main.value,
        author: author.main.value,
        url: url.main.value
      }))
      dispatch(createNotification(`a new blog ${title.main.value} by ${author.main.value} added`))
      resetState()
      changeCreation(!creation)
    } catch (error) {
      console.log(error)
    }
  }

  const cancelButton = () => {
    resetState()
    changeCreation(!creation)
  }

  return (
    <div>
      <button
        onClick={() => changeCreation(!creation)}
        style={creationButton}>
      create blog</button>
      <div style={creationForm}>
        <h2>Create New Blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title: <input
              id='Title'
              {...title.main}
            />
          </div>
          <div>
            author: <input
              id='Author'
              {...author.main}
            />
          </div>
          <div>
            url: <input
              id='Url'
              {...url.main}
            />
          </div>
          <button id='creation' type='submit'>Create</button>
        </form>
        <button onClick={cancelButton}>cancel</button>
      </div>
    </div>
  )
}

export default Create