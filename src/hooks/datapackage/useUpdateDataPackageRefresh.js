import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateDataPackageRefresh({
  refreshFrequencyId,
  dataPackageId,
  day,
  frequency,
  time,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-package-refresh/${refreshFrequencyId}`,
    body: {
      dataPackageId,
      day,
      frequency,
      time,
    },
  });
}

export function useUpdateDataPackageRefresh() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ refreshFrequencyId, dataPackageId, day, frequency, time }) =>
      updateDataPackageRefresh({
        refreshFrequencyId,
        dataPackageId,
        day,
        frequency,
        time,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackage");
        notifySuccess("Data package refresh updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to update data package refresh: ${error.message}`
          );
        }
      },
    }
  );
}
