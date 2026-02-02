import CancelButton from "../../../../components/ui/CancelButton.tsx";
import RadioField from "../../../../components/ui/RadioField.tsx";
import ButtonUi from "../../../../components/ui/ButtonUi.tsx";
import Labelui from "../../../../components/ui/labelui.tsx";

import { useState, useEffect } from "react";
import React from "react";
import secureLocalStorage from "react-secure-storage";

export default function RegistrationStep1({
  nextStep,
}: {
  nextStep: any;
}) {
  const [comeFromEsatic, setComeFromEsatic] = useState(true);
  const handleChangeComeFromEsatic = ({ value }: { value: boolean }) => {
    setComeFromEsatic(value);
  };

  const goToSecondStep = () => {
    secureLocalStorage.setItem("comeFromEsatic", comeFromEsatic);
    nextStep();
  };

  useEffect(() => {
    const storedData = secureLocalStorage.getItem("comeFromEsatic");
    if (storedData === true || storedData === false) {
      setComeFromEsatic(storedData);
    }
  }, []);

  return (
    <div className="bg-white p-9 rounded-xl shadow-xl flex flex-col gap-6">
      <p>Êtes vous étudiant de l&apos;ESATIC ?</p>

      <div className="flex justify-center gap-4">
        <div className="flex items-center gap-2 ps-4 py-4 border border-gray-200 rounded dark:border-gray-700">
          <RadioField
            type="radio"
            value={comeFromEsatic}
            onClick={() => handleChangeComeFromEsatic({ value: true })}
          />
          <Labelui label="Oui" />
          <p className="pr-3"></p>
        </div>
        <div className="flex items-center gap-2 ps-4 py-4 border border-gray-200 rounded dark:border-gray-700">
          <RadioField
            type="radio"
            value={!comeFromEsatic}
            onClick={() => handleChangeComeFromEsatic({ value: false })}
          />
          <Labelui label="Non" />
          <p className="pr-3"></p>
        </div>
      </div>

      <div className="flex gap-3">
        <CancelButton type="button" label="Annuler" route="/" />
        <ButtonUi
          isLoading={false}
          type="button"
          label="Continuer"
          isDisable={false}
          isReady={true}
          onClick={goToSecondStep}
        />
      </div>
    </div>
  );
}
