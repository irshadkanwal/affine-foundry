import { BASE_URL } from "config";
import { useQuery } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

export function getDataClassMapping() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-class-field-mapping`,
    method: "GET",
  });
}

export function useDataClassMapping() {
  return useQuery("DataClassMapping", getDataClassMapping, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data class mapping: ${error.message}`);
      }
    },
  });
}
