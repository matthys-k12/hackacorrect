/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const handleServiceGetDistribution = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/api/repartition/render`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
      case true:
        return response.data.data;
      case false:
        break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceCreateDistribution = async (data: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/api/repartition/create`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
      case true:
        notify("success", "La répartition a bien été effectuée");
        return true;
      case false:
        notify("error", response.data.message);
        break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceDeleteDistribution = async (data: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/api/repartition/delete`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
      case true:
        notify("success", "La répartition a bien été supprimée");
        return true;
      case false:
        notify("error", response.data.message);
        break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};
