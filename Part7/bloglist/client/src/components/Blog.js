import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Card, Button, ListGroup, Form, Col } from 'react-bootstrap'
import { updateBlog, commentBlog, removeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogService'
import { useField } from '../hooks/custom'
import { createNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)
  const comment = useField('text')

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(n => n.id === match.params.id)
    : null
  console.log('blog', blog)
  console.log('login', login)
  if (!blog) {
    return null
  }
  const newURL = blog.url.includes('https://') ? blog.url : `https://${blog.url}`

  const updateLike = async () => {
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const blogUpdate = await blogService.update(blog.id, newBlog)
      dispatch(updateBlog(blogUpdate))
    } catch(exception) {
      console.log(exception)
    }
  }

  const postComment = async e => {
    e.preventDefault()
    if (comment.main.value.length > 0) {
      try {
        const newComment = await blogService.addComment(blog.id, { comment: comment.main.value })
        dispatch(commentBlog(newComment))
        comment.reset()
      } catch(except) {
        console.log(except)
      }
    }
  }

  const handleDelete = async () => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteBlog(blog.id)
        dispatch(removeBlog(blog))
        history.push('/')
      }
    } catch(exception) {
      dispatch(createNotification({
        type: 'danger',
        text: 'Unable to delete blog'
      }))
    }
  }

  const DeleteButton = () => {
    if (blog.user && (login.name === blog.user.name) && (login.username === blog.user.username)) {
      return <Button variant='danger' onClick={handleDelete}>delete</Button>
    }
  }

  return (
    <div>
      <Card >
        <Card.Body>
          <Card.Title>{blog.title} by {blog.author}</Card.Title>
          <Card.Text><a href={newURL}>{blog.url}</a></Card.Text>
          <Card.Text>{blog.likes} likes <Button onClick={updateLike}>like</Button></Card.Text>
          {blog.user && <Card.Text>added by {blog.user.name}</Card.Text>}
          {login && DeleteButton()}
        </Card.Body>
      </Card>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>Comments</Card.Title>
          <Form onSubmit={postComment}>
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