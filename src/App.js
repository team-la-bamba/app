import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./App.css";
import "./tailwind-ui.min.css";
import Question from "./components/Question";
import Select from "./components/Select";
import Done from "./components/Done";
import Button from "./components/Button";
import Header from "./components/Header";
import Error from "./components/Error";
import Footer from "./components/Footer";

import { useCookies } from "react-cookie";

const url = "https://api.labamba.space";

function App() {
  const { t } = useTranslation();
  const [cookies, setCookie, removeCookie] = useCookies(["place"]);
  const [answers, setAnswers] = useState([]);
  const [place, setPlace] = useState(cookies.place);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const onCookieChange = place => {
    setCookie("place", place, {
      path: "/",
      expires: new Date(2147483647 * 1000),
      secure: process.env.NODE_ENV === "production",
    });
  };

  const onChangePlaceClick = e => {
    e.preventDefault();
    removeCookie("place");
    setPlace("");
    setAnswers([]);
  };

  const fetchQuestions = () => {
    fetch(url + "/questions")
      .then(res => res.json())
      .then(body => setQuestions(body));
  };

  useEffect(() => {
    fetch(url + "/places")
      .then(res => res.json())
      .then(body => setPlaces(body));

    if (place) {
      fetchQuestions();
    }
  }, [place]);

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
        <Header>
          {" "}
          Hjälp Sverige! Vi behöver få in data för att indikera vart det krävs
          extra insatser i landet. Självskattningen är även till för att ge dig
          svar om du behöver råd om vård.
        </Header>

        <div className="formContainer mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="questionContainer bg-white py-16 px-20 shadow sm:rounded-lg sm:px-24">
            <h2 className="text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9 mb-5 mt-0">
              {t("Municipality")}
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
              onChange={selected => {
                onCookieChange(selected);
                setPlace(selected);
              }}
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
        <Footer />
      </div>
    );
  }

  const onSubmit = values => {
    answers.push({
      question: questions[questionIndex]._id,
      answer: values.answer,
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
    <div className="App h-auto">
      {done ? (
        <Done {...response} />
      ) : (
        <>
          <Question {...questions[questionIndex]} onSubmit={onSubmit} />
          <div className="mt-2">
            <p>
              Kommun: {place} -{" "}
              <button
                onClick={onChangePlaceClick}
                className="hover:underline text-blue-700 cursor-pointer"
              >
                Ändra
              </button>
            </p>
          </div>
        </>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
