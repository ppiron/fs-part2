import React, { useState } from 'react';
import axios from 'axios'

const Country = ({ country, weather = {} }) => (
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
    {Object.entries(weather).length === 0 && weather.constructor === Object ? null :
      <>
        <h3>Weather in {country.capital}</h3>
        <p><b>temperature:</b> {weather.current.temperature}</p>
        <img width="50px" src={weather.current.weather_icons[0]} alt={`weather in ${country.capital}`} />
        <p><b>wind:</b> {weather.current.wind_speed} km/h {weather.current.wind_dir}</p>
      </>
    }
  </>
)

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])
  const [weather, setWeather] = useState({})

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
            if (response.data.length === 1) {
              getWeatherData(countries[0].capital)
                .then(response => {
                  console.log(response.data)
                  setWeather(response.data)
                })
            }
          } else {
            setCountries([])
            setShowCountry([])
          }
        })
    }
  }

  const getWeatherData = city => {
    const params = {
      access_key: '311c58b6e9b252a07838319157703c60',
      query: city
    }
    return (
      axios
        .get(`http://api.weatherstack.com/current`, { params })
    )
  }

  const toggleShowCountry = (ix) => {
    showCountry[ix] === 0 ? setShowCountry(showCountry.slice(0, ix).concat(1).concat(...showCountry.slice(ix + 1))) : setShowCountry(showCountry.slice(0, ix).concat(0).concat(...showCountry.slice(ix + 1)))
  }

  if (countries.length === 0) {
    return (
      <>
        <p>find countries <input value={query} onChange={onQueryChange} /></p>
        {query !== '' ? <p>Too many matches, specify another filter</p> : null}
      </>
    )
  }

  if (countries.length > 1) {
    return (
      <>
        <p>find countries <input value={query} onChange={onQueryChange} /></p>
        {countries.map((country, i) => {
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
        })
        }
      </>
    )
  }

  if (countries.length === 1) {
    return (
      <>
        <p>find countries <input value={query} onChange={onQueryChange} /></p>
        {Object.entries(weather).length === 0 && weather.constructor === Object ? null : <Country country={countries[0]} weather={weather} />}
      </>
    )
  }
}

export default App;
