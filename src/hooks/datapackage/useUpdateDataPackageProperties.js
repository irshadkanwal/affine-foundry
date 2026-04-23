import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateeDataPackageProperties({
  key,
  value,
  appendToRecord,
  dataPackageId,
  id,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-package-prop/${id}`,
    body: {
      dataPackageId,
      key,
      value,
      appendToRecord,
    },
  });
}

export function useUpdateDataPackageProperties() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, key, value, appendToRecord, dataPackageId }) =>
      updateeDataPackageProperties({
        id,
        key,
        value,
        appendToRecord,
        dataPackageId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackageProp");
        notifySuccess("Data package properties updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to update data package properties: ${error.message}`
          );
        }
      },
    }
  );
}
