import React from 'react'

const Course = ({course}) =>
  <div>
    <h2>{course.name}</h2>
    {course.parts.map(part =>
      <Part key={part.id} part={part} />
    )}
    <p>
      total number of exercises: {
        course.parts
          .map(p => p.exercises)
          .reduce((a, b) => a + b)
      }
    </p>
  </div>

const Part = ({part}) =>
  <p>{part.name}<br/>exercises: {part.exercises}</p>

export default Course