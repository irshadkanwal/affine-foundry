import { toast } from "react-hot-toast";

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "bottom-right",
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    position: "bottom-right",
  });
};
