import { PaginatedItems } from "../../../../components/PageIndicator";
import React, { useState, useEffect } from "react";

import HashLoader from "react-spinners/HashLoader";

import InputField from "../../../../components/ui/InputField.tsx";
import Labelui from "../../../../components/ui/labelui.tsx";
import Button from "../../../../components/ui/ButtonUi.tsx";

import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  handleServiceDeleteSpace,
  handleServiceGetRooms,
  handleServiceUpdateSpace,
} from "../../../../services/SpaceRoom.tsx";
import { handleServiceCreateClass } from "../../../../services/SpaceRoom.tsx";

export default function SpacesComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [classList, setClassList] = useState([]);

  // get data

  async function getClassList() {
    setIsLoading(true);
    const result = await handleServiceGetRooms();
    setClassList(result);
    setIsLoading(false);
  }

  useEffect(() => {
    getClassList();
  }, []);

  // class variables
  const [classValue, setClassValue] = useState("");
  const handleClassValueChange = (event) => {
    setClassValue(event.target.value);
  };

  const [teamLimitValue, setTeamLimitValue] = useState(0);
  const handleLimitChange = (event) => {
    setTeamLimitValue(event.target.value);
  };

  function TableHeader() {
    return (
      <tr>
        <th scope="col" className="px-6 py-3">
          Classe
        </th>
        <th scope="col" className="px-6 py-3">
          Limite
        </th>
        <th scope="col" className="px-6 py-3">
          Option
        </th>
      </tr>
    );
  }

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.libelle}
              </th>
              <td className="px-6 py-4">{item.nb_equipe}</td>
              <td className="px-6 text-[#F94C10]">
                <button
                  onClick={() =>
                    handleOpen(item.libelle, item.nb_equipe, item.id)
                  }
                >
                  éditer.
                </button>
              </td>
            </tr>
          ))}
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      libelle: classValue,
      nb_equipe: teamLimitValue,
    };

    try {
      handleServiceCreateClass(data).then((result) => {
        setIsLoading(false);
        if (result) {
          getClassList();
        }
      });
    } catch {
      setIsLoading(false);
    }
  };

  // modal variables
  const [open, setOpen] = React.useState(false);
  const handleOpen = (classe, limit, id) => {
    setUpdateClassValue(classe);
    setUpdateLimitValue(limit);
    setClassId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 0,
    p: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  };

  // update class value

  const [updateClassValue, setUpdateClassValue] = useState("");
  const handleUpdateClassChange = (event) => {
    setUpdateClassValue(event.target.value);
  };

  const [updateLimitValue, setUpdateLimitValue] = useState(0);
  const handleUpdateLimitChange = (event) => {
    setUpdateLimitValue(event.target.value);
  };

  const [ClassId, setClassId] = useState();

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    // setIsLoading(true);

    const updateSalle = {
      libelle: updateClassValue,
      nb_equipe: updateLimitValue,
      salleId: ClassId,
    };

    try {
      handleServiceUpdateSpace(updateSalle).then((result) => {
        setIsLoading(false);
        handleClose();
        if (result) {
          getClassList();
        }
      });
    } catch {
      setIsLoading(false);
    }
  };

  const handleDeleteClass = () => {
    setIsLoading(true);

    const data = {
      salleId: ClassId,
    };

    handleServiceDeleteSpace(data).then((result) => {
      if (result) {
        handleClose();
        getClassList();
      }
    });
  };

  return (
    <div>
      {!isLoading ? (
        <div className="lg:flex lg:justify-between md:gap-4">
          <div className="md:w-2/5 max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              Enregistrez une salle
            </h5>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 my-9"
              action="#"
            >
              <Labelui label="Libelle de la classe" />
              <InputField
                onChange={handleClassValueChange}
                value={classValue}
                placeholder="nom de la classe"
                type="text"
              />
              <Labelui label="Nombre d'équipe" />
              <InputField
                onChange={handleLimitChange}
                value={teamLimitValue}
                placeholder="0"
                type="text"
              />
              <div className="my-4">
                <Button
                  label="Enregistrer"
                  type="submit"
                  isDisable={false}
                  isReady={true}
                  isLoading={isLoading}
                />
              </div>
            </form>
          </div>
          <div>
            <Modal
              className="bg-[rgb(255,255,255,.10)]"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={handleUpdateSubmit} action="#">
                  <div className="flex flex-col gap-4">
                    <Labelui label="Libelle de la classe" />
                    <InputField
                      onChange={handleUpdateClassChange}
                      value={updateClassValue}
                      placeholder="libelle de la classe"
                      type="text"
                    />
                    <Labelui label="Niveau" />
                    <InputField
                      onChange={handleUpdateLimitChange}
                      value={updateLimitValue}
                      placeholder="0"
                      type="number"
                    />
                    <div className="my-4">
                      <Button
                        label="Enregistrer"
                        type="submit"
                        isDisable={false}
                        isReady={true}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </form>
                <Divider />
                <form action="#">
                  <div className="my-4">
                    <Button
                      label="Supprimer la classe"
                      onClick={() => handleDeleteClass()}
                      type="button"
                      isDisable={false}
                      isReady={true}
                      isLoading={isLoading}
                    />
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
          <div className="lg:w-3/5 lg:mt-0 mt-4" id="container">
            <PaginatedItems
              itemsPerPage={4}
              item={classList}
              Items={Items}
              tableHeader={TableHeader}
            />
          </div>
        </div>
      ) : (
        <div
          id="container"
          className="h-screen w-full flex justify-center items-center"
        >
          <HashLoader size={60} color="#F94C10" loading={isLoading} />
        </div>
      )}
    </div>
  );
}
