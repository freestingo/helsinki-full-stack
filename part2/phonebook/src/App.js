import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'
import Input from './components/Input'
import Button from './components/Button'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [toBeSearched, setToBeSearched] = useState('')

  useEffect(
    () => axios
      .get('http://localhost:3001/persons')
      .then(response => setPeople(response.data)),
    []
  )
  
  const handleChange = (setter) => (event) =>
    setter(event.target.value)
  
  const handleSubmit = (event) => {
    event.preventDefault()
    people.map(p => p.name).includes(newName)
      ? alert(`${newName} has already been added to the phonebook!`)
      : addPerson()
  }
  
  const addPerson = () => {
    setPeople(
      people.concat(
        {
          name: newName,
          number: newNumber,
        }
      )
    )
    setNewName('')
    setNewNumber('')
  }

  const toBeShown = people.filter(
    p => p.name.toLowerCase().includes(toBeSearched.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
        <Input
          text='search by name'
          value={toBeSearched}
          onChange={handleChange(setToBeSearched)}
        />
      <form>
        <h2>Add new number</h2>
        <Input
          text='name: '
          value={newName}
          onChange={handleChange(setNewName)}
        />
        <Input
          text='number: '
          value={newNumber}
          onChange={handleChange(setNewNumber)}
        />
        <Button type="submit" onClick={handleSubmit} text="add" />
      </form>
      <Numbers people={toBeShown} />
    </div>
  )
}

export default App