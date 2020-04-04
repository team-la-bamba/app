import React, { useState } from 'react'
import './App.css'

function Input (props) {
  const [answer, setAnswer] = useState('')
  const [bgColor, setBgColor] = useState('')
  const handleClick = () => {
    console.log('clicked!')
    setAnswer(props._id)
    setBgColor('#f5f2ed')
  }
  return (
    <div
      className='flex content-center border rounded-lg border-black border-2 py-4 .my-3 my-3'
      onClick={handleClick}
      style={{ backgroundColor: bgColor }}
    >
      <div className='flex ml-3 items-start'>
        <input
          onClick={handleClick}
          id='push_nothing'
          name='form-input'
          type='radio'
          value={props._id}
          checked={answer === props._id}
          className='form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out __web-inspector-hide-shortcut__'
        />
        <p className='-mt-1 ml-3'> {props.text} </p>
      </div>
    </div>
  )
}

export default Input
