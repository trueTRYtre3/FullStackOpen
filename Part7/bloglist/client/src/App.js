import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { initialBlog } from './reducers/blogReducer'
import { initialUsers } from './reducers/userReducer'
import { isLogged } from './reducers/loginReducer'
import BlogPage from './components/BlogPage'
import Blog from './components/Blog'
import Users from './components/Users/Users'
import UserPage from './components/Users/UserPage'
import Login from './components/Login'
import Header from './components/Header'
import UserCreate from './components/Users/UserCreate'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isLogged())
    dispatch(initialBlog())
    dispatch(initialUsers())
  }, [])
  return (
    <div className='text-center'>
      <Header />
      <br />
      <div className='container'>
        <Switch>
          <Route path='/' exact component={BlogPage} />
          <Route path='/login' component={Login} />
          <Route path='/blogs/:id' component={Blog} />
          <Route path='/users' exact component={Users} />
          <Route path='/users/:id' component={UserPage} />
          <Route path='/account' component={UserCreate} />
        </Switch>
      </div>
    </div>
  )
}

export default App
