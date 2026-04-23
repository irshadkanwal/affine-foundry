import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteResourceSchema({ schemaId, dataResourceId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${dataResourceId}/resource-schema/${schemaId}`,
    method: "DELETE",
  });
}
export function useDeleteResourceSchema(dataResourceId) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ schemaId, dataResourceId }) =>
      deleteResourceSchema({ schemaId, dataResourceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["DataResourceSchema", dataResourceId]);
        notifySuccess("Resource Schema deleted successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to delete resource schema: ${error.message}`);
        }
      },
    }
  );
}
