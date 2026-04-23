import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createConnectionProp({ key, value, isSecret, connectionId }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/connection-prop`,
    body: {
      key,
      value,
      connectionId,
      isSecret,
    },
  });
}

export function useCreateConnectionProp() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ key, value, connectionId, isSecret }) =>
      createConnectionProp({
        key,
        value,
        connectionId,
        isSecret,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataConnectionsProp");
        notifySuccess("Data connection property created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to create data connection property: ${error.message}`
          );
        }
      },
    }
  );
}
