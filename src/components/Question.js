import React from 'react';
import Input from './Input';
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
            <p className="rounded bg-red-600 mb-2 p-2 text-white">
              {errors.error}
            </p>
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

          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="submit"
              className="inline-flex my-3 py-4 items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
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
