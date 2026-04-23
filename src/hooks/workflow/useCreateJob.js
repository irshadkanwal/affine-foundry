import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function createJob({
  dataPackageId,
  description,
  maxRetries,
  name,
  quartzCronExpression,
  userId,
  maxConcurrentTasks,
  createdAt,
  jobTriggerId,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/job`,
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

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      dataPackageId,
      description,
      maxRetries,
      name,
      quartzCronExpression,
      maxConcurrentTasks,
      createdAt,
      userId,
      jobTriggerId,
    }) =>
      createJob({
        dataPackageId,
        description,
        maxRetries,
        maxConcurrentTasks,
        name,
        quartzCronExpression,
        userId,
        createdAt,
        jobTriggerId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Jobs");
        notifySuccess("Job created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create job: ${error.message}`);
        }
      },
    }
  );
}
