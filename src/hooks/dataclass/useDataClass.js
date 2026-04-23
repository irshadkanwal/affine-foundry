import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataClass() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-class`,
    method: "GET",
  });
}

export function useDataClass() {
  return useQuery("DataClass", getDataClass, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data class: ${error.message}`);
      }
    },
  });
}
