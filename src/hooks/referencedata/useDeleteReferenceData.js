import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteReferenceData({ referenceId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/lookup/${referenceId}`,
    method: "DELETE",
  });
}
export function useDeleteReferenceData() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ referenceId }) => deleteReferenceData({ referenceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ReferenceData");
        notifySuccess("Reference data deleted successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to delete reference data: ${error.message}`);
        }
      },
    }
  );
}
