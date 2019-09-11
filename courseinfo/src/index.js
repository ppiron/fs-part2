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
    {/* <Part part={parts[0].name} exercises={parts[0].exercises} /> */}
    {/* <Part part={parts[1].name} exercises={parts[1].exercises} /> */}
    {/* <Part part={parts[2].name} exercises={parts[2].exercises} /> */}
  </>
)

const Total = props => (
  <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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
      {/* <Header course={course.name} /> */}
      {/* <Content parts={course.parts} /> */}
      {/* <Total parts={course.parts} /> */}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

