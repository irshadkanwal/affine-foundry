import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getTaskNodesByJobId(jobId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/job/${jobId}/task`,
    method: "GET",
  });
}

export function useTaskByJobId(jobId) {
  return useQuery(
    ["TaskNodesByJobId", jobId],
    () => getTaskNodesByJobId(jobId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to get task nodes: ${error.message}`);
        }
      },
      enabled: !!jobId,
    }
  );
}
