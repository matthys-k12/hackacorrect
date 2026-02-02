/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";

const apiUrl = "/api";

export const handleServiceGetTeams = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/groupe/render`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Liste mise à jour");
      return response.data.data.equipes;
    case false:
      notify("error", response.data.message);
      return null;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite");
  }
};
