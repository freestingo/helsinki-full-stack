import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Input from './components/Input'
import Button from './components/Button'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [toBeSearched, setToBeSearched] = useState('')
  const [notification, setNotification] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const notificationTimer = 3000 /* ms */

  const notify = (setter, msg, timer) => {
    setter(msg)
    setTimeout(() => setter(''), timer)
  }

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
          notify(
            setNotification,
            `Updated ${returnedPerson.name}'s number!`,
            notificationTimer
          )
        })
        .catch(error =>
          notify(setErrMsg, error.response.data.error, notificationTimer)
        )
    }
  }

  const handleDelete = (name, id) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPeople(people.filter(person => person.id !== id))
          notify(
            setNotification,
            `Deleted ${name}!`,
            notificationTimer
          )
        })
        .catch(error => {
          notify(
            setErrMsg,
            `${name} has already been deleted from the server`,
            3000
          )
          setPeople(people.filter(person => person.id !== id))
        })
      
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
        notify(
          setNotification,
          `Added ${returnedPerson.name}!`,
          notificationTimer
        )
      })
      .catch(error =>
        notify(setErrMsg, error.response.data.error, notificationTimer)
      )
  }

  const toBeShown = people.filter(
    p => p.name.toLowerCase().includes(toBeSearched.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Error message={errMsg} />
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