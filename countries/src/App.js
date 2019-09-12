import React, { useState } from 'react';
import axios from 'axios'

const Country = ({ country }) => (
  <>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>languages</h3>
    <ul>
      {country.languages.map(language => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>
    <img width="200px" src={country.flag} alt={`flag of ${country.name}`} />
  </>
)

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])

  const onQueryChange = event => {
    setQuery(event.target.value)
    if (event.target.value !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
        .then(response => {
          // console.log(response.data.length)
          if (response.data.length <= 10) {
            setCountries(response.data)
            setShowCountry(Array.from({ length: response.data.length }, (v, i) => 0))
          } else {
            setCountries([])
            setShowCountry([])
          }
        })
    }
  }

  const toggleShowCountry = (ix) => {
    // console.log(showCountry)
    // console.log(ix)
    showCountry[ix] === 0 ? setShowCountry(showCountry.slice(0, ix).concat(1).concat(...showCountry.slice(ix + 1))) : setShowCountry(showCountry.slice(0, ix).concat(0).concat(...showCountry.slice(ix + 1)))
  }

  return (
    <>
      <p>find countries <input value={query} onChange={onQueryChange} /></p>
      {
        countries.length === 0 ?
          <p>Too many matches, specify another filter</p> :
          countries.length > 1 ?
            countries.map((country, i) => {
              return (
                <React.Fragment key={country.alpha2Code}>
                  <p>
                    {country.name}
                    &nbsp;<button onClick={event => toggleShowCountry(i)}>
                      {showCountry[i] === 1 ? 'hide' : 'show'}
                    </button>
                  </p>
                  {showCountry[i] === 1 ? <Country country={countries[i]} /> : null}
                </ React.Fragment>
              )
            }) : <Country country={countries[0]} />
      }
    </>
  )
}

export default App;
