import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataConnectionProps() {
  return fetchWrapper({
    url: `${BASE_URL}/api/connection-prop`,
    method: "GET",
  });
}

export function useDataConnectionProps() {
  return useQuery("DataConnectionsProp", getDataConnectionProps, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(
          `Failed to fetch data connection properties: ${error.message}`
        );
      }
    },
  });
}
