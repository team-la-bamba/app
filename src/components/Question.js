import React from 'react'
import { useTranslation } from "react-i18next";

import Input from './Input'
import Button from './Button'
import Header from './Header'

import Error from './Error'
import { useForm } from '../hooks'

function Question ({ answers, onSubmit = () => {}, text, type }) {
  const { t } = useTranslation();

  const { values, handleChange, handleSubmit, errors } = useForm(
    onSubmit,
    values => {
      if (!Object.keys(values).length) {
        return {
          error: 'Inget svar är valt'
        }
      }
      return {}
    }
  )

  return (
    <div>
      <Header>
        {' '}
        Hjälp Sverige! Vi behöver få in data för att indikera vart det krävs
        extra insatser i landet. Självskattningen är även till för att ge dig
        svar om du behöver råd om vård.
      </Header>
      <div className='formContainer bg-white mt-10 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='questionContainer bg-white py-14 px-4 shadow sm:rounded-lg sm:px-24'>
          <h2 className='text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-2xl sm:leading-7 mt-0'>
            {text}
          </h2>

          <form onSubmit={handleSubmit}>
            {errors.error && <Error text={errors.error} />}

            {answers.map(a => (
              <Input
                key={a._id}
                type={type}
                {...a}
                onClick={handleChange}
                selected={values.answer === a._id}
              />
            ))}

            <Button>{t("Next")}</Button>
          </form>
        </div>
      </div>
    </div>       
  )
}

export default Question
