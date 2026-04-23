import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function createTask({
  applicationId, //
  jobId, //
  name,
  parentId,
  runtimeId,
  source,
  ruleWorkbookId,
  taskTypeId,
  dependsOn,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/task`,
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

export function useCreateTask() {
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
      dependsOn,
    }) =>
      createTask({
        applicationId,
        jobId,
        name,
        parentId,
        runtimeId,
        source,
        ruleWorkbookId,
        taskTypeId,
        dependsOn,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("TaskNodesByJobId");
        notifySuccess("Task created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create task: ${error.message}`);
        }
      },
    }
  );
}
