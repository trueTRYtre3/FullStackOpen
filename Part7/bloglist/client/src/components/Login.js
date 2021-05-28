import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { createNotification } from '../reducers/notificationReducer'
import { handleLogin } from '../reducers/loginReducer'
import login from '../services/loginService'
import { useField } from '../hooks/custom'

const Login = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()
  const notifiction = useSelector(state => state.notification)
  const history = useHistory()

  const style = {
    show: {
      display: notifiction === '' ? 'none' : '',
      width: '50%',
      margin: 'auto'
    },
    form: {
      textAlign: 'center',
      width: '70%',
      margin: 'auto'
    }
  }

  const resetState = () =>
    [username,password].forEach(n => n.reset())

  const loginUser = async e => {
    e.preventDefault()
    try {
      const newUser = await login({
        username: username.main.value,
        password: password.main.value
      })
      dispatch(handleLogin(newUser))
      resetState()
      history.push('/')
    } catch(exceptions) {
      console.log(exceptions)
      dispatch(createNotification('wrong username or password'))
    }
  }

  return (
    <div>
      <h2>Login to Application</h2>
      <Alert variant='danger' style={style.show}>
        <h4>{notifiction}</h4>
      </Alert>
      <br />
      <Form onSubmit={loginUser}>
        <Form.Group className="md-3">
          <Form.Label><strong>Username</strong></Form.Label>
          <Form.Control {...username.main} placeholder="Username" id='Username' style={style.form} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>Password</strong></Form.Label>
          <Form.Control {...password.main} placeholder="Password" id='Password' style={style.form} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}


export default Login