import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteDataPackageResource({ resourceId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${resourceId}`,
    method: "DELETE",
  });
}
export function useDeleteDataPackageResource(dataPackageId) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ resourceId }) => deleteDataPackageResource({ resourceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "DataPackageResourceById",
          dataPackageId,
        ]);
        notifySuccess("Data package resource deleted successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to delete data package resource: ${error.message}`
          );
        }
      },
    }
  );
}
