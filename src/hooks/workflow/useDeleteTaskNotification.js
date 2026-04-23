import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { BASE_URL } from "config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteTaskNotification({ taskNotificationId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/task-notification/${taskNotificationId}`,
    method: "DELETE",
  });
}
export function useDeleteTaskNotification() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ taskNotificationId }) => deleteTaskNotification({ taskNotificationId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("TaskNotifications");
        notifySuccess("Task Notification deleted successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to delete task notification: ${error.message}`);
        }
      },
    }
  );
}
