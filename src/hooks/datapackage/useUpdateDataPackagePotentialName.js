import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "config";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateDataPackagePotentialName({
  potentialNameId,
  potentialName,
  dataPackageId,
  regex,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-package-potential-table/${potentialNameId}`,
    body: {
      potentialName,
      dataPackageId,
      regex,
    },
  });
}

export function useUpdateDataPackagePotentialName() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ potentialNameId, potentialName, dataPackageId, regex }) =>
      updateDataPackagePotentialName({
        potentialNameId,
        potentialName,
        dataPackageId,
        regex,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackagePotentialName");
        notifySuccess("Potential name updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update potential name: ${error.message}`);
        }
      },
    }
  );
}
