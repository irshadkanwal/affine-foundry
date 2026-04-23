import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataPackageFrequency() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package-refresh`,
    method: "GET",
  });
}

export function useDataClassification() {
  return useQuery("DataPackageRefresh", getDataPackageFrequency, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data package refresh: ${error.message}`);
      }
    },
  });
}
