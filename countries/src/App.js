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
          // console.log(response.data.length)
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
        countries.length === 0 ?
          <p>Too many matches, specify another filter</p> :
          countries.length > 1 ?
            countries.map(country => {
              return <p key={country.alpha2Code}>{country.name}</p>
            }) :
            <>
              <h2>{countries[0].name}</h2>
              <p>capital {countries[0].capital}</p>
              <p>population {countries[0].population}</p>
              <h3>languages</h3>
              <ul>
                {countries[0].languages.map(language => (
                  <li key={language.iso639_1}>{language.name}</li>
                ))}
              </ul>
              <img width="200px" src={countries[0].flag} alt={`flag of ${countries[0].name}`} />
            </>
      }
    </>
  )
}

export default App;
