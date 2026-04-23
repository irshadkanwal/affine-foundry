import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getReferenceData() {
  return fetchWrapper({
    url: `${BASE_URL}/api/lookup`,
    method: "GET",
  });
}

export function useReferenceData() {
  return useQuery("ReferenceData", getReferenceData, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch reference data: ${error.message}`);
      }
    },
  });
}
