import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Render from './components/Render'
import Input from './components/Input'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(
    () => axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data)),
    []
  )

  const handleFilterChange = (event) => 
    setFilter(event.target.value)

  const filteredCountries =
    countries.filter(country =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <>
      <Input
        text="search by country name: "
        value={filter}
        onChange={handleFilterChange}
      />
      <Render countries={filteredCountries} />
    </>
  )

}

export default App;
