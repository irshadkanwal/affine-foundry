import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteResourceDialect({ dialectId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/data-resource-dialect/${dialectId}`,
    method: "DELETE",
  });
}
export function useDeleteResourceDialect(dataResourceId) {
  const queryClient = useQueryClient();
  return useMutation(({ dialectId }) => deleteResourceDialect({ dialectId }), {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "DataResourceByIdDialect",
        dataResourceId,
      ]);
      notifySuccess("Data Resource Dialect deleted successfully.");
    },
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to delete data resource dialect: ${error.message}`);
      }
    },
  });
}
