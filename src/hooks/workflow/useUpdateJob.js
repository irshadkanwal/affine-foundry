import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function updateJob({
  dataPackageId,
  description,
  maxRetries,
  name,
  quartzCronExpression,
  maxConcurrentTasks,
  userId,
  jobId,
  createdAt,
  jobTriggerId,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/job/${jobId}`,
    body: {
      dataPackageId,
      description,
      maxRetries,
      name,
      quartzCronExpression,
      maxConcurrentTasks,
      userId,
      createdAt,
      jobTriggerId,
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      dataPackageId,
      description,
      maxRetries,
      name,
      quartzCronExpression,
      maxConcurrentTasks,
      userId,
      jobId,
      createdAt,
      jobTriggerId,
    }) =>
      updateJob({
        dataPackageId,
        description,
        maxRetries,
        name,
        quartzCronExpression,
        maxConcurrentTasks,
        userId,
        jobId,
        createdAt,
        jobTriggerId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Jobs");
        notifySuccess("Job updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update job: ${error.message}`);
        }
      },
    }
  );
}
