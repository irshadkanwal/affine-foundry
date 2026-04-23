import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataConnection() {
  return fetchWrapper({
    url: `${BASE_URL}/api/connection`,
    method: "GET",
  });
}

export function useDataConnections() {
  return useQuery("DataConnections", getDataConnection, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data connections: ${error.message}`);
      }
    },
  });
}
