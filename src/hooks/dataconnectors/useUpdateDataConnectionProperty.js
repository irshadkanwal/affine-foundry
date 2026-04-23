import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateDataConnectionProp({
  key,
  value,
  connectionId,
  connectionPropId,
  isSecret,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/connection-prop/${connectionPropId}`,
    body: {
      key,
      value,
      connectionId,
      isSecret,
    },
  });
}
export function useUpdateDataConnectionProp() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ key, value, connectionId, connectionPropId, isSecret }) =>
      updateDataConnectionProp({
        key,
        value,
        connectionId,
        connectionPropId,
        isSecret,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataConnectionsProp");
        notifySuccess("Data connection property updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to update data connection property: ${error.message}`
          );
        }
      },
    }
  );
}
