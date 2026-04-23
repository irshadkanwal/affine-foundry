import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "config";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteDataPackagePotentialName({ potentialNameId }) {
  return await fetchWrapper({
    method: "DELETE",
    url: `${BASE_URL}/api/data-package-potential-table/${potentialNameId}`,
  });
}

export function useDeleteDataPackagePotentialName() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ potentialNameId }) =>
      deleteDataPackagePotentialName({ potentialNameId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackagePotentialName");
        notifySuccess("Data package potential name deleted successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to delete data package potential name: ${error.message}`
          );
        }
      },
    }
  );
}
