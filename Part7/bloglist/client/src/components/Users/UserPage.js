import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom'

const UserPage = () => {
  const users = useSelector(state => state.user)
  const match = useRouteMatch('/users/:id')
  console.log('match', match)
  const user = match
    ? users.find(n => n.id === match.params.id)
    : null
  console.log('user', user)
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
