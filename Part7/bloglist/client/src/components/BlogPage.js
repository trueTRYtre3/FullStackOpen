import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/loginReducer'
import Login from './Login'
import Create from './Create'
import BlogList from './BlogList'

const BlogPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.login)
  const style = { display: notification === ''  ? 'none' : '' }

  return (
    <div>
      {user === null
        ? <Login />
        : <>
          <div style={style}>
            <h3 className='message'>{notification}</h3>
          </div>
          {user.name} logged in <button onClick={() => dispatch(handleLogout())}>logout</button>
          <Create />
          <br />
          {blogs.map(blog =>
            <BlogList key={blog.id}>
              {blog}
            </BlogList>
          )}
        </>
      }
    </div>
  )
}

export default BlogPage