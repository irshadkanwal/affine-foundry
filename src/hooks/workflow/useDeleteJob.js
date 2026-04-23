import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteJob({ jobId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/job/${jobId}`,
    method: "DELETE",
  });
}
export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation(({ jobId }) => deleteJob({ jobId }), {
    onSuccess: () => {
      queryClient.invalidateQueries("Jobs");
      notifySuccess("Job deleted successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to delete job: ${error.message}`);
      }
    },
  });
}
