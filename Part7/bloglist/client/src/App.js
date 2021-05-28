import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { initialBlog } from './reducers/blogReducer'
import { initialUsers } from './reducers/userReducer'
import { isLogged } from './reducers/loginReducer'
import BlogPage from './components/BlogPage'
import Blog from './components/Blog'
import Users from './components/Users/Users'
import UserPage from './components/Users/UserPage'
import Login from './components/Login'
import Header from './components/Header'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  // console.log('blogs', blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const tokenUser = JSON.parse(loggedUserJSON)
      dispatch(isLogged(tokenUser))
    }
  }, [])

  useEffect(() => {
    dispatch(initialBlog())
  }, [])

  useEffect(() => {
    dispatch(initialUsers())
  }, [])

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(n => n.id === match.params.id)
    : null

  return (
    <div className='text-center'>
      <Header />
      <br />
      <div className='container'>
        <Switch>
          <Route path='/' exact component={BlogPage} />
          <Route path='/login' component={Login} />
          <Route path='/blogs/:id'>
            {blog && <Blog blog={blog} />}
          </Route>
          <Route path='/users' exact component={Users} />
          <Route path='/users/:id' component={UserPage} />
        </Switch>
      </div>
    </div>
  )
}

export default App
