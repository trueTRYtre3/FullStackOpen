import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
      <br />
      <Table responsive style={{ width: '85%', margin: 'auto' }}>
        <thead>
          <tr>
            <th>Added Blogs</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map(blog => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserPage
