import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import login from '../services/login'

const Login = ({ loginUser }) => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')
  const dispatch = useDispatch()
  const notifiction = useSelector(state => state.notification)

  const style = { display: notifiction === '' ? 'none' : '' }

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const newUser = await login({ username, password })
      loginUser(newUser)
      changeUsername('')
      changePassword('')
    } catch(exceptions) {
      console.log(exceptions)
      dispatch(createNotification('wrong username or password'))
    }
  }

  return (
    <div>
      <h1>Login to Application</h1>
      <div style={style}>
        <h2 className='errorMessage'>{notifiction}</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <><strong>username: </strong></>
          <input
            type='text'
            value={username}
            id="Username"
            onChange={({ target }) => changeUsername(target.value)}
          />
        </div>
        <div>
          <strong>password: </strong>
          <input
            type="password"
            value={password}
            id="Password"
            onChange={({ target }) => changePassword(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


export default Login