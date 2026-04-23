import { BASE_URL } from "config";
import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataPackagePotentialName({
  potentialName,
  dataPackageId,
  regex,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-package-potential-table`,
    body: {
      potentialName,
      dataPackageId,
      regex,
    },
  });
}

export function useCreateDataPackagePotentialName() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ potentialName, dataPackageId, regex }) =>
      createDataPackagePotentialName({
        potentialName,
        regex,
        dataPackageId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackagePotentialName");
        notifySuccess("Potential name created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create potential name: ${error.message}`);
        }
      },
    }
  );
}
