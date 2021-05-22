import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Create from './Create'
import { initialBlog } from '../reducers/blogReducer'
import { handleLogout } from '../reducers/loginReducer'
// import { isLogged } from '../reducers/loginReducer'
import Blog from './Blog'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes-a.likes))
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.login)
  const style = { display: notification === '' ? 'none' : '' }
  const dispatch = useDispatch()
  console.log('user', user)

  useEffect(() => {
    dispatch(initialBlog())
  }, [])

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  //   if (loggedUserJSON) {
  //     const tokenUser = JSON.parse(loggedUserJSON)
  //     dispatch(isLogged(tokenUser))
  //   }
  // }, [])

  return (
    <div>
      <div style={style}>
        <h3 className='message'>{notification}</h3>
      </div>
      {user.name} logged in <button onClick={() => dispatch(handleLogout())}>logout</button>
      <Create />
      {blogs.map(blog =>
        <Blog key={blog.id}>
          {blog.title}
        </Blog>)}
    </div>
  )
}

BlogList.displayName = 'Blog'
BlogList.propTypes = {
  cancelButton: PropTypes.string.isRequired
}

export default BlogList