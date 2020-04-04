import React, { useEffect, useState } from "react";
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
      <div className="App">
        <div className="formContainer">
          <div className="questionContainer">
            <h2 className="text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9">
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

            <span className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => fetchQuestions()}
                type="submit"
                className="inline-flex my-3 py-4 items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
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
