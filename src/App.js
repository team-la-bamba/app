import React, { useState } from 'react'
import './App.css'
import Question from './Question'

const questions = [
  {
    type: 'radio',
    lang: 'sv',
    _id: '5e877e6e4a112d3bd0bae8b9',
    text: 'Mår du bra?',
    answers: [
      {
        _id: '5e877e6e4a112d3bd0bae8ba',
        text: 'Ja',
        weight: 5
      },
      {
        _id: '5e877e6e4a112d3bd0bae8bb',
        text: 'Nej',
        weight: 10
      }
    ]
  }
]

function App () {
  return (
    <div className='App'>
      <Question {...questions[0]} />
    </div>
  )
}

export default App
