import React, { useState } from 'react'

const Section = ({title}) =>
  <h1>{title}</h1>

const Anecdote = ({text, votes}) =>
    <div><p>{text}</p><p>votes: {votes}</p></div>

const Favourite = ({anecdote}) =>
  anecdote.votes === 0
    ? <div><p>No votes yet!</p></div>
    : <Anecdote text={anecdote.text} votes={anecdote.votes} />

const Button = ({handleClick, text}) =>
  <div><button onClick={handleClick}>{text}</button></div>

const App = () => {
   
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState([
    {
      text: 'If it hurts, do it more often',
      votes: 0
    },
    {
      text: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      text: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    }
  ])

  const random = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const vote = (anecdotes) => () => {
    anecdotes[selected].votes = anecdotes[selected].votes + 1
    setAnecdotes(anecdotes)
  }

  const favourite = anecdotes.reduce((a, b) => a.votes > b.votes ? a : b)

  return (
    <div>
      <Section title='Anecdote of the day' />
      <Anecdote text={anecdotes[selected].text} votes={anecdotes[selected].votes} />
      <Button handleClick={vote([...anecdotes])} text='vote' />
      <Button handleClick={random} text='next anecdote' />
      <Section title='Most voted anecdote' />
      <Favourite anecdote={favourite} />
    </div>
  )
}

export default App