import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css'
import {
  Item,
  Message,
} from 'semantic-ui-react';

import Loader from '../Loader'

import { shuffle } from '../utils';

import Offline from '../Offline';

const Questions = ({ startQuiz }) => {

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const questionCategories = async () => {
    const response = await fetch('api/quiz/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 1 }),
    });
    const data = await response.json();
    if (data) {
      fetchData(data?.numOfQuestions, data?.category, data?.difficulty, data?.questionsType, data?.countdownTime)
    }
  }

  useEffect(() => {
    questionCategories()
  }, [])


  const fetchData = (numOfQuestions, category, difficulty, questionsType, countdownTime) => {
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
