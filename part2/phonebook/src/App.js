import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Input from './components/Input'
import Button from './components/Button'
import personService from './services/persons'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [toBeSearched, setToBeSearched] = useState('')

  useEffect(() =>
    personService
      .getAll()
      .then(initialPeople => setPeople(initialPeople)),
    []
  )
  
  const handleChange = (setter) => (event) =>
    setter(event.target.value)
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const match = people.find(p => p.name === newName)
    console.log('match: ', match)
    match
      ? updatePerson(match)
      : addPerson()
  }

  const updatePerson = (match) => {
    if (window.confirm(
      `${match.name} has already been added to this phonebook. Do you wish to update their number?`
    )) {
      const updatedPerson = {...match, number: newNumber}
      personService
        .update(match.id, updatedPerson)
        .then(returnedPerson => {
          setPeople(people.map(p => p.id !== match.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (name, id) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
      setPeople(people.filter(person => person.id !== id))
    }  
  }  
  
  const addPerson = () => {
    const newPerson = {name: newName, number: newNumber}
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPeople(people.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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
      <Numbers people={toBeShown} handleDelete={handleDelete} />
    </div>
  )
}

export default App