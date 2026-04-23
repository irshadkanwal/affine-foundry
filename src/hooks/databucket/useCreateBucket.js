import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createBucket({ name, arn, createdAt, createdBy }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-bucket`,
    body: {
      name,
      arn,
      active: true,
      createdAt,
      createdBy,
    },
  });
}

export function useCreateBucket() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ name, arn, createdAt, createdBy }) =>
      createBucket({ name, arn, createdAt, createdBy }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataBucket");
        notifySuccess("Data bucket created successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create data bucket: ${error.message}`);
        }
      },
    }
  );
}
