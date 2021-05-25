import React from 'react'
import { useSelector } from 'react-redux'

const User = () => {
  const user = useSelector(state => state.user)
  console.log(user)
  return (
    <div>
      <h2>Users</h2>

    </div>
  )
}

export default User
