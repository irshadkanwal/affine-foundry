import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getRuntimeSizes() {
  return fetchWrapper({
    url: `${BASE_URL}/api/runtime/clusterSizes`,
    method: "GET",
  });
}

export function useRuntimeSizes() {
  return useQuery("RuntimeSizes", getRuntimeSizes, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch runtime sizes: ${error.message}`);
      }
    },
  });
}
