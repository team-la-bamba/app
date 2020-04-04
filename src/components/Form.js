import React, { useState } from "react";
import { useForm } from "react-hook-form"; /* https://react-hook-form.com/api */ 

import Confirmation from './Confirmation';

const Form = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit
  } = useForm();

  const data = [ 
    {
      "type": "radio",
      "lang": "sv",
      "_id": "5e877e6e4a112d3bd0bae8b9",
      "text": "Mår du bra?",
      "answers": [
        {
          "_id": "5e877e6e4a112d3bd0bae8ba",
          "text": "Ja",
          "weight": 5
        },
        {
          "_id": "5e877e6e4a112d3bd0bae8bb",
          "text": "Nej",
          "weight": 10
        }
      ]
    }
  ];
  
  const onSubmit = async data => {
    try {
      // await fetch('', {
      //   method: "POST",
      //   mode: "cors",
      //   cache: "no-cache",
      //   body: JSON.stringify(data),
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8"
      //   }
      //});
      console.log("data", data);
      setSubmitted(true);
    } catch (error) { /* error handling */ }
  };

  const showConfirmation = (
    <Confirmation />
  );

  const showForm = (
    <form onSubmit={handleSubmit(onSubmit)} method="post">
  
      {data.map(function(data, index){
        return (  
          <div key={index}>
              <h2>{data.text}</h2>

              {data.answers.map((answer, index) => {
                return (
                  <div key={index}>
                    <label>{answer.text}</label>
                    <input
                      name="answer"
                      type="radio"
                      value={answer._id}
                      ref={register({ required: true })}
                    />
                  </div>
                )
              })} 
          </div>
        )
      })}

      <div>
        <button type="submit">
          Skicka
        </button>
      </div>

    </form>
  );

  return (
    <div>
      {submitted ? showConfirmation : showForm}
    </div>
  );
};

export default Form;