import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function updateTask({
  applicationId,
  jobId,
  name,
  parentId,
  runtimeId,
  source,
  ruleWorkbookId,
  taskTypeId,
  taskId,
  dependsOn,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/task/${taskId}`,
    body: {
      applicationId,
      jobId,
      name,
      parentId,
      runtimeId,
      source,
      ruleWorkbookId,
      taskTypeId,
      dependsOn,
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      applicationId,
      jobId,
      name,
      parentId,
      runtimeId,
      source,
      ruleWorkbookId,
      taskTypeId,
      taskId,
      dependsOn,
    }) =>
      updateTask({
        applicationId,
        jobId,
        name,
        parentId,
        runtimeId,
        source,
        ruleWorkbookId,
        taskTypeId,
        taskId,
        dependsOn,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("TaskNodesByJobId");
        notifySuccess("Task updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update task: ${error.message}`);
        }
      },
    }
  );
}
