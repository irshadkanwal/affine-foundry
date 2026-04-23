import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createRuntimeProp({ key, value, runtimeId }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/runtime-prop`,
    body: {
      key,
      value,
      runtimeId,
    },
  });
}

export function useCreateRuntimeProp() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ key, value, runtimeId }) =>
      createRuntimeProp({
        key,
        value,
        runtimeId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("RuntimeProps");
        notifySuccess("Runtime property created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create runtime property: ${error.message}`);
        }
      },
    }
  );
}
