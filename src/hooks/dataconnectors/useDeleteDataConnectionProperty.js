import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteDataConnectionProp({ connectionPropId }) {
  return await fetchWrapper({
    method: "DELETE",
    url: `${BASE_URL}/api/connection-prop/${connectionPropId}`,
  });
}

export function useDeleteDataConnectionProp() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ connectionPropId }) => deleteDataConnectionProp({ connectionPropId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataConnectionsProp");
        notifySuccess("Data connection property deleted successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to delete data connection property: ${error.message}`
          );
        }
      },
    }
  );
}
