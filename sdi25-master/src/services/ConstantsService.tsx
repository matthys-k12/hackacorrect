/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";

const apiUrl = "/api";

export const handleServiceGetLevelsList = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/data-for-enregistrement-participants`;
    
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      // console.log(response);
      return response.data.data;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceGetClassList = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/classe/render`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }


  
  
};
