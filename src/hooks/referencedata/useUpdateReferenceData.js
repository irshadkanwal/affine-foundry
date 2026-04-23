import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateReferenceData({ referenceData, referenceId }) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/lookup/${referenceId}`,
    body: referenceData,
  });
}

export function useUpdateReferenceData() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ referenceData, referenceId }) =>
      updateReferenceData({
        referenceData,
        referenceId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ReferenceData");
        notifySuccess("Reference data updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update reference data: ${error.message}`);
        }
      },
    }
  );
}
