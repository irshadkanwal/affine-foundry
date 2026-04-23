import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getJobTrigger() {
  return fetchWrapper({
    url: `${BASE_URL}/api/job-trigger`,
    method: "GET",
  });
}

export function useJobTrigger() {
  return useQuery("JobTrigger", getJobTrigger, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError
        (`Failed to get job trigger: ${error.message}`);
      }
    },
  });
}
