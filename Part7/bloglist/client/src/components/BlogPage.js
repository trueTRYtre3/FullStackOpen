import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Create from './Create'
import BlogList from './BlogList'

const BlogPage = () => {
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))
  const login = useSelector(state => state.login)
  const notification = useSelector(state => state.notification)

  return (
    <div>
      <h2>Blogs</h2>
      {notification && <Alert variant='success'>{notification}</Alert>}
      {login && <Create />}
      <br />
      {blogs.map(blog =>
        <BlogList key={blog.id}>
          {blog}
        </BlogList>
      )}
      <br />
    </div>
  )
}

export default BlogPage