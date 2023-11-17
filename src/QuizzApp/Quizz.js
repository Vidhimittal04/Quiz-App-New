import React, { useState, useEffect } from 'react';
import './Quizz.css'; 
import questions from './QuizzData.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20); 
  useEffect(() => {
    if (timeLeft === 0) {
   
      handleNextClick();
    }
  }, [timeLeft]);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedAnswer(selectedOption);
  };

  const handleNextClick = () => {
    setSelectedAnswer(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(20); 
    } else {
      setShowScore(true);
    }
  };

  const getPersonalizedMessage = () => {
   
    if (score === questions.length) {
      return "Congratulations! You got a perfect score!";
    } else if (score >= questions.length / 2) {
      return "Well done! You did a great job!";
    } else {
      return "Nice try! You can always try again.";
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setTimeLeft(20); 
  };

  useEffect(() => {
    if (!showScore) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000); 

      return () => clearTimeout(timer); 
    }
  }, [showScore, timeLeft]);

  const progressBarWidth = ((currentQuestion + 1) / questions.length) * 100 + '%';

  return (
    <>
    <div className='progress-bar' style={{ width: progressBarWidth }}></div>
    <div className='app'>
     
      {!showScore ? (
        <div className='question-section'>
          <h5>Score: {score}</h5>
          <div className='question-count'>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <div className='question-text'>{questions[currentQuestion].question}</div>
          <div className='timer'>Time Left: {timeLeft} seconds</div>
        </div>
      ) : null}
      {!showScore ? (
        <div className='answer-section'>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              style={{
                backgroundColor: selectedAnswer === option ? 'lightblue' : 'black',
                
              }}
              disabled={selectedAnswer !== null || showScore}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
      {selectedAnswer !== null && !showScore && (
        <button onClick={handleNextClick}>Next</button>
      )}
      {showScore && (
        <div className='result-section'>
          <h2>Your Score: {score} / {questions.length}</h2>
          <p>{getPersonalizedMessage()}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
    </>
  );
};

export default Quiz;