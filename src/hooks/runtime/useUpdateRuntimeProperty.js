import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateRuntimeProp({ key, value, runtimeId, id }) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/runtime-prop/${id}`,
    body: {
      key,
      value,
      runtimeId,
    },
  });
}
export function useUpdateRuntimeProp() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ key, value, runtimeId, id }) =>
      updateRuntimeProp({
        key,
        value,
        runtimeId,
        id,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("RuntimeProps");
        notifySuccess("Runtime property updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update runtime property: ${error.message}`);
        }
      },
    }
  );
}
