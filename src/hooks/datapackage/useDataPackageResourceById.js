import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataPackageResourceById(dataPackageId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package/${dataPackageId}/data-resource`,
    method: "GET",
  });
}

export function useDataPackageResourceById(dataPackageId) {
  return useQuery(
    ["DataPackageResourceById", dataPackageId],
    () => getDataPackageResourceById(dataPackageId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data package resource: ${error.message}`
          );
        }
      },
      enabled: !!dataPackageId,
    }
  );
}
