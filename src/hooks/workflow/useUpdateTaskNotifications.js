import { BASE_URL } from "config";
import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function updateTaskNotification({
  taskId,
  email,
  success,
  failure,
  start,
  notificationId,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/task-notification/${notificationId}`,
    body: {
      taskId: taskId,
      email: email,
      success: success,
      fail: failure,
      start: start,
    },
  });
}

export function useUpdateTaskNotifications() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ taskId, email, success, failure, start, notificationId }) =>
      updateTaskNotification({
        taskId,
        email,
        success,
        failure,
        start,
        notificationId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("TaskNotifications");
        notifySuccess("Task Notification updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update task notification: ${error.message}`);
        }
      },
    }
  );
}
