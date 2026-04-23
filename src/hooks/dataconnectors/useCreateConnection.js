import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createConnection({
  name,
  type,
  active,
  dataPackageId,
  createdAt,
  connectionTypeId,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/connection`,
    body: {
      name,
      type,
      active,
      dataPackageId,
      createdAt,
      connectionTypeId,
    },
  });
}

export function useCreateConnection() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ name, type, active, dataPackageId, createdAt, connectionTypeId }) =>
      createConnection({
        name,
        type,
        active,
        dataPackageId,
        createdAt,
        connectionTypeId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataConnections");
        notifySuccess("Data connection created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create data connection: ${error.message}`);
        }
      },
    }
  );
}
