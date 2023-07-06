import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css'
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from 'semantic-ui-react';

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

const Main = ({ startQuiz }) => {
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
    <div className='container md:mt-20 md:mb-20 pb-20'>
      {/* Illustration behind hero content */}
      {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="145" cy="513" r="64" />
          </g>
        </svg>
      </div> */}
      <Item >
        <Item.Content>
          <Item.Header>
            <h1 className='about-us'>Check out our Demo exam</h1>
          </Item.Header>
          {error && (
            <Message error onDismiss={() => setError(null)}>
              <Message.Header>Error!</Message.Header>
              {error.message}
            </Message>
          )}
          <Divider />
          <Item.Meta>
            <Dropdown
              fluid
              selection
              name="category"
              style={{borderColor: 'black', marginRight: 20}}
              placeholder="Select Quiz Category"
              header="Select Quiz Category"
              options={CATEGORIES}
              value={category}
              onChange={(e, { value }) => setCategory(value)}
              disabled={processing}
            />
            <br />
            <Dropdown
              fluid
              selection
              style={{borderColor: 'black', marginRight: 20}}
              name="numOfQ"
              placeholder="Select No. of Questions"
              header="Select No. of Questions"
              options={NUM_OF_QUESTIONS}
              value={numOfQuestions}
              onChange={(e, { value }) => setNumOfQuestions(value)}
              disabled={processing}
            />
            <br />
            <Dropdown
              fluid
              selection
              style={{borderColor: 'black', marginRight: 20}}
              name="difficulty"
              placeholder="Select Difficulty Level"
              header="Select Difficulty Level"
              options={DIFFICULTY}
              value={difficulty}
              onChange={(e, { value }) => setDifficulty(value)}
              disabled={processing}
            />
            <br />
            <Dropdown
              fluid
              selection
              style={{borderColor: 'black', marginRight: 20}}
              name="type"
              placeholder="Select Questions Type"
              header="Select Questions Type"
              options={QUESTIONS_TYPE}
              value={questionsType}
              onChange={(e, { value }) => setQuestionsType(value)}
              disabled={processing}
            />
            <br />
            <Dropdown
              search
              selection
              style={{borderColor: 'black', marginRight: 20}}
              name="hours"
              placeholder="Select Hours"
              header="Select Hours"
              options={COUNTDOWN_TIME.hours}
              value={countdownTime.hours}
              onChange={handleTimeChange}
              disabled={processing}
            />
            <Dropdown
              search
              selection
              style={{borderColor: 'black', marginRight: 20}}
              name="minutes"
              placeholder="Select Minutes"
              header="Select Minutes"
              options={COUNTDOWN_TIME.minutes}
              value={countdownTime.minutes}
              onChange={handleTimeChange}
              disabled={processing}
            />
            <Dropdown
              search
              selection
              style={{borderColor: 'black', marginRight: 20}}
              name="seconds"
              placeholder="Select Seconds"
              header="Select Seconds"
              options={COUNTDOWN_TIME.seconds}
              value={countdownTime.seconds}
              onChange={handleTimeChange}
              disabled={processing}
            />
          </Item.Meta>
          <Divider />
          <Item.Extra>
            <Button
              color='green'
              size="medium"
              icon="play"
              labelPosition="left"
              content={processing ? 'Processing...' : 'Start Now'}
              onClick={fetchData}
              disabled={!allFieldsSelected || processing}
            />
          </Item.Extra>
        </Item.Content>
      </Item>

    </div>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
