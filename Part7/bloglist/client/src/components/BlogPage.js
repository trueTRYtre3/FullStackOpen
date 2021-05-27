import React from 'react'
import { useSelector } from 'react-redux'
import Create from './Create'
import BlogList from './BlogList'

const BlogPage = () => {
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))
  const login = useSelector(state => state.login)
  const notification = useSelector(state => state.notification)

  return (
    <div>
      <h2>Blogs</h2>
      {notification && <h3 className='message'>{notification}</h3>}
      {login && <Create />}
      <br />
      {blogs.map(blog =>
        <BlogList key={blog.id}>
          {blog}
        </BlogList>
      )}
    </div>
  )
}

export default BlogPage