import Button from "../../../components/ui/ButtonUi.tsx";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./rules.css";

export default function RulesView() {
  const naviguate = useNavigate();
  const [displayCount, setDisplayCount] = useState(0);
  return (
    <div className="p-6 md:p-0">
      <h2 className="text-2xl text-center mt-9 font-black text-black dark:text-white">
        Avant de commencer, voici les règles du jeu
      </h2>

      <div className="max-w-xl mx-auto mt-11">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {displayCount - 0 === 0 || displayCount > 0 ? (
            <li className="mb-10 personalized-animation">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  className="w-2.5 h-2.5 text-orange-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="flex items-center mb-1 ml-7 text-lg font-semibold text-gray-900 dark:text-white">
                Règle Numéro 1
                <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                  Important
                </span>
              </h3>
              <p className="mb-4 ml-7 text-base font-normal text-gray-500 dark:text-gray-400">
                Un questionnaire vous sera présenté en fonction du niveau auquel
                vous vous serez inscris. Ce quiz portera sur le thème qui vous a
                été communiqué bien avant le test.
              </p>
            </li>
          ) : null}

          {displayCount - 1 === 0 || displayCount > 1 ? (
            <li className="mb-10 personalized-animation">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  className="w-2.5 h-2.5 text-orange-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="mb-1 ml-7 text-lg font-semibold text-gray-900 dark:text-white">
                Règle Numéro 2
              </h3>
              <p className="text-base ml-7 font-normal text-gray-500 dark:text-gray-400">
                Vous disposerez d&apos;environ 15 secondes pour répondre à
                chaque question. Passé ce délai, nous considérons que la réponse
                associée à cette question est nulle. De plus, il s&apos;agit
                d&apos;un questionnaire à choix unique. De ce fait, une seule
                réponse correcte est donc envisageable pour chaque question.
              </p>
            </li>
          ) : null}

          {displayCount - 2 === 0 || displayCount > 2 ? (
            <li className="mb-10 personalized-animation">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  className="w-2.5 h-2.5 text-orange-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="mb-1 ml-7 text-lg font-semibold text-gray-900 dark:text-white">
                Règle Numéro 3
              </h3>
              <p className="ml-7 text-base font-normal text-gray-500 dark:text-gray-400">
                Chaque bonne réponse vous attribuera un certain nombre de
                points. En cas de mauvaise réponse, il ne vous sera pas
                retranché de points. À la fin du test, l&apos;ensemble des
                points obtenus pour chaque bonne réponse sera comptabilisé afin
                de déterminer votre score.
              </p>
            </li>
          ) : null}

          {displayCount - 3 === 0 || displayCount > 3 ? (
            <li className="mb-10 personalized-animation">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  className="w-2.5 h-2.5 text-orange-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="flex ml-7 items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Règle Numéro 4
                <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                  Critique
                </span>
              </h3>
              <p className="ml-7 text-base font-normal text-gray-500 dark:text-gray-400">
                -- Vous ne pouvez passer le test qu&apos;{" "}
                <strong>une seule fois</strong>. <br />
                -- Si vous <strong>rechargez la page au cours du test</strong> ,
                <strong>vous ne pourrez plus continuer</strong> et votre score
                final sera compté comme <strong>nul</strong> <br />
                -- Si vous <strong>quittez la fenêtre de test</strong> , dans
                l&apos;optique de rechercher la réponse, ou d&apos;effectuer
                tout autre tâche quelquonque,{" "}
                <strong>vous ne pourrez plus continuer</strong> et votre score
                final sera compté comme <strong>nul</strong> <br />
              </p>
            </li>
          ) : null}
        </ol>
      </div>

      <div className="w-full flex justify-center mb-11">
        {displayCount === 3 ? (
          <Button
            onClick={() => {
              naviguate("/hackathon/administration/Count");
            }}
            isDisable={false}
            isReady={true}
            label="Faire le test"
          />
        ) : null}

        {displayCount < 3 ? (
          <Button
            onClick={() => {
              setDisplayCount(displayCount + 1);
            }}
            isDisable={false}
            isReady={true}
            label="Continuer"
          />
        ) : null}
      </div>
    </div>
  );
}
