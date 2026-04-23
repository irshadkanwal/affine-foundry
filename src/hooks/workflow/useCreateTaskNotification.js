import { BASE_URL } from "config";
import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function createTaskNotification({
  taskId,
  email,
  success,
  failure,
  start,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/task-notification`,
    body: {
      taskId: taskId,
      email: email,
      success: success,
      fail: failure,
      start: start,
    },
  });
}

export function useCreateTaskNotification() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ taskId, email, success, failure, start }) =>
      createTaskNotification({
        taskId,
        email,
        success,
        failure,
        start,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("TaskNotifications");
        notifySuccess("Task Notification created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create task notification: ${error.message}`);
        }
      },
    }
  );
}
