import React, { useState } from 'react'

const Section = ({title}) =>
  <h1>{title}</h1>

const Anecdote = ({text, votes}) =>
  text
    ? <div><p>{text}</p><p>votes: {votes}</p></div>
    : <div><p>No anecdote available!</p></div>

const Button = ({handleClick, text}) =>
  <div>
    <button onClick={handleClick}>{text}</button>
  </div>

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  })

  const randomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const vote = () => {
    const newVotes = {...votes}
    newVotes[selected] = newVotes[selected] + 1
    setVotes(newVotes)
  }

  const favourite = Object.entries(votes).reduce((a, b) => a[1] > b[1] ? a : b)[0]

  return (
    <div>
      <Section title='Anecdote of the day' />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={vote} text='vote' />
      <Button handleClick={randomAnecdote} text='next anecdote' />

      <Section title='Most voted anecdote' />
      <Anecdote text={anecdotes[favourite]} votes={votes[favourite]} />
    </div>
  )
}

export default App