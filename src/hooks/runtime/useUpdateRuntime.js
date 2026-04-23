import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function updateRuntime({ runtimeValues, runtimeId }) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/runtime/${runtimeId}`,
    body: {
      ...runtimeValues,
    },
  });
}

export function useUpdateRuntime() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ runtimeId, runtimeValues }) =>
      updateRuntime({
        runtimeValues,
        runtimeId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Runtime");
        notifySuccess("Runtime updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update runtime: ${error.message}`);
        }
      },
    }
  );
}
