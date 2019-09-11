import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => (
  <h1>{props.course}</h1>
)

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part, i) => (
      <Part key={part.name} part={part.name} exercises={part.exercises} />
    )
    )}
  </>
)

const Total = ({ parts }) => (
  <p><b>Total of {parts.reduce((acc, val) => acc + Number(val.exercises), 0)} exercises</b></p>
)

const Course = (props) => {
  const { name, parts } = props.course
  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

