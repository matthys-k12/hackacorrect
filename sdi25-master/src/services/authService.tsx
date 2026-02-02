/* eslint-disable @typescript-eslint/no-non-null-assertion */
import secureLocalStorage from "react-secure-storage";
import { notify } from "../components/toast/toast.tsx";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// Function to log users
export const handleServiceLogIn = async (data: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/api/auth/login`;
    const response = await axios.post(uri, data);

    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Connexion reussie 🥳");
      secureLocalStorage.setItem(
        "session_token",
        response.data.data.accessToken
      );
      secureLocalStorage.setItem("user_role", response.data.data.role);
      secureLocalStorage.setItem("user", response.data.data.user);
      secureLocalStorage.setItem("niveau", response.data.data.user.niveau);
      secureLocalStorage.setItem("team", response.data.data.equipe);
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Quelque chose a mal tourné");
  }
};

// Function register a team
export const handleServiceRegister = async (data: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/api/enregistrement-participants`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Votre équipe a bien été enregistrée");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Quelque chose a mal tourné");
  }
};

// Function to log users
export const handleServiceLogOut = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/api/auth/logout`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      secureLocalStorage.clear();
      notify("success", "vous êtes bien déconnecté");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Quelque chose a mal tourné");
  }
};
