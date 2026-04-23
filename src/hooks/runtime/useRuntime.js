import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getRuntime() {
  return fetchWrapper({
    url: `${BASE_URL}/api/runtime`,
    method: "GET",
  });
}

export function useRuntime() {
  return useQuery("Runtime", getRuntime, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch runtime: ${error.message}`);
      }
    },
  });
}
