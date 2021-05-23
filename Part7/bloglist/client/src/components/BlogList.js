import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ children }) => {
  // const [view, changeView] = useState('view')

  // const display = { display: view === 'view' ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const newDisplay = () => {
  //   view === 'view' ? changeView('hide') : changeView('view')
  // }

  // const handleLikes = () => {
  //   try {
  //     const newBlog = {
  //       ...blog,
  //       likes: blog.likes + 1
  //     }
  //     updateBlogs(blog.id, newBlog)
  //   } catch (exception) {
  //     console.log(exception)
  //   }
  // }

  // const handleDelete = () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     deleteBlogs(blog)
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
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${children.id}`}>
        {children.title} {children.author}
      </Link>
      {/* <span>{blog.title} {blog.author} </span><button onClick={newDisplay} style={{ borderRadius: 4 }}>{view}</button>
      <div style={display} className='extraDetails'>
        <p>{blog.url}</p>
						likes {blog.likes} <button style={{ borderRadius: 4 }} onClick={handleLikes} id='like-button'>like</button>
        <p>{blog.user !== undefined && blog.user.name}</p>
        <button onClick={handleDelete}>remove</button>
      </div> */}
    </div>
  )
}

export default BlogList