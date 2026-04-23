import { BASE_URL } from "config";
import { useQuery } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

export function getMostRecentActivity() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package/most-recent-data-activity`,
    method: "GET",
  });
}

export function useMostRecentActivity() {
  return useQuery("MostRecentActivity", getMostRecentActivity, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch most recent activity: ${error.message}`);
      }
    },
  });
}
