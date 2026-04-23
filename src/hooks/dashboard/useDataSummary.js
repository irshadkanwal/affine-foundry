import { BASE_URL } from "config";
import { useQuery } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

export function getDataSummary() {
  return fetchWrapper({
    url: `${BASE_URL}/api/report/data-summary`,
    method: "GET",
  });
}

export function useDataSummary() {
  return useQuery("data-summary", getDataSummary, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data summary: ${error.message}`);
      }
    },
  });
}
