import React, {useState} from 'react'
import Languages from './Languages'

const Countries = ({countries}) =>
    countries.map(country =>
        countries.length > 1
            ? <Country key={country.name} country={country} />
            : <FullCountry key={country.name} country={country} />
    )

const Country = ({country}) => {
    const [countryView, setCountryView] = useState(country.name)
    const [buttonMsg, setButtonMsg] = useState('show')
    
    const handleClick = () =>
        buttonMsg === 'show'
            ? (setCountryView(<FullCountry country={country} />), setButtonMsg('hide'))
            : (setCountryView(country.name), setButtonMsg('show'))

    return (
        <div>
            {countryView}
            <button onClick={handleClick}>{buttonMsg}</button>
        </div>
    )
}  

const FullCountry = ({country}) =>
    <div>
        <h1>{country.name}</h1>
        <div>capital: {country.capital}</div>
        <div>population: {country.population}</div>
        <Languages languages={country.languages} />
        <img src={country.flag} alt="country flag"></img>
    </div>

export default Countries