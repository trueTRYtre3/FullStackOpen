import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { createNotification } from '../reducers/notificationReducer'
import { handleLogin } from '../reducers/loginReducer'
import login from '../services/login'
import { useField } from '../hooks/custom'

const Login = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()
  const notifiction = useSelector(state => state.notification)
  const history = useHistory()

  const style = { display: notifiction === '' ? 'none' : '' }

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
      <div style={style}>
        <h3 className='errorMessage'>{notifiction}</h3>
      </div>
      <form onSubmit={loginUser}>
        <div>
          <><strong>username: </strong></>
          <input
            id="Username"
            {...username.main}
          />
        </div>
        <div>
          <strong>password: </strong>
          <input
            id="Password"
            {...password.main}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


export default Login