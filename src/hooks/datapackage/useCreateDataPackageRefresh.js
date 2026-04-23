import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataPackageRefresh({
  dataPackageId,
  day,
  frequency,
  time,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-package-refresh`,
    body: {
      dataPackageId,
      day,
      frequency,
      time,
    },
  });
}

export function useCreateDataPackageRefresh() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ dataPackageId, day, frequency, time }) =>
      createDataPackageRefresh({
        dataPackageId,
        day,
        frequency,
        time,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackageRefresh");
        notifySuccess("Data package refresh created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to create data package refresh: ${error.message}`
          );
        }
      },
    }
  );
}
