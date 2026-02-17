import {
  handleServiceChangeQuizState,
  handleServiceCreateAnswer,
  handleServiceCreateQuestion,
  handleServiceDeleteAnswer,
  handleServiceDeleteQuestion,
  handleServiceGetCurrentQuiz,
  handleServiceUpdateQuestion,
} from "../../../../services/PreselectionService.tsx";
import { handleServiceGetLevelsList } from "../../../../services/ConstantsService.tsx";
import InputField from "../../../../components/ui/InputField.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectUi from "../../../../components/ui/SelectUi.tsx";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/ui/ButtonUi.tsx";
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from "react";
import { Accordion } from "flowbite-react";
import Swal from "sweetalert2";
import React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Labelui from "../../../../components/ui/labelui.tsx";

export default function PreselectionComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizList, setQuizList] = useState([]);

  const [levelValue, setLevelValue] = useState(0);
  const [levelList, setLevelList] = useState([]);

  const [answersValue, setAnswersValue] = useState([]);
  const [answerScoresValue, setAnswersScoreValue] = useState([]);

  const [questionValue, setQuestionValue] = useState("");
  const [quizState, setQuizState] = useState(null);
  const [score, setScore] = useState(0);

  const [item, setItem] = useState();
  const [updateQuestionValue, setUpdateQuestionValue] = useState();

  const [open, setOpen] = useState(false);

  const handleChangeLevel = (selectedOption) => {
    setLevelValue(selectedOption.value);
  };

  const handleChangeAnswersValue = (event, index) => {
    const newList = [...answersValue];
    newList[index] = event.target.value;
    setAnswersValue(newList);
  };

  const handleChangeAnswerScoreValue = (event, index) => {
    const newList = [...answerScoresValue];
    newList[index] = event.target.value;
    setAnswersScoreValue(newList);
  };

  const handleChangeQuestionValue = (event) => {
    setQuestionValue(event.target.value);
  };

  const handleChangeUpdateQuestionValue = (event) => {
    setUpdateQuestionValue(event.target.value);
  };

  const handleGetCurrentQuiz = async () => {
    setIsLoading(true);
    const data = { niveauId: levelValue };

    await handleServiceGetCurrentQuiz(data).then((result) => {
      setQuizState(result.quiz_state);
      setScore(result.quiz_score);
      setQuizList(result.questions || []);
      setIsLoading(false);
    });
  };

  const handleCreateQuizQuestion = async () => {
    setIsLoading(true);
    const data = {
      niveauId: levelValue,
      question: questionValue,
    };

    await handleServiceCreateQuestion(data);
    setIsLoading(false);
    setLevelValue("");
    handleGetCurrentQuiz();
  };

  const handleCreateAnswer = async (id, index) => {
    setIsLoading(true);

    const data = {
      niveauId: levelValue,
      questionId: id,
      response: answersValue[index],
      score: answerScoresValue[index],
    };

    await handleServiceCreateAnswer(data);
    setIsLoading(false);
    handleGetCurrentQuiz();
  };

  const handleDeleteAnswer = (id) => {
    Swal.fire({
      title: "Supprimer",
      text: "Êtes-vous sûr de supprimer cette réponse ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await handleServiceDeleteAnswer({ responseId: id });
        handleGetCurrentQuiz();
        setIsLoading(false);
      }
    });
  };

  const handleDeleteQuestion = (item) => {
    setOpen(false);

    Swal.fire({
      title: "Supprimer",
      text: "Êtes-vous sûr ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await handleServiceDeleteQuestion({ questionId: item.id });
        handleGetCurrentQuiz();
        setIsLoading(false);
      }
    });
  };

  const handleUpdateQuestion = () => {
    setOpen(false);

    Swal.fire({
      title: "Mettre à jour",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);

        await handleServiceUpdateQuestion({
          question: updateQuestionValue,
          questionId: item.id,
        });

        handleGetCurrentQuiz();
        setIsLoading(false);
      }
    });
  };

  const handleOpen = (item) => {
    setUpdateQuestionValue(item.content);
    setItem(item);
    setOpen(true);
  };

  const handleChangeQuizStatus = async () => {
    await handleServiceChangeQuizState({ quizId: levelValue });
    handleGetCurrentQuiz();
  };

  useEffect(() => {
    setIsLoading(true);

    handleServiceGetLevelsList({ esatic: 1 }).then((result) => {
      const temp = (result?.niveaux || []).map((item) => ({
        value: item.id,
        label: item.libelle,
      }));

      setLevelList(temp);
      setIsLoading(false);
    });
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
    borderRadius: 4,
  };

  return (
    <div>
      {!isLoading ? (
        <div className="w-full">
          <div className="lg:flex lg:flex-row flex-col gap-9">
            <div className="flex flex-col mt-6 space-y-6 lg:w-2/5 w-full">
              <p className="text-lg">
                <span className="font-bold text-[#F94C10]">Score :</span>{" "}
                {score} pt(s)
              </p>

              <SelectUi
                placeholder="Choisissez"
                options={levelList}
                filterValue={levelValue}
                onChange={handleChangeLevel}
              />

              <Button
                onClick={handleGetCurrentQuiz}
                type="button"
                label="Récupérer le quiz"
                isReady={true}
              />

              <Button
                onClick={handleChangeQuizStatus}
                type="button"
                label={
                  quizState === 0 ? "Ouvrir le quiz" : "Fermer le quiz"
                }
                isReady={true}
              />

              <InputField
                type="text"
                placeholder="Nouvelle question..."
                value={questionValue}
                onChange={handleChangeQuestionValue}
              />

              <section className="max-w-xl overflow-auto h-[600px] p-4">
                <h1 className="mt-9 text-2xl font-bold">
                  Quiz du niveau
                </h1>

                {quizList.length > 0 ? (
                  quizList.map((item, index) => (
                    <div key={index} className="mt-4">
                      <Accordion>
                        <Accordion.Panel>
                          <Accordion.Title>
                            Question {index + 1}: {item.content}
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpen(item);
                              }}
                              className="ml-4 cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </span>
                          </Accordion.Title>

                          <Accordion.Content>
                            {(item.responses || []).map((el, ind) => (
                              <div
                                key={ind}
                                className="flex justify-between"
                              >
                                <p>
                                  {el.content} — {el.score}
                                </p>
                                <button
                                  onClick={() =>
                                    handleDeleteAnswer(el.id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            ))}

                            <InputField
                              type="text"
                              placeholder="réponse..."
                              value={answersValue[index] || ""}
                              onChange={(e) =>
                                handleChangeAnswersValue(e, index)
                              }
                            />

                            <InputField
                              type="number"
                              placeholder="score"
                              value={
                                answerScoresValue[index] || ""
                              }
                              onChange={(e) =>
                                handleChangeAnswerScoreValue(e, index)
                              }
                            />

                            <Button
                              onClick={() =>
                                handleCreateAnswer(item.id, index)
                              }
                              type="button"
                              label="Ajouter la réponse"
                              isReady={true}
                            />
                          </Accordion.Content>
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  ))
                ) : (
                  <h3 className="mt-9 text-lg">
                    Aucunes questions
                  </h3>
                )}
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <HashLoader size={60} color="#F94C10" />
        </div>
      )}
    </div>
  );
}
