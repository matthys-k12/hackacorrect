import { PaginatedItems } from "../../../../components/PageIndicator.jsx";
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from "react";
import React from "react";

import SelectUi from "../../../../components/ui/SelectUi.tsx";
import Labelui from "../../../../components/ui/labelui.tsx";
import Button from "../../../../components/ui/ButtonUi.tsx";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  handleServiceCreateDistribution,
  handleServiceDeleteDistribution,
  handleServiceGetDistribution,
} from "../../../../services/distributionService.tsx";

export default function DistributeComponent() {
  // variables du loader ...
  const [isLoading, setIsLoading] = useState(false);

  // Variables de la liste des répartitions
  const [listDistribution, setListDistribution] = useState([]);
  const [repartitionId, setRepartitionId] = useState("");

  // variables pour la liste des salles
  const [roomList, setRoomList] = useState([]);
  const [roomValue, setRoomValue] = useState(0);
  const handleRoomChange = (selectedOption) => {
    setRoomValue(selectedOption.value);
  };

  // variables pour la liste des équipes
  const [teamList, setTeamList] = useState([]);
  const [teamValue, setTeamValue] = useState("");
  const handleTeamChange = (selectedOption) => {
    setTeamValue(selectedOption.value);
  };

  // variables du modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setRepartitionId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // style du modal
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

  // load data
  useEffect(() => {
    getFullDataList();
  }, []);

  // get distribution list
  function getFullDataList() {
    setIsLoading(true);
    handleServiceGetDistribution().then((result) => {
      setIsLoading(false);
      if (result) {
        let teams = Array.isArray(result.equipes)
          ? result.equipes.map((item) => ({
              value: item.id,
              label: item.nom,
            }))
          : [];
        setTeamList(teams);

        let rooms = Array.isArray(result.salles)
          ? result.salles.map((item) => ({
              value: item.id,
              label: item.libelle,
            }))
          : [];
        setRoomList(rooms);

        setListDistribution(Array.isArray(result.repartitions) ? result.repartitions : []);
      }
    });
  }

  // variables de la pagination -- entêtes et corps du tableau
  function TableHeader() {
    return (
      <tr>
        <th scope="col" className="px-6 py-3">
          Niveau
        </th>
        <th scope="col" className="px-6 py-3">
          Classe
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
                {item.salle.libelle}
              </th>
              <td className="px-6 py-4"> {item.equipe.nom} </td>
              <td className="px-6 text-[#F94C10]">
                <button onClick={() => handleOpen(item.id)}>éditer.</button>
              </td>
            </tr>
          ))}
      </>
    );
  }

  // fonction de soumission de la création de répartition
  // fonction de soumission de la mise à jour de répartition

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const newDistribution = {
      salleId: roomValue,
      equipeId: teamValue,
    };

    await handleServiceCreateDistribution(newDistribution);
    setIsLoading(false);

    getFullDataList();
  };

  const handleDeleteClass = async () => {
    setIsLoading(true);

    const Distribution = {
      repartitionId: repartitionId,
    };

    await handleServiceDeleteDistribution(Distribution);
    handleClose();
    setIsLoading(false);

    getFullDataList();
  };

  return (
    <div>
      {!isLoading ? (
        <div className="lg:flex lg:justify-between md:gap-4">
          <div className="md:w-2/5 max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
              Répartition par classe
            </h5>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mb-9"
              action="#"
            >
              <Labelui label="Nom de l'équipe" />
              <SelectUi
                placeholder="Choisissez"
                options={teamList}
                filterValue={teamValue}
                onChange={handleTeamChange}
              />
              <Labelui label="Salle de classe" />
              <SelectUi
                placeholder="Choisissez"
                options={roomList}
                filterValue={roomValue}
                onChange={handleRoomChange}
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
                <form action="#">
                  <div className="my-4">
                    <form onSubmit={handleDeleteClass} action="#">
                      <Button
                        label="Supprimer la répartition"
                        onClick={() => handleDeleteClass()}
                        type="submit"
                        isDisable={false}
                        isReady={true}
                        isLoading={isLoading}
                      />
                    </form>
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
          <div className="lg:w-3/5 lg:mt-0 mt-4" id="container">
            <PaginatedItems
              itemsPerPage={4}
              item={listDistribution}
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
