import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const newURL = blog.url.includes('https://') ? blog.url : `https://${blog.url}`
  console.log('blog2',blog)
  const updateLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateBlog(blog.id, newBlog))
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
      <form>
        <input />
        <button>add comment</button>
      </form>
    </div>
  )
}

export default Blog