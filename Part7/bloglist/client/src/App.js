import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlog, createBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { createNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogService'
import BlogList from './components/BlogList'



const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))
  const notification = useSelector(state => state.notification)
  const style = { display: notification === ''  ? 'none' : '' }
  console.log('blogs', blogs)
  console.log('notification:', notification)

  const [user, changeUser] = useState(null)

  const viewCreation = useRef()

  useEffect(() => {
    dispatch(initialBlog())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const tokenUser = JSON.parse(loggedUserJSON)
      changeUser(tokenUser)
      blogService.setToken(tokenUser.token)
    }
  }, [])

  const loginUser = (userObject) => {
    blogService.setToken(userObject.token)
    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify(userObject)
    )
    changeUser(userObject)
  }

  const createdBlog = (title, author, url) => {
    try {
      dispatch(createBlog({ title, author, url }))
      dispatch(createNotification(`a new blog ${title} by ${author} added`))
      viewCreation.current.controlCreate()
    } catch(exception) {
      console.log(exception)
    }
  }

  const updateBlogs = (id, newObj) => {
    dispatch(updateBlog(id, newObj))
  }

  const deleteBlogs = ({ id,title,author }) => {
    try {
      dispatch(createNotification(`${title} by ${author} was deleted`))
      dispatch(removeBlog(id))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    changeUser(null)
  }


  return (
    <div>
      <h1>Blogs</h1>
      {user === null
        ? <Login loginUser={loginUser} />
        : <>
          <div style={style}>
            <h2 className='message'>{notification}</h2>
          </div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <Blog ref={viewCreation} cancelButton='cancel'>
            <Create createdBlog={createdBlog} />
          </Blog>
          <br />
          {blogs.map(blog =>
            <BlogList
              blog={blog}
              key={blog.id}
              updateBlogs={updateBlogs}
              deleteBlogs={deleteBlogs}
            />
          )}
        </>
      }
    </div>
  )
}

export default App
