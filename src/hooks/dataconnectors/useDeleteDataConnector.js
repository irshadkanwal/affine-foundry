import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteDataConnector({ connectionId }) {
  return await fetchWrapper({
    method: "DELETE",
    url: `${BASE_URL}/api/connection/${connectionId}`,
  });
}

export function useDeleteDataConnector() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ connectionId }) => deleteDataConnector({ connectionId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataConnections");
        notifySuccess("Data connection deleted successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to delete data connection: ${error.message}`);
        }
      },
    }
  );
}
