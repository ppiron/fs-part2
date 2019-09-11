import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => (
  <h2>{props.course}</h2>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => {
        return (
          <React.Fragment key={course.id}>
            <Course course={course} />
            <Total parts={course.parts} />
          </ React.Fragment>
        )
      })}
    </div >
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

