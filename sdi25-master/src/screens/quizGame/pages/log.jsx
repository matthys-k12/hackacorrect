import InputField from "../../../components/ui/InputField.tsx";
import Button from "../../../components/ui/ButtonUi.tsx";
import Labelui from "../../../components/ui/labelui.tsx";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import React from "react";

export default function Log(props) {
  const [pseudo, setPseudo] = useState("");

  const { renderDisplay } = props;

  const handlePseudoChange = (event) => {
    setPseudo(event.target.value);
  };

  const handleButton = () => {
    secureLocalStorage.setItem("data_about_user", {
      joueurNom: pseudo,
      score: 0,
    });
    renderDisplay();
  };

  return (
    <div className="max-w-[900px] mx-auto py-24">
      <div className="dark:bg-slate-900 flex h-full items-center py-16">
        <main className="w-full max-w-md mx-auto">
          {/* <TypewriterEffectSmoothDemo /> */}
          <div className="mt-7 bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="mt-2 text-gray-600 font-bold text-lg dark:text-gray-400">
                  Entrez vos informations
                </h1>
              </div>

              <div className="mt-5">
                <form>
                  <div className="grid gap-y-4">
                    <Labelui label="Votre pseudo" />
                    <InputField
                      placeholder="franck emmanuel"
                      type="text"
                      value={pseudo}
                      onChange={handlePseudoChange}
                    />
                    <Button
                      label="continuer"
                      type="button"
                      isDisable={false}
                      isReady={true}
                      isLoading={false}
                      onClick={() => handleButton()}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
