import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataActivity() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-activity`,
    method: "GET",
  });
}

export function useDataActivity() {
  return useQuery("DataActivity", getDataActivity, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch Data Activity: ${error.message}`);
      }
    },
  });
}
