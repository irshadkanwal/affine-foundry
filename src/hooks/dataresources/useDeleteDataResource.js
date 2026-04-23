import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteDataResource({ dataResourceId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${dataResourceId}`,
    method: "DELETE",
  });
}
export function useDeleteDataResource() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ dataResourceId }) => deleteDataResource({ dataResourceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataResource");
        notifySuccess("Data resource deleted successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to delete data resource: ${error.message}`);
        }
      },
    }
  );
}
