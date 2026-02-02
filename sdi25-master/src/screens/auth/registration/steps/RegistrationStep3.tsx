import InputField from "../../../../components/ui/InputField.tsx";
import SelectUi from "../../../../components/ui/SelectUi.tsx";
import Labelui from "../../../../components/ui/labelui.tsx";
import Button from "../../../../components/ui/ButtonUi.tsx";
import HashLoader from "react-spinners/HashLoader";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { baseListGender } from "../../../../models/niveau.jsx";

import {
  getOptionLabel,
  getOptionValue,
} from "../../../../helpers/select/SelectHelper.tsx";
import { handleServiceRegister } from "../../../../services/authService.tsx";
import secureLocalStorage from "react-secure-storage";

export default function RegistrationStep3({
  previousStep,
}: {
  previousStep: any;
  nextStep: any;
}) {
  const [comeFromEsatic, setComeFromEsatic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  // get variables in localstorage

  useEffect(() => {
    const storedData = secureLocalStorage.getItem("comeFromEsatic");
    if (storedData === true || storedData === false) {
      setComeFromEsatic(storedData);
    }

    const leaderInformation = secureLocalStorage.getItem("leaderInformation");
    const list = secureLocalStorage.getItem("levelsList");

    if (leaderInformation && Array.isArray(list)) {
      const decodedList = list;
      const levelValue = leaderInformation["level"];

      decodedList.forEach(
        (level: {
          [x: string]: React.SetStateAction<{ value: number; label: string }[]>;
        }) => {
          if (level["value"] === levelValue) {
            setListClass(level["classes"]);
          }
        }
      );
    }

    const user1 = secureLocalStorage.getItem("informationAboutMembre1");
    if (user1) {
      setMatriculeMembre1(user1["matricule"]);
      setLastnameMembre1(user1["lastName"]);
      setFirstnameMembre1(user1["firstName"]);
      setEmailMembre1(user1["email"]);
      setGenderValueMembre1(getOptionValue(listGenderMembre1, user1["gender"]));
      setClassValueMembre1(getOptionValue(listGenderMembre1, user1["gender"]));
      setSchoolValueMembre1(getOptionValue(listClass, user1["school"]));
    }

    const user2 = secureLocalStorage.getItem("informationAboutMembre2");
    if (user2) {
      setMatriculeMembre2(user2["matricule"]);
      setLastnameMembre2(user2["lastName"]);
      setFirstnameMembre2(user2["firstName"]);
      setEmailMembre2(user2["email"]);
      setGenderValueMembre2(getOptionValue(listGenderMembre2, user2["gender"]));
      setClassValueMembre2(getOptionValue(listGenderMembre2, user2["gender"]));
      setSchoolValueMembre2(getOptionValue(listClass, user2["school"]));
    }

    setIsReady(true);
  }, []);

  // matricule membre 1
  const [matriculeMembre1, setMatriculeMembre1] = useState("");
  const handleMAtriculeMembre1Change = (event: { target: { value: any } }) => {
    setMatriculeMembre1(event.target.value);
  };

  // nom du membre 1
  const [lastnameMembre1, setLastnameMembre1] = useState("");
  const handleLastnameMembre1Change = (event: { target: { value: any } }) => {
    setLastnameMembre1(event.target.value);
  };

  // prenom du membre 1
  const [firstnameMembre1, setFirstnameMembre1] = useState("");
  const handleFirstNameMembre1Change = (event: { target: { value: any } }) => {
    setFirstnameMembre1(event.target.value);
  };

  // email du membre 1
  const [emailMembre1, setEmailMembre1] = useState("");
  const handleEmailMembre1Change = (event: { target: { value: any } }) => {
    setEmailMembre1(event.target.value);
  };

  // variable du genre membre 1

  const [GenderValueMembre1, setGenderValueMembre1] = useState(0);
  const listGenderMembre1 = baseListGender;

  const handleGenderChangeMembre1 = (selectedOption: {
    value: React.SetStateAction<number>;
  }) => {
    setGenderValueMembre1(selectedOption.value);
  };

  // variables de la classe du membre 1

  const [ClassValueMembre1, setClassValueMembre1] = useState(0);
  const [listClass, setListClass] = useState<
    { value: number; label: string }[]
  >([]);

  const handleClassChangeMembre1 = (selectedOption: {
    value: React.SetStateAction<number>;
  }) => {
    setClassValueMembre1(selectedOption.value);
  };

  // school member 1

  const [schoolValueMembre1, setSchoolValueMembre1] = useState(0);
  const handleSchoolMembre1Change = (selectedOption: {
    value: React.SetStateAction<number>;
  }) => {
    setSchoolValueMembre1(selectedOption.value);
  };

  // matricule membre 2
  const [matriculeMembre2, setMatriculeMembre2] = useState("");
  const handleMAtriculeMembre2Change = (event: { target: { value: any } }) => {
    setMatriculeMembre2(event.target.value);
  };

  // nom du membre 2
  const [lastnameMembre2, setLastnameMembre2] = useState("");
  const handleLastnameMembre2Change = (event: { target: { value: any } }) => {
    setLastnameMembre2(event.target.value);
  };

  // prenom du membre 2
  const [firstnameMembre2, setFirstnameMembre2] = useState("");
  const handleFirstNameMembre2Change = (event: { target: { value: any } }) => {
    setFirstnameMembre2(event.target.value);
  };

  // email du membre 2
  const [emailMembre2, setEmailMembre2] = useState("");
  const handleEmailMembre2Change = (event: { target: { value: any } }) => {
    setEmailMembre2(event.target.value);
  };

  // variable du genre membre 2

  const [GenderValueMembre2, setGenderValueMembre2] = useState(0);
  const listGenderMembre2 = baseListGender;

  const handleGenderChangeMembre2 = (selectedOption: {
    value: React.SetStateAction<number>;
  }) => {
    setGenderValueMembre2(selectedOption.value);
  };

  // variables de la classe du membre 2

  const [ClassValueMembre2, setClassValueMembre2] = useState(0);

  const handleClassChangeMembre2 = (selectedOption: {
    value: React.SetStateAction<number>;
  }) => {
    setClassValueMembre2(selectedOption.value);
  };

  // school member 1

  const [schoolValueMembre2, setSchoolValueMembre2] = useState(0);
  const handleSchoolMembre2Change = (selectedOption: {
    value: React.SetStateAction<number>;
  }) => {
    setSchoolValueMembre2(selectedOption.value);
  };

  // change the page

  const goToPreviousStep = () => {
    storeInLocalStorage();
    previousStep();
  };

  // store in localStorage

  const storeInLocalStorage = () => {
    const informationAboutMembre1 = {
      matricule: matriculeMembre1,
      lastName: lastnameMembre1,
      firstName: firstnameMembre1,
      email: emailMembre1,
      gender: getOptionLabel(listGenderMembre1, GenderValueMembre1),
      class: comeFromEsatic ? ClassValueMembre1 : schoolValueMembre1,
    };

    const informationAboutMembre2 = {
      matricule: matriculeMembre2,
      lastName: lastnameMembre2,
      firstName: firstnameMembre2,
      email: emailMembre2,
      gender: getOptionLabel(listGenderMembre2, GenderValueMembre2),
      class: comeFromEsatic ? ClassValueMembre2 : schoolValueMembre2,
    };

    secureLocalStorage.setItem(
      "informationAboutMembre1",
      informationAboutMembre1
    );

    secureLocalStorage.setItem(
      "informationAboutMembre2",
      informationAboutMembre2
    );
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    storeInLocalStorage();

    const leaderInformation = secureLocalStorage.getItem("leaderInformation");
    const member1 = secureLocalStorage.getItem("informationAboutMembre1");
    const member2 = secureLocalStorage.getItem("informationAboutMembre2");

    if (leaderInformation && member1 && member2) {
      const decodedInformation = leaderInformation;
      const decodedMember1 = member1;
      const decodedMember2 = member2;

      const newTeam = {
        esatic: comeFromEsatic ? 1 : 0,

        niveau: decodedInformation["level"],
        nom_groupe: decodedInformation["teamName"],
        photo_groupe: "pas_de_photo.png",

        matricule_chef: decodedInformation["matricule"],
        nom_chef: decodedInformation["lastName"],
        prenom_chef: decodedInformation["firstName"],
        classe_chef: decodedInformation["class"],
        email_chef: decodedInformation["email"],
        genre_chef: decodedInformation["gender"],

        matricule_m2: decodedMember1["matricule"],
        nom_m2: decodedMember1["lastName"],
        prenom_m2: decodedMember1["firstName"],
        classe_m2: decodedMember1["class"],
        email_m2: decodedMember1["email"],
        genre_m2: decodedMember1["gender"],

        matricule_m3: decodedMember2["matricule"],
        nom_m3: decodedMember2["lastName"],
        prenom_m3: decodedMember2["firstName"],
        classe_m3: decodedMember2["class"],
        email_m3: decodedMember2["email"],
        genre_m3: decodedMember2["gender"],
      };

      handleServiceRegister(newTeam).then((result) => {
        if (result) {
          secureLocalStorage.removeItem("leaderInformation");
          secureLocalStorage.removeItem("informationAboutMembre1");
          secureLocalStorage.removeItem("informationAboutMembre2");

          setTimeout(() => {
            setIsLoading(false);
            navigate("/hackathon/auth/SuccessRegistration");
          }, 3000);
        }
      });
    }
  };

  return (
    <div className="w-full">
      {isReady ? (
        <div className="w-full mx-auto max-w-4xl md:bg-white md:p-9 mb-9 md:shadow-xl md:rounded-3xl">
          <form onSubmit={handleSubmit}>
            <div className="w-full max-w-3xl mx-auto md:flex md:gap-6 md:p-9">
              <div className="md:w-1/2 mx-auto">
                <div className="flex flex-col gap-3">
                  <h5 className="text-xl mb-4 font-bold text-gray-900 dark:text-white">
                    Membre 2
                  </h5>
                  {comeFromEsatic === true ? (
                    <div className="flex flex-col gap-3">
                      <Labelui label="Matricule" />
                      <InputField
                        lenght={30}
                        onChange={handleMAtriculeMembre1Change}
                        value={matriculeMembre1}
                        placeholder="XX-ESATICXXXXX"
                        type="text"
                      />
                    </div>
                  ) : null}

                  <Labelui label="Nom" />
                  <InputField
                    lenght={30}
                    onChange={handleLastnameMembre1Change}
                    value={lastnameMembre1}
                    placeholder="koffi"
                    type="text"
                  />

                  <Labelui label="Prénom" />
                  <InputField
                    lenght={30}
                    onChange={handleFirstNameMembre1Change}
                    value={firstnameMembre1}
                    placeholder="ange"
                    type="text"
                  />

                  <Labelui label="Email" />
                  <InputField
                    lenght={30}
                    onChange={handleEmailMembre1Change}
                    value={emailMembre1}
                    placeholder="koffi@gmail.com"
                    type="email"
                  />

                  <Labelui label="Genre" />
                  <SelectUi
                    placeholder="Choisissez"
                    options={listGenderMembre1}
                    filterValue={GenderValueMembre1}
                    onChange={handleGenderChangeMembre1}
                  />

                  {comeFromEsatic === true ? (
                    <div className="flex flex-col gap-3">
                      <Labelui label="Classe" />
                      <SelectUi
                        placeholder="Choisissez"
                        options={listClass}
                        filterValue={ClassValueMembre1}
                        onChange={handleClassChangeMembre1}
                      />
                    </div>
                  ) : null}

                  {comeFromEsatic === false ? (
                    <div className="flex flex-col gap-3">
                      <Labelui label="École" />
                      <SelectUi
                        placeholder="Choisissez"
                        options={listClass}
                        filterValue={schoolValueMembre1}
                        onChange={handleSchoolMembre1Change}
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col gap-3">
                <h5 className="text-xl mb-4 font-bold text-gray-900 dark:text-white">
                  Membre 3
                </h5>

                {comeFromEsatic === true ? (
                  <div className="flex flex-col gap-3">
                    <Labelui label="Matricule" />
                    <InputField
                      lenght={30}
                      onChange={handleMAtriculeMembre2Change}
                      value={matriculeMembre2}
                      placeholder="XX-ESATICXXXXX"
                      type="text"
                    />
                  </div>
                ) : null}

                <Labelui label="Nom" />
                <InputField
                  lenght={30}
                  onChange={handleLastnameMembre2Change}
                  value={lastnameMembre2}
                  placeholder="koffi"
                  type="text"
                />

                <Labelui label="Prénom" />
                <InputField
                  lenght={30}
                  onChange={handleFirstNameMembre2Change}
                  value={firstnameMembre2}
                  placeholder="emmanuel"
                  type="text"
                />

                <Labelui label="Email" />
                <InputField
                  lenght={30}
                  onChange={handleEmailMembre2Change}
                  value={emailMembre2}
                  placeholder="koffi@gmail.com"
                  type="email"
                />

                <Labelui label="Genre" />
                <SelectUi
                  placeholder="Choisissez"
                  options={listGenderMembre2}
                  filterValue={GenderValueMembre2}
                  onChange={handleGenderChangeMembre2}
                />

                {comeFromEsatic === true ? (
                  <div className="flex flex-col gap-3">
                    <Labelui label="Classe" />
                    <SelectUi
                      placeholder="Choisissez"
                      options={listClass}
                      filterValue={ClassValueMembre2}
                      onChange={handleClassChangeMembre2}
                    />
                  </div>
                ) : null}

                {comeFromEsatic === false ? (
                  <div className="flex flex-col gap-3">
                    <Labelui label="École" />
                    <SelectUi
                      placeholder="Choisissez"
                      options={listClass}
                      filterValue={schoolValueMembre2}
                      onChange={handleSchoolMembre2Change}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-9">
              <Button
                isLoading={false}
                onClick={goToPreviousStep}
                type="button"
                label="Précédent"
                isDisable={false}
                isReady={true}
              />

              <Button
                onClick={() => {
                  return;
                }}
                isLoading={isLoading}
                type="submit"
                label="Soumettre"
                isDisable={false}
                isReady={true}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <HashLoader size={60} color="#F94C10" loading={!isReady} />
        </div>
      )}
    </div>
  );
}
