import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function jobRun({ jobId }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/job/${jobId}/run`,
    body: {},
  });
}

export function useJobRunByJobId() {
  const queryClient = useQueryClient();

  return useMutation(({ jobId }) => jobRun({ jobId }), {
    onSuccess: () => {
      queryClient.invalidateQueries("Jobs");
      notifySuccess("Job run successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to run job: ${error.message}`);
      }
      return error;
    },
  });
}
