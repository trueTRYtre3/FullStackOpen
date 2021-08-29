import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const Authors = (props) => {
  const [name, changeName] = useState('')
  const [born, changeBorn] = useState('')
  const results = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => props.setError(error.networkError.result.errors[0].message)  
  })

  if (!props.show) {
    return null
  }

  if (results.loading) {
    return <div>loading...</div>
  }
  const authors = results.data.allAuthors
  
  const authorSubmit = async event => {
    event.preventDefault()
    
    console.log('edit author...')
    await editAuthor({ variables: { name, born: Number(born) } })

    changeName('')
    changeBorn('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <br />
      <div>
        <h3>Set birthyear</h3>
            <form onSubmit={authorSubmit}>
              <div>
                name
                <input 
                  value={name}
                  name={name}
                  onChange={({ target }) => changeName(target.value)}
                />
              </div>
              <div>
                born
                <input 
                  value={born}
                  name={born}
                  onChange={({ target }) => changeBorn(target.value)}
                />
              </div>
              <button type="submit">update author</button>
            </form>
      </div>
    </div>
  )
}

export default Authors
