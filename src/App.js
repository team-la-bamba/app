import React, { useEffect, useState } from "react";
import "./tailwind-ui.min.css";
import "./App.css";
import Question from "./components/Question";
import Select from "./components/Select";
import Done from "./components/Done";

const url = "http://api.labamba.space";

function App() {
  const [answers, setAnswers] = useState([]);
  const [place, setPlace] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch(url + "/places")
      .then(res => res.json())
      .then(body => setPlaces(body));
  }, []);

  const fetchQuestions = () => {
    fetch(url + "/questions")
      .then(res => res.json())
      .then(body => setQuestions(body));
  };

  const submitAnswers = answers => {
    fetch(url + "/answers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    })
      .then(res => res.json())
      .then(body => {
        setResponse(body);
        setDone(true);
      });
  };

  if (!place || !questions.length) {
    return (
      <div className="App antialiased font-sans bg-gray-50">
        <h1 className="mt-6 text-center text-5xl leading-9 font-bold text-gray-900">Kristempen 🤒</h1>
        <div className="formContainer bg-white mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="questionContainer bg-white py-16 px-4 shadow sm:rounded-lg sm:px-24">
            <h2 className="text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9 mb-5 mt-0">
              Välj kommun
            </h2>
            <Select
              label="Kommuner"
              placeholder="Kommuner"
              options={places.map(p => {
                return {
                  label: p,
                  value: p,
                };
              })}
              onChange={selected => setPlace(selected)}
            />

            <span className="inline-flex rounded-md shadow-sm w-full">
              <button
                onClick={() => fetchQuestions()}
                type="submit"
                className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
              >
                Nästa
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = values => {
    answers.push({
      question: questions[questionIndex]._id,
      answers: values.answer,
      place: place,
    });

    setAnswers(answers);

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      submitAnswers(answers);
    }
  };

  return (
    <div className="App">
      {done ? (
        <Done {...response} />
      ) : (
        <Question {...questions[questionIndex]} onSubmit={onSubmit} />
      )}
    </div>
  );
}

export default App;
