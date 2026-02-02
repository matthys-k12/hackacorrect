/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";

const apiUrl = "/api";

export const handleServiceGetRooms = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/salle/render`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Liste mise à jour");
      return response.data.data.salles;
    case false:
      notify("error", response.data.message);
      return null;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite");
  }
};

export const handleServiceCreateClass = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/salle/create`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Une classe a bien été créee");
      return true;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite");
  }
};

export const handleServiceUpdateSpace = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/salle/update`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "La classe a bien été mise à jour");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite");
  }
};

export const handleServiceDeleteSpace = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/salle/delete`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "La classe a bien été supprimée");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite");
  }
};
