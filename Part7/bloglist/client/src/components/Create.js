import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, Card, Col, Row } from 'react-bootstrap'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/custom'

const Create = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [creation, changeCreation] = useState(false)
  const dispatch = useDispatch()

  const creationButton = { display: creation ? 'none' : '' }
  const creationForm = { display: creation ? '' : 'none' }

  const resetState = () => {
    [title,author,url].forEach(n => n.reset())
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      dispatch(createBlog({
        title: title.main.value,
        author: author.main.value,
        url: url.main.value
      }))
      dispatch(createNotification(`a new blog ${title.main.value} by ${author.main.value} added`))
      resetState()
      changeCreation(!creation)
    } catch (error) {
      console.log(error)
    }
  }

  const cancelButton = () => {
    resetState()
    changeCreation(!creation)
  }

  return (
    <div>
      <Button
        onClick={() => changeCreation(!creation)}
        style={creationButton}>
      create blog</Button>
      <div style={creationForm}>
        <Card>
          <Card.Body>
            <Card.Title>Create New Blog</Card.Title>
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} style={{ justifyContent: 'center' }}>
                <Form.Label column sm={1}>
                  Title:
                </Form.Label>
                <Col sm={5}>
                  <Form.Control id='Title' {...title.main} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} style={{ justifyContent: 'center' }}>
                <Form.Label column sm={1}>
                  Author:
                </Form.Label>
                <Col sm={5}>
                  <Form.Control id='Author' {...author.main} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} style={{ justifyContent: 'center' }}>
                <Form.Label column sm={1}>
                  URL:
                </Form.Label>
                <Col sm={5}>
                  <Form.Control id='Url' {...url.main} />
                </Col>
              </Form.Group>
              <Row style={{ justifyContent: 'center' }}>
                <Col xs='auto'>
                  <Button id='creation' type='submit'>Create</Button>
                </Col>
                <Col xs='auto'>
                  <Button variant='outline-dark' type='button' onClick={cancelButton}>Cancel</Button>
                </Col>
              </Row>
            </Form>
            {/* <Button variant='outline-dark' onClick={cancelButton}>Cancel</Button> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Create