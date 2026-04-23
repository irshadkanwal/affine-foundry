import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getJobRunSummary() {
  return fetchWrapper({
    url: `${BASE_URL}/api/job-run-summary`,
    method: "GET",
  });
}

export function useJobRunSummary() {
  return useQuery("JobRunSummary", getJobRunSummary, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to get job run summary: ${error.message}`);
      }
    },
  });
}
