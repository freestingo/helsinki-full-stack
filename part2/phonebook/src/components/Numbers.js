import React from 'react'

const Numbers = ({people}) =>
    <div>
        <h2>Numbers</h2>
        {people.map(
            person => <Number
                key={person.name}
                name={person.name}
                number={person.number}
            />
        )}
    </div>

const Number = ({name, number}) =>
    <div>{name} - {number}</div>

export default Numbers