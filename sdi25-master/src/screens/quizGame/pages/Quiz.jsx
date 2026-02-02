import {
  handleServiceGetRandomQuiz,
  handleServiceSendAnswer,
} from "../../../services/quizService.tsx";
import LinkButton from "../../../components/ui/LinkButton.tsx";
import Button from "../../../components/ui/ButtonUi.tsx";
import secureLocalStorage from "react-secure-storage";
import { useState, useRef, useEffect } from "react";
import AnswerTimer from "../timer/AnswerTimer.jsx";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function Quiz() {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [wait, setWait] = useState(false);
  const [waitDuration, setWaitDuration] = useState(0);
  const [duration] = useState(15);
  const [quiz, setQuiz] = useState({
    topic: "Javascript",
    level: "Beginner",
    totalQuestions: 4,
    perQuestionScore: 5,
    questions: [],
  });
  const intervalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    get();
  }, []);

  async function get() {
    setIsLoading(true);
    const result = await getQuizList();
    if (result.length === 0) {
      navigate("/hackathon/administration/EndQuiz");
    }

    const list = {
      topic: "Javascript",
      level: "Beginner",
      totalQuestions: 4,
      perQuestionScore: 5,
      questions: result,
    };

    setQuiz(list);
    setIsLoading(false);
  }

  async function getQuizList() {
    const data = {
      joueurId: secureLocalStorage.getItem("data_about_user").joueurId,
    };
    const result = await handleServiceGetRandomQuiz(data);
    const question = result.question || [];

    const currentTime = new Date();
    const differenceMinutes = Math.floor(
      (currentTime - new Date(result.date)) / (1000 * 60)
    );
    setWaitDuration(15 - differenceMinutes);

    if (differenceMinutes >= 15) {
      setWait(false);
    } else {
      setWait(true);
    }

    return question;
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (counter === duration + 1) {
      setCounter(0);
      onClickNext(quiz.questions.length);
    }
  }, [counter]);

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion] || {};

  const onClickNext = async () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
      clearInterval(intervalRef.current);
    }

    setCounter(0);
    setIsReset(true);
    setTimeout(() => {
      setIsReset(false);
    }, 1000);
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  async function handleSendScore(score) {
    const userInfo = {
      joueurId:
        secureLocalStorage.getItem("data_about_user").joueurId || uuidv4(),
      joueurNom: secureLocalStorage.getItem("data_about_user").joueurNom,
      score: secureLocalStorage.getItem("data_about_user").score + score,
    };
    secureLocalStorage.setItem("data_about_user", userInfo);
    await handleServiceSendAnswer(userInfo);
    navigate("/");
  }

  const [isReset, setIsReset] = useState(false);

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);
  return (
    <div className="quiz--wrapper background-p">
      {!isLoading ? (
        <>
          {!wait ? (
            <div className="quiz-container">
              {!showResult ? (
                <div>
                  <AnswerTimer duration={duration} reset={isReset} />
                  <div>
                    <span className="active-question-no">
                      {addLeadingZero(activeQuestion + 1)}
                    </span>
                    <span className="total-question">
                      /{addLeadingZero(quiz.questions.length)}
                    </span>
                  </div>
                  <h2>{question}</h2>
                  <ul className="ml-9">
                    {choices.map((answer, index) => (
                      <li
                        onClick={() => onAnswerSelected(answer, index)}
                        key={answer}
                        className={
                          selectedAnswerIndex === index
                            ? "selected-answer"
                            : null
                        }
                      >
                        {answer}
                      </li>
                    ))}
                  </ul>
                  <div className="flex-right">
                    <button
                      onClick={onClickNext}
                      disabled={selectedAnswerIndex === null}
                    >
                      {activeQuestion === questions.length - 1
                        ? "Terminer"
                        : "Suivant"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="font-bold text-xl text-center">
                    Soumettez vos réponses
                  </p>
                  <img
                    className="h-[250px] mx-auto"
                    src="https://img.freepik.com/free-vector/finish-line-concept-illustration_114360-2178.jpg?w=1060&t=st=1708141352~exp=1708141952~hmac=d116635289e4be2574ae2dbf06604d508f37cd76d43ae49efedc5a60f65cb035"
                    alt=""
                  />
                  <Button
                    isReady={true}
                    isDisable={false}
                    label="continuer"
                    onClick={() => handleSendScore(result.score)}
                  />
                </div>
              )}
            </div>
          ) : (
            <center className="space-y-6">
              <h1 className="font-bold text-xl">
                Vous devez patienter {waitDuration} minutes avant de jouer.
              </h1>
              <LinkButton
                label="Retourner à l'accueil"
                type="button"
                route="/"
              />
            </center>
          )}
        </>
      ) : null}
    </div>
  );
}
