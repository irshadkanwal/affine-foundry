import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataPackageById(id) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package/${id}`,
    method: "GET",
  });
}

export function useDataPackageById(id) {
  return useQuery(["DataPackage", id], getDataPackageById(id), {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data package by id: ${error.message}`);
      }
    },
    enabled: !!id,
  });
}
