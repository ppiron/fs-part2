import React from 'react'

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

const Course = (props) => {
  const { name, parts } = props.course
  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
    </>
  )
}

export default Course