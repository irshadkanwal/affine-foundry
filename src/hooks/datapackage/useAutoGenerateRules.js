import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { BASE_URL } from "config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function autoGenerateRules({ dataPackageId }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-package/${dataPackageId}/auto-generate-rules`,
  });
}

export function useAutoGenerateRules() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ dataPackageId }) =>
      autoGenerateRules({
        dataPackageId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("");
        notifySuccess("Rules auto generated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to auto generate rules: ${error.message}`);
        }
      },
    }
  );
}
