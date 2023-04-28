import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
function About() {

  const a = useContext(noteContext)
  return (
    <div>
     <h1>About page{a.name}</h1>
    </div>
  )
}

export default About
