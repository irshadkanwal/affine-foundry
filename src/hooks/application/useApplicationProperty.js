import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getApplicationProps() {
  return fetchWrapper({
    url: `${BASE_URL}/api/application-prop`,
    method: "GET",
  });
}

export function useApplicationProps() {
  return useQuery("ApplicationProps", getApplicationProps, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch application properties: ${error.message}`);
      }
    },
  });
}
