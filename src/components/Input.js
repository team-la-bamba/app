import React from 'react'

function Input ({ _id, onClick, selected, text }) {
  const fakeEvent = {
    persist: () => {},
    target: {
      name: 'answer',
      value: _id
    }
  }

  return (
    <div
      className='flex content-center max-w-5xl border-2 rounded-lg border-blue-300 py-4 .my-3 my-3 cursor-pointer'
      onClick={() => onClick(fakeEvent)}
      style={{
        backgroundColor: selected ? '#EBF8FF' : '',
        borderColor: selected ? '#63B3ED' : ''
      }}
    >
      <div className='flex ml-3 items-start'>
        <input
          onChange={onClick}
          id={fakeEvent.target.name}
          name={fakeEvent.target.name}
          type='radio'
          value={fakeEvent.target.value}
          checked={selected}
          className='form-radio h-4 w-4 transition duration-150 ease-in-out __web-inspector-hide-shortcut__'
        />
        <label htmlFor={fakeEvent.target.name} className='-mt-1 ml-3'>
          {text}
        </label>
      </div>
    </div>
  )
}

export default Input
