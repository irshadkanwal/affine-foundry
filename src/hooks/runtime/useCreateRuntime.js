import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function createRuntime({ runtimeValues }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/runtime`,
    body: {
      ...runtimeValues,
    },
  });
}

export function useCreateRuntime() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ runtimeValues }) =>
      createRuntime({
        runtimeValues,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Runtime");
        notifySuccess("Runtime created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create runtime: ${error.message}`);
        }
      },
    }
  );
}
