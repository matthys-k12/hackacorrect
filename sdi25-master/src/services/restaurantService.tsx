/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const apiUrl = "/api";

export const handleServiceGetMeal = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/restauration/render`;
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

export const handleServiceCreateFood = async (data: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/repas/create`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Le repas a bien été crée");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceCreateDrink = async (data: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/collation/create`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "La collation a bien été crée");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceDeleteFood = async (data: any) => {
  axios.defaults.headers.common["Authorization"] =
      "Bearer " + secureLocalStorage.getItem("session_token")!;
  
  try {
    const uri = `${apiUrl}/repas/delete`;
    const response = await axios.post(uri, data);
    const status = response.data.status;
  
    switch (status) {
    case true:
      notify("success", "Le repas a bien été supprimé");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceDeleteCollation = async (data: any) => {
  axios.defaults.headers.common["Authorization"] =
      "Bearer " + secureLocalStorage.getItem("session_token")!;
  
  try {
    const uri = `${apiUrl}/collation/delete`;
    const response = await axios.post(uri, data);
    const status = response.data.status;
  
    switch (status) {
    case true:
      notify("success", "La collation a bien été supprimée");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceGetcommand = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/commandes/render`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data.commandes;
    case false:
      return [];
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceResetcommand = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/commandes/reset`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "les commandes on bien été supprimées");
      return true;
    case false:
      notify("error", "Quelque chose a mal tourné");
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceParticipantGetData = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/prestauration/render`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      notify("error", "Quelque chose a mal tourné");
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceCommand = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/commande/make`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Votre commande a bien été enregistée");
      return true;
    case false:
      notify("error", "Quelque chose a mal tourné");
      return false;
    }
  } catch (error) {
    alert(error);
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceScanCode = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/restauration/soumission`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Votre ticket a bien été scanné");
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceAllRepas= async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/allrepas/render`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};