import React from 'react'

const Note = ({note, toggleImportance}) =>
  <li>
    {note.content}
    <button onClick={toggleImportance}>
      make {note.important ? 'not' : ''} important
    </button>
  </li>

export default Note