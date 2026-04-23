import { BASE_URL } from "config";
import { useQuery } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

export function getJobRunListByJobId(jobId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/job/${jobId}/run`,
    method: "GET",
  });
}

export function useJobRunListByJobId(jobId) {
  return useQuery(
    ["JobRunListByJobId", jobId],
    () => getJobRunListByJobId(jobId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to get job run list: ${error.message}`);
        }
      },
      enabled: !!jobId,
    }
  );
}
