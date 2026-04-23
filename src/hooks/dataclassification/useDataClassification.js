import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataClass() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-classification`,
    method: "GET",
  });
}

export function useDataClassification() {
  return useQuery("DataClassification", getDataClass, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data classification: ${error.message}`);
      }
    },
  });
}
