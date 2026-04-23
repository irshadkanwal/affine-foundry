import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getJobById(jobId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/job/${jobId}`,
    method: "GET",
  });
}

export function useJobById(jobId) {
  return useQuery(["JobById", jobId], () => getJobById(jobId), {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to get job: ${error.message}`);
      }
    },
    enabled: !!jobId,
  });
}
