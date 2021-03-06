import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './App.css';
import './tailwind-ui.min.css';
import Question from './components/Question';
import Select from './components/Select';
import Done from './components/Done';
import Button from './components/Button';
import Header from './components/Header';
import Error from './components/Error';
import Footer from './components/Footer';
import LanguagePicker from './components/locales/LanguagePicker';

import { useCookies } from 'react-cookie';

const url = 'https://api.labamba.space';

function App() {
  const { t, i18n } = useTranslation();
  const [cookies, setCookie, removeCookie] = useCookies(['place']);
  const [answers, setAnswers] = useState([]);
  const [place, setPlace] = useState(cookies.place);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const onCookieChange = (place) => {
    setCookie('place', place, {
      path: '/',
      expires: new Date(2147483647 * 1000),
      secure: process.env.NODE_ENV === 'production',
    });
  };

  const onChangePlaceClick = (e) => {
    e.preventDefault();
    removeCookie('place');
    setPlace('');
    setAnswers([]);
  };

  const fetchQuestions = () => {
    fetch(url + '/questions')
      .then((res) => res.json())
      .then((body) => setQuestions(body));
  };

  useEffect(() => {
    fetch(url + '/places')
      .then((res) => res.json())
      .then((body) => setPlaces(body));

    if (place) {
      fetchQuestions();
    }
  }, [place]);

  const submitAnswers = (answers) => {
    fetch(url + '/answers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((body) => {
        setError('');
        setResponse(body);
        setDone(true);
      });
  };

  const onSubmit = (values) => {
    answers.push({
      question: questions[questionIndex]._id,
      answer: values.answer,
      place: place,
      lang: i18n.language,
    });

    setAnswers(answers);

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      submitAnswers(answers);
    }
  };

  let html = null;

  if (!place || !questions.length) {
    html = (
      <div class="flex flex-col content-center justify-center antialiased font-sans bg-gray-50">
        <LanguagePicker />

        <Header>
          {' '}
          Hjälp Sverige! Vi behöver få in data för att indikera vart det krävs
          extra insatser i landet. Självskattningen är även till för att ge dig
          svar om du behöver råd om vård.
        </Header>

        <div className="mt-10 sm:w-full">
          <div className="bg-white py-16 px-20 shadow sm:rounded-lg sm:px-12 w-full ">
            <h2 className="text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9 mb-5 mt-0">
              {t('Municipality')}
            </h2>
            {error && <Error text={error} />}
            <Select
              label={t('MunicipalityPlural')}
              placeholder={t('MunicipalityPlural')}
              options={places.map((p) => {
                return {
                  label: p,
                  value: p,
                };
              })}
              onChange={(selected) => {
                onCookieChange(selected);
                setPlace(selected);
              }}
            />
            <Button
              onClick={() => {
                if (place) {
                  fetchQuestions();
                } else {
                  setError('Ingen kommun vald');
                }
              }}
            >
              {t('Next')}
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    html = (
      <>
        {done ? (
          <div class="flex flex-col content-center justify-center">
            <Done {...response} />
          </div>
        ) : (
          <div class="flex flex-col content-center justify-center">
            <Question {...questions[questionIndex]} onSubmit={onSubmit} />
            <div className="mt-2">
              <p>
                {t('MunicipalitySingular')}: {place} -{' '}
                <button
                  onClick={onChangePlaceClick}
                  className="hover:underline text-blue-700 cursor-pointer"
                >
                  {t('Change')}
                </button>
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="App flex flex-grow justify-center content-center">
        {html}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
