import React, { useState } from 'react'

const History = ({allClicks}) =>
  allClicks.length === 0
    ? <div>press a button!</div>
    : <div>button press history: {allClicks.join(' ')}</div>

const Button = ({handleClick, text}) =>
  <button onClick={handleClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const resetAll = () => {
    setAllClicks([])
    setLeft(0)
    setRight(0)
  }

  const incrementClick = (log, setter, val) => () => {
    setAllClicks(allClicks.concat(log))
    setter(val + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick={incrementClick('L', setLeft, left)} text='left' />
      <Button handleClick={resetAll} text='reset' />
      <Button handleClick={incrementClick('R', setRight, right)} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  )

}

export default App
