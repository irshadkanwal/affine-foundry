import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateDataConnecter(data) {
  const { connectionId, name, active, type, connectionTypeId, createdAt } =
    data;
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/connection/${connectionId}`,
    body: {
      name,
      type,
      active,
      dataPackageId: 9,
      createdAt,
      connectionTypeId,
    },
  });
}
export function useUpdateDataConnecter() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ connectionId, name, active, type, connectionTypeId, createdAt }) =>
      updateDataConnecter({
        connectionId,
        name,
        active,
        type,
        connectionTypeId,
        createdAt,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataConnections");
        notifySuccess("Data connection updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update data connection: ${error.message}`);
        }
      },
    }
  );
}
