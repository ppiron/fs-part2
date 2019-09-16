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

const Persons = ({ persons, filter, onDelete }) => {
  return (
    persons.map(person => (
      person.name.toLowerCase().includes(filter) ? <p key={person.name}>{person.name} {person.number} <button onClick={event => onDelete(person.id, person.name)}>delete</button></p> : null
    ))
  )
}

const Notification = ({ message }) => {
  if (message === '') {
    return null
  } else {
    return (
      <div className={`notification`}>
        {message}
      </div>
    )
  }
}

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === '') {
    return null
  } else {
    return (
      <div className={`notification error`}>
        {errorMessage}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
    if (newName === '') {
      alert(`error: missing name`)
      return
    }
    if (newNumber === '') {
      alert(`error: missing number`)
      return
    }
    const matchedPerson = persons.filter(person => person.name === newName)
    if (matchedPerson.length === 0) {
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
          setMessage(`${returnedPerson.name} added to the phonebook`)
          window.setTimeout(() => setMessage(``), 2500)
        })
        .catch(error => console.log(error))
    } else if (matchedPerson[0].number === newNumber) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const confirm = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (confirm) {
        const updatedPerson = {
          name: newName,
          number: newNumber
        }
        personService.update(matchedPerson[0].id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(
            person => person.id === matchedPerson[0].id ? returnedPerson : person
          ))
          setNewName('')
          setNewNumber('')
          setMessage(`Number of ${returnedPerson.name} changed`)
          window.setTimeout(() => setMessage(``), 2500)
        })
          .catch(error => {
            setErrorMessage(`Information of ${matchedPerson[0].name} has already been removed from the server`)
            // window.setTimeout(() => setErrorMessage(``), 2500)
          })
      }
    }
  }

  const onDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`)
    if (confirm) {
      personService.del(id).then(() => personService.getAll().then(initialPersons => {
        setPersons(initialPersons)
      }))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={filterBook} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} onSubmit={handleSubmit} onNameChange={onNameChange} onNumberChange={onNumberChange} />
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={onDelete} />
    </div>
  )
}

export default App