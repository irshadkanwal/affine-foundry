import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

async function getConnectionType() {
  return fetchWrapper({
    url: `${BASE_URL}/api/connection-type`,
  });
}

export function useConnectionType() {
  return useQuery("ConnectionTypes", getConnectionType, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch connection types: ${error.message}`);
      }
    },
  });
}
