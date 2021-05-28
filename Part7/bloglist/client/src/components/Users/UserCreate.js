import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Form, Button, Alert } from 'react-bootstrap'
import { useField } from '../../hooks/custom'
import { createUser } from '../../reducers/userReducer'
import { createNotification } from '../../reducers/notificationReducer'
import { handleLogin } from '../../reducers/loginReducer'
import userService from '../../services/userService'
import login from '../../services/loginService'

const UserCreate = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const notification = useSelector(state => state.notification)
  const username = useField('text')
  const name = useField('text')
  const password = useField('password')
  const checkPassword = useField('password')

  const resetState = () => {
    [username, name, password, checkPassword].forEach(n => {
      n.reset()
    })
  }

  const validPassword = async (e) => {
    e.preventDefault()
    if (password.main.value === checkPassword.main.value) {
      try {
        const request = await userService.create({
          username: username.main.value,
          name: name.main.value,
          password: password.main.value
        })
        console.log('request', request)
        dispatch(createUser(request))
        const newUser = await login({
          username: username.main.value,
          password: password.main.value
        })
        dispatch(handleLogin(newUser))
        resetState()
        history.push('/')
      } catch(exception) {
        dispatch(createNotification('Username or Password is invalid'))
      }
    } else {
      dispatch(createNotification('Passwords do not match'))
    }
  }

  return (
    <div>
      <h1>Create User</h1>
      {notification &&
      <Alert variant='warning' style={{ width: '60%', margin: 'auto' }}>
        {notification}
      </Alert>}
      <br />
      <Form onSubmit={validPassword}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control id='Username' {...username.main} placeholder="Username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            id='Name'
            {...name.main}
            placeholder="Name"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id='Password_1'
            {...password.main}
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter Password Again</Form.Label>
          <Form.Control
            id='Password_2'
            {...checkPassword.main}
            placeholder="Reenter Password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginBottom: 25 }}>
          Create Account
        </Button>
      </Form>
    </div>
  )
}

export default UserCreate
