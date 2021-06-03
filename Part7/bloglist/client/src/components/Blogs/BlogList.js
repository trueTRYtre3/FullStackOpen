import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const BlogList = ({ children }) => {

  return (
    <Card className='blog' style={{ width: '60%', margin: 'auto' }}>
      <Card.Body>
        <Link to={`/blogs/${children.id}`}>
          {children.title} {children.author}
        </Link>
      </Card.Body>
    </Card>
  )
}

export default BlogList