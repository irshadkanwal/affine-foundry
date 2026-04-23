import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataInventoryDetailByPackageId(dataPackageId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package/${dataPackageId}/data-inventory-detail`,
    method: "GET",
  });
}

export function useDataInventoryDetail(dataPackageId) {
  return useQuery(
    ["DataInventoryDetailByDataPackageId", dataPackageId],
    () => getDataInventoryDetailByPackageId(dataPackageId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data inventory detail: ${error.message}`
          );
        }
      },
      enabled: !!dataPackageId,
      // refetchInterval: 10000,
    }
  );
}
