import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getJobRun() {
  return fetchWrapper({
    url: `${BASE_URL}/api/job-run`,
    method: "GET",
  });
}

export function useJobRun() {
  return useQuery("JobRun", getJobRun, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to get job run: ${error.message}`);
      }
    },
  });
}
