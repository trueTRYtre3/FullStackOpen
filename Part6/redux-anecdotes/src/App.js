import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecodeList from './components/AnecdoteList'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App