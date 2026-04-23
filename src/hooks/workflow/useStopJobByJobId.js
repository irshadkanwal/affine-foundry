import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function stopJob({ jobId }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/job/${jobId}/stop`,
    body: {},
  });
}

export function useStopJobByJobId() {
  const queryClient = useQueryClient();

  return useMutation(({ jobId }) => stopJob({ jobId }), {
    onSuccess: () => {
      queryClient.invalidateQueries("Jobs");
      notifySuccess("Job stopped successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to stop job: ${error.message}`);
      }
      return error;
    },
  });
}
