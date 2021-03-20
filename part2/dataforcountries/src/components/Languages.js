import React from 'react'

const Languages = ({languages}) =>
    <div>
        <h2>languages</h2>
        <ul>
            {
                languages.map(language =>
                    <Language key={language.name} name={language.name} />
                )
            }
        </ul>
    </div>

const Language = ({name}) => <li>{name}</li>

export default Languages