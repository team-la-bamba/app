import React from 'react'
import Header from './Header'

function Done ({ success, text = '', links = [] }) {
  let html = null

  if (success) {
    html = <p>Bravo!</p>
  } else {
    html = (
      <>
        <p className='text-xl'>{text}</p>
        <ul>
          {links.map(p => (
            <li key={p.link}>
              <a
                className='hover:underline text-blue-700 text-xl'
                href={p.link}
              >
                {p.text}
              </a>
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <div>
      <Header />

      <div className='flex flex-col text-left bg-white py-14 px-8 shadow sm:rounded-lg sm:px-12 mx-10 sm:mx-0 mt-14'>
        <h2 className='text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9 mt-0'>
          Tack för ditt svar!
        </h2>
        {html}
      </div>
    </div>
  )
}

export default Done
