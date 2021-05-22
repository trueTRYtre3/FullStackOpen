import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const Create = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [creation, changeCreation] = useState(false)
  const dispatch = useDispatch()

  const showCreation = { display: creation ? '' : 'none' }

  const resetState = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      dispatch(createBlog({ title, author, url }))
      dispatch(createNotification(`a new blog ${title} by ${author} added`))
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
        style={showCreation}>
      create blog</button>
      <div style={showCreation}>
        <h2>Create New Blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title: <input
              type='text'
              id='Title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author: <input
              type='text'
              id='Author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url: <input
              type='text'
              id='Url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
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