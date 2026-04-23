import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataActivityTypes() {
  return fetchWrapper({
    url: `${BASE_URL}/api/activity-type`,
    method: "GET",
  });
}

export function useDataActivityTypes() {
  return useQuery("DataActivityTypes", getDataActivityTypes, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch Data Activity Types: ${error.message}`);
      }
    },
  });
}
