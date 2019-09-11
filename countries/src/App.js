import React, { useState } from 'react';
import axios from 'axios'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  const onQueryChange = event => {
    setQuery(event.target.value)
    if (event.target.value !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
        .then(response => {
          console.log(response.data.length)
          if (response.data.length <= 10) {
            setCountries(response.data)
          } else {
            setCountries([])
          }
        })
    }
  }

  return (
    <>
      <p>find countries <input value={query} onChange={onQueryChange} /></p>
      {
        countries.length === 0 ? <p>Too many matches, specify another filter</p> :
          countries.map(country => {
            return <p key={country.alpha2Code}>{country.name}</p>
          })
      }
    </>
  )
}

export default App;
