import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css'
import {
  Item,
  Message,
} from 'semantic-ui-react';

import Loader from '../Loader'

// import mindImg from '../../images/mind.svg';

import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  QUESTIONS_TYPE,
  COUNTDOWN_TIME,
} from '../../data';
import { shuffle } from '../utils';

import Offline from '../Offline';

const Questions = ({ startQuiz }) => {
  const [category, setCategory] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('0');
  const [questionsType, setQuestionsType] = useState('0');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    fetch(API)
      .then(respone => respone.json())
      .then(data =>
        setTimeout(() => {
          const { response_code, results } = data;

          if (response_code === 1) {
            const message = (
              <p>
                The API doesn't have enough questions for your query. (Ex.
                Asking for 50 Questions in a Category that only has 20.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{' '}
                <strong>Difficulty Level</strong>, or{' '}
                <strong>Type of Questions</strong>.
              </p>
            );

            setProcessing(false);
            setError({ message });

            return;
          }

          results.forEach(element => {
            element.options = shuffle([
              element.correct_answer,
              ...element.incorrect_answers,
            ]);
          });

          setProcessing(false);
          startQuiz(
            results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch(error =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };

  if (offline) return <Offline />;

  return (
    <>
      {processing ? (<Loader />) :
        <div className='container md:mt-20 md:mb-20 pb-20'>
          <Item>
            <Item.Content>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
            </Item.Content>
          </Item>
        </div>
      }
    </>
  );
};

Questions.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Questions;
