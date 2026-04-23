import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getJobs() {
  return fetchWrapper({
    url: `${BASE_URL}/api/job`,
    method: "GET",
  });
}

export function useJobs() {
  return useQuery("Jobs", getJobs, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to get jobs: ${error.message}`);
      }
    },
  });
}
