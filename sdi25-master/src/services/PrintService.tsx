/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";

const apiUrl = process.env.REACT_APP_API_URL;

export const handleServicePrintList = async (id: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/api/pdf/selectedteam/${id}`;
    const response = await axios.get(uri);

    const status = response.data.status;

    switch (status) {
      case true:
        return true;
      case false:
        notify("error", "Une erreur s'est produite !");
        break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};