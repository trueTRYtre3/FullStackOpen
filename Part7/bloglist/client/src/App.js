import React from 'react'
// import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
// import { initialBlog } from './reducers/blogReducer'
// import { createNotification } from './reducers/notificationReducer'
// import { isLogged } from './reducers/loginReducer'
// import Blog from './components/BlogList'
// import Create from './components/Create'
import BlogPage from './components/BlogPage'



const App = () => {
  // const dispatch = useDispatch()
  // const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))
  // const notification = useSelector(state => state.notification)
  // const user = useSelector(state => state.login)
  // const style = { display: notification === ''  ? 'none' : '' }

  // const viewCreation = useRef()

  // useEffect(() => {
  //   dispatch(initialBlog())
  // }, [])

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  //   if (loggedUserJSON) {
  //     const tokenUser = JSON.parse(loggedUserJSON)
  //     dispatch(isLogged(tokenUser))
  //   }
  // }, [])


  // const createdBlog = (title, author, url) => {
  //   try {
  //     dispatch(createBlog({ title, author, url }))
  //     dispatch(createNotification(`a new blog ${title} by ${author} added`))
  //     viewCreation.current.controlCreate()
  //   } catch(exception) {
  //     console.log(exception)
  //   }
  // }

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
      {/* <Header /> */}
      <h1>Blog App</h1>
      <Switch>
        <Route path='/' exact component={BlogPage} />
      </Switch>
      {/* {user === null
        ? <Login />
        : <>
          <div style={style}>
            <h2 className='message'>{notification}</h2>
          </div>
          {user.name} logged in <button onClick={() => dispatch(handleLogout())}>logout</button>
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
      } */}
    </div>
  )
}

export default App
