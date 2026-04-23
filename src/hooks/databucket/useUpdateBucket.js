import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateBucket({
  name,
  arn,
  active,
  createdAt,
  createdBy,
  bucketId,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-bucket/${bucketId}`,
    body: {
      id: bucketId,
      name,
      arn,
      active,
      createdAt,
      createdBy: 1,
      userID: 1,
    },
  });
}

export function useUpdateBucket(bucketId) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ name, arn, active, createdAt, createdBy, bucketId }) =>
      updateBucket({ name, arn, active, createdAt, createdBy, bucketId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataBucket");
        notifySuccess("Data bucket updated successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update data bucket: ${error.message}`);
        }
      },
    }
  );
}
