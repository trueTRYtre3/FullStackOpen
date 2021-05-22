import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialBlog } from '../reducers/blogReducer'
// import { createNotification } from '../reducers/notificationReducer'
import { isLogged, handleLogout } from '../reducers/loginReducer'
// import Blog from './BlogList'
import Login from './Login'
import Create from './Create'
import Blog from './Blog'



const BlogPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.login)
  const style = { display: notification === ''  ? 'none' : '' }
  console.log('user', user)
  console.log('blogs', blogs)

  useEffect(() => {
    if (user) {
      dispatch(initialBlog())
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const tokenUser = JSON.parse(loggedUserJSON)
      dispatch(isLogged(tokenUser))
    }
  }, [])


  // const updateBlogs = (id, newObj) => {
  //   dispatch(updateBlog(id, newObj))
  // }

  // const deleteBlogs = ({ id,title,author }) => {
  //   try {
  //     dispatch(createNotification(`${title} by ${author} was deleted`))
  //     dispatch(removeBlog(id))
  //   } catch(exception) {
  //     console.log(exception)
  //   }
  // }


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
          {blogs.map(blog =>
            <Blog key={blog.id}>
              {blog.title}
            </Blog>
          )}
        </>
      }
    </div>
  )
}

export default BlogPage