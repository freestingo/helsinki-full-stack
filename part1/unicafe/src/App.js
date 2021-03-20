import React, { useState } from 'react'

const SectionTitle = ({name}) =>
  <h1>{name}</h1>

const Button = ({text, handleClick}) =>
  <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  return total === 0
    ? <div>No feedback yet!</div>
    : <Table
        good={good}
        neutral={neutral}
        bad={bad}
        tot={total}
        avg={Number((good - bad) / total).toFixed(2)}
        positives={Number(good / total * 100).toFixed(2) + '%'}
      />
}

const Table = ({good, neutral, bad, tot, avg, positives}) =>
  <table>
    <tbody>
      <Statistic text='good' value={good}/>
      <Statistic text='neutral' value={neutral}/>
      <Statistic text='bad' value={bad}/>
      <Statistic text='total' value={tot}/>
      <Statistic text='average' value={avg}/>
      <Statistic text='positive' value={positives}/>
    </tbody>
  </table>
  

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addFeedback = (setter, val) =>
    () => setter(val + 1)

  return (
    <>
      <SectionTitle name='Give feedback!' />
      <Button text='good' handleClick={addFeedback(setGood, good)} />
      <Button text='neutral' handleClick={addFeedback(setNeutral, neutral)} />
      <Button text='bad' handleClick={addFeedback(setBad, bad)} />
      <SectionTitle name='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
