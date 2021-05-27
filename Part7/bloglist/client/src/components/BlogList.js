import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const BlogList = ({ children }) => {

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 10,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  return (
    // <div style={blogStyle} className='blog'>
    <Card className='blog' style={{ width: '60%', margin: 'auto' }}>
      <Card.Body>
        <Link to={`/blogs/${children.id}`}>
          {children.title} {children.author}
        </Link>
      </Card.Body>
    </Card>
    // </div>
  )
}

export default BlogList