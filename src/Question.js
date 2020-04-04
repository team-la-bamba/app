import React, { useState } from 'react'
import './App.css'
import Input from './Input'

function Question (props) {
  return (
    <div className='formContainer'>
      <div className='questionContainer'>
        <h2 className='text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9'>
          {props.text}
        </h2>

        {props.answers.map(a => (
          <Input key={a._id} type={props.type} {...a} />
        ))}
        <span className='inline-flex rounded-md shadow-sm'>
          <button
            type='button'
            className='inline-flex my-3 py-4 items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'
          >
            Nästa
          </button>
        </span>
      </div>
    </div>
  )
}

export default Question
