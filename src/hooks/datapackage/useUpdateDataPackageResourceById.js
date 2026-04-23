import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateDataPackageResource({ resourceData, resourceId }) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-resource/${resourceId}`,
    body: resourceData,
  });
}

export function useUpdateDataPackageResourceById() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ resourceData, resourceId }) =>
      updateDataPackageResource({
        resourceData,
        resourceId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackageResourceById");
        notifySuccess("Data package resource updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to update data package resource: ${error.message}`
          );
        }
      },
    }
  );
}
