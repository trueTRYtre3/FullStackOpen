import React from 'react'

const Blog = ({ blog }) => {
  console.log('blog2',blog)
  if (blog) {
    return (
      <div>
        <h2>{blog.title} {blog.author}</h2>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
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
  return (
    <div></div>
  )
}

export default Blog