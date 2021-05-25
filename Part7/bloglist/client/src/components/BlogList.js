import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ children }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${children.id}`}>
        {children.title} {children.author}
      </Link>
    </div>
  )
}

export default BlogList