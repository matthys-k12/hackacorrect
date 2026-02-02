import toast from "react-hot-toast";

export const notify = (type: string , label: string) => {
  if (type === "success") {
    toast.success(label);
  } else {
    toast.error(label);
  }
};