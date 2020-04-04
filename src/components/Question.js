import React from 'react';
import Input from './Input';
import Error from './Error';
import { useForm } from '../hooks';

function Question({ answers, onSubmit = () => {}, text, type }) {
  const { values, handleChange, handleSubmit, errors } = useForm(
    onSubmit,
    (values) => {
      if (!Object.keys(values).length) {
        return {
          error: 'Inget svar är valt',
        };
      }
      return {};
    }
  );

  return (
    <div className="formContainer">
      <div className="questionContainer">
        <h2 className="text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9">
          {text}
        </h2>
 
        <form onSubmit={handleSubmit}>
          {errors.error && (
            <Error text={errors.error} />
          )}

          {answers.map((a) => (
            <Input
              key={a._id}
              type={type}
              {...a}
              onClick={handleChange}
              selected={values.answer === a._id}
            />
          ))}

          <span className="inline-flex rounded-md shadow-sm w-full">
            <button
              type="submit"
              className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Nästa
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Question;
