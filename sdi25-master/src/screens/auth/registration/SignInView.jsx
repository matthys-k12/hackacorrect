import RegistrationStep1 from "./steps/RegistrationStep1.tsx";
import RegistrationStep3 from "./steps/RegistrationStep3.tsx";
import RegistrationStep2 from "./steps/RegistrationStep2.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

export default function SignInView() {
  const [stepValue, setStepValue] = useState(0);

  const nextStep = () => {
    setStepValue(stepValue + 1);
  };

  const previousStep = () => {
    setStepValue(stepValue - 1);
  };

  return (
    <div className="background-p p-4 w-screen min-h-screen flex flex-col justify-center items-center">
      <p className="calsans font-bold text-center text-3xl mb-9">
        Inscription : étape{" "}
        <span className="text-orange-500 ml-2">{stepValue + 1}</span>
      </p>

      {stepValue === 0 ? <RegistrationStep1 nextStep={nextStep} /> : null}

      {stepValue === 1 ? (
        <RegistrationStep2 nextStep={nextStep} previousStep={previousStep} />
      ) : null}

      {stepValue === 2 ? (
        <RegistrationStep3 nextStep={nextStep} previousStep={previousStep} />
      ) : null}

      <p className="mt-9 text-center text-sm">
        Vous avez déjà un compte ?{" "}
        <Link to="/hackathon/auth/LogInView" className="text-orange-500 font-semibold">
          Cliquez ici !
        </Link>{" "}
      </p>
    </div>
  );
}
