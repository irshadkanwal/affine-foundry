import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataResourceDialect() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource-dialect`,
    method: "GET",
  });
}

export function useDataResourceDialect() {
  return useQuery("DataResourceDialect", getDataResourceDialect, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data resource dialect: ${error.message}`);
      }
    },
  });
}
