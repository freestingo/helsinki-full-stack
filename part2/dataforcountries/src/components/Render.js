import React from 'react'
import Countries from './Countries'

const Render = ({countries}) =>
    countries.length > 10
        ? <GeneralQuery matches={countries.length} />
        : <Countries countries={countries} />

const GeneralQuery = ({matches}) =>
    <div id="generalquery">
        Please, input a more specific query! 
        ({matches} current matches)
    </div>

export default Render