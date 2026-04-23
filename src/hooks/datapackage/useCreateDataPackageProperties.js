import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataPackageProperties({
  key,
  value,
  appendToRecord,
  dataPackageId,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-package-prop`,
    body: {
      key,
      value,
      appendToRecord,
      dataPackageId,
    },
  });
}

export function useCreateDataPackageProperties() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ key, value, appendToRecord, dataPackageId }) =>
      createDataPackageProperties({
        key,
        value,
        appendToRecord,
        dataPackageId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackageProp");
        notifySuccess("Data package properties created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to create data package properties: ${error.message}`
          );
        }
      },
    }
  );
}
