import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getRuntimeProps() {
  return fetchWrapper({
    url: `${BASE_URL}/api/runtime-prop`,
    method: "GET",
  });
}

export function useRuntimeProps() {
  return useQuery("RuntimeProps", getRuntimeProps, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch runtime properties: ${error.message}`);
      }
    },
  });
}
