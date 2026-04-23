import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteTask({ taskId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/task/${taskId}`,
    method: "DELETE",
  });
}
export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation(({ taskId }) => deleteTask({ taskId }), {
    onSuccess: () => {
      queryClient.invalidateQueries("TaskNodesByJobId");
      notifySuccess("Task deleted successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to delete task: ${error.message}`);
      }
    },
  });
}
