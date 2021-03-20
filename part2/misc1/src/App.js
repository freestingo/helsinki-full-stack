import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(
    () => axios
      .get('http://localhost:3001/notes')
      .then(response => setNotes(response.data)),
    [])

  const addNote = (event) => {
    event.preventDefault()
    setNotes(notes.concat(
      {
        id: notes.length + 1,
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() < 0.5,
      }
    ))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log('event target:', event.target);
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} content={note.content} />  
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'} notes</button>
    </>
  )
}


export default App