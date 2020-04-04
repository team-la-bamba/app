import React, { useEffect, useState } from "react";
import "./App.css";
import "./tailwind-ui.min.css";
import Question from "./components/Question";
import Select from "./components/Select";
import Done from "./components/Done";
import Button from "./components/Button";
import Error from "./components/Error";

const url = "https://api.labamba.space";

function App() {
  const [answers, setAnswers] = useState([]);
  const [place, setPlace] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

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
        setError("");
        setResponse(body);
        setDone(true);
      });
  };

  if (!place || !questions.length) {
    return (
      <div className="App antialiased font-sans bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-8">
          <h1 className="mt-6 text-center text-4xl leading-9 font-bold text-gray-900">Kristempen 
            <span role="img" aria-label="temperatur emoji"> 🤒</span>
          </h1>
          <p className="mt-4 text-center text-m leading-6 text-gray-700 max-w">
            Hjälp Sverige! Vi behöver få in data för att indikera vart det krävs extra insatser i landet. Självskattningen är även till för att ge dig svar om du behöver råd om vård.  
          </p>
        </div>

        <div className="formContainer mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="questionContainer bg-white py-16 px-20 shadow sm:rounded-lg sm:px-24">
            <h2 className="text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9 mb-5 mt-0">
              Välj din kommun
            </h2>
            {error && <Error text={error} />}
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
            <Button
              onClick={() => {
                if (place) {
                  fetchQuestions();
                } else {
                  setError("Ingen kommun vald");
                }
              }}
            >
              Nästa
            </Button>
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
