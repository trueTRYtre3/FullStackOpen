import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/custom'

const CreateNew = (props) => {
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

    const history = useHistory()
    
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.main.value,
        author: author.main.value,
        info: info.main.value,
        votes: 0
      })
      history.push('/')
      props.setNotification(`a new anecdote ${content.value} created!`)
      setTimeout(() => {
        props.setNotification('')
      }, 10000)
    }

    const resetState = () => {
      [content, author, info].forEach(e => {
        e.reset(true)
      })
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
              content 
              <input {...content.main}/>
          </div>
          <div>
              author 
              <input {...author.main} />
          </div>
          <div>
              url for more info 
              <input {...info.main} />
          </div>
          <button>create</button>
        </form>
        <button onClick={resetState}>reset</button>
      </div>
    )
  
}

export default CreateNew
  