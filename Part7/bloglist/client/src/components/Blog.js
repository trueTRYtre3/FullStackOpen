import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, Button, ListGroup, Form, Col } from 'react-bootstrap'
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
    if (comment.main.value.length > 0) {
      try {
        dispatch(commentBlog(blog.id, comment.main.value))
        comment.reset()
      } catch(except) {
        console.log(except)
      }
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
      <Card >
        <Card.Body>
          <Card.Title>{blog.title} by {blog.author}</Card.Title>
          <Card.Text>
            <p><a href={newURL}>{blog.url}</a></p>
            {blog.likes} likes <Button onClick={updateLike}>like</Button>
            {blog.user && <p>added by {blog.user.name}</p>}
          </Card.Text>
          <Button variant='danger' onClick={handleDelete}>delete</Button>
        </Card.Body>
      </Card>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>Comments</Card.Title>
          <Form onSubmit={addComment}>
            <Form.Row style={{ justifyContent: 'center' }}>
              <Col xs={5}>
                <Form.Control
                  {...comment.main}
                  placeholder='comments'
                  className='mb-2'
                />
              </Col>
              <Col xs='auto'>
                <Button
                  variant='success'
                  type='submit'
                  className='mb-2'
                >
                  create comment
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <div>
            <ListGroup as='ul'>
              {blog.comments.map((comment, i) =>
                <ListGroup.Item as='li' key={i} style={{ margin: 'auto', width: '70%' }}>
                  {comment}
                </ListGroup.Item>)}
            </ListGroup>
          </div>
        </Card.Body>
      </Card>
      <br />
    </div>
  )
}

export default Blog