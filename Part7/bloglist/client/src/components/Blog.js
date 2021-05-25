import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateBlog, commentBlog, removeBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/custom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const comment = useField('text')
  const newURL = blog.url.includes('https://') ? blog.url : `https://${blog.url}`
  const updateLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateBlog(blog.id, newBlog))
  }

  const addComment = e => {
    e.preventDefault()
    try {
      dispatch(commentBlog(blog.id, comment.main.value))
      comment.reset()
    } catch(except) {
      console.log(except)
    }
  }

  const handleDelete = () => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        dispatch(removeBlog(blog.id))
        dispatch(createNotification(`${blog.title} by ${blog.author} was deleted`))
        history.push('/')
      }
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p><a href={newURL}>{blog.url}</a></p>
      <p>
        {blog.likes} likes <button onClick={updateLike}>like</button>
      </p>
      {blog.user && <p>added by {blog.user.name}</p>}
      <button onClick={handleDelete}>delete</button>
      <br />
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input {...comment.main} />
        <button type='submit'>create comment</button>
      </form>
      <div>
        <ul>
          {blog.comments.map((comment, i) =>
            <li key={i}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog