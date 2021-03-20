import React from 'react'
import Button from './Button'

const Numbers = ({people, handleDelete}) =>
    <div>
        <h2>Numbers</h2>
        {people.map(person =>
            <Entry
                key={person.id}
                id={person.id}
                name={person.name}
                number={person.number}
                handleDelete={handleDelete}
            /> 
        )}
    </div>

const Entry = ({id, name, number, handleDelete}) =>
    <div>
        {name} - {number}
        <Button
            type="submit"
            onClick={handleDelete(name, id)}
            text="delete"
        />
    </div>

export default Numbers