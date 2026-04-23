import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataPackage() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package`,
    method: "GET",
  });
}

export function useDataPackage() {
  return useQuery("DataPackage", getDataPackage, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data package: ${error.message}`);
      }
    },
  });
}
