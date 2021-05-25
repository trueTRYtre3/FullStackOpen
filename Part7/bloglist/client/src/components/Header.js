import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/loginReducer'

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)

  const handleLogin = login
    ? <h2>{login.name} logged in <button onClick={() => dispatch(handleLogout())}>logout</button></h2>
    : <button onClick={() => history.push('/login')}>login</button>

  return (
    <div>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      {handleLogin}
    </div>
  )
}

export default Header