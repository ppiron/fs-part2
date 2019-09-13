import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import personService from '../services/persons'

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>filter shown with <input value={filter} onChange={onFilterChange} /> </div>
  )
}

const PersonForm = ({ onSubmit, onNameChange, onNumberChange, newName, newNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} /></div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {
  return (
    persons.map(person => (
      person.name.toLowerCase().includes(filter) ? <p key={person.name}>{person.name} {person.number}</p> : null
    ))
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const filterBook = event => {
    setFilter(event.target.value)
  }

  const onNameChange = event => {
    setNewName(event.target.value)
  }

  const onNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!persons.map(person => person.name).includes(newName)) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      alert(`${newName} is already added to the phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={filterBook} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} onSubmit={handleSubmit} onNameChange={onNameChange} onNumberChange={onNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App