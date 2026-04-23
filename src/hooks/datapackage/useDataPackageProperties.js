import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataPackageProp() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package-prop`,
    method: "GET",
  });
}

export function useDataPackageProp() {
  return useQuery("DataPackageProp", getDataPackageProp, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(
          `Failed to fetch data package properties: ${error.message}`
        );
      }
    },
  });
}
