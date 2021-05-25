import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, commentBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/custom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
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

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p><a href={newURL}>{blog.url}</a></p>
      <p>
        {blog.likes} likes <button onClick={updateLike}>like</button>
      </p>
      {blog.user && <p>added by {blog.user.name}</p>}
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