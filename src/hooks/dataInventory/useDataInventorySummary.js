import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataInventorySummaryByPackageId(dataPackageId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package/${dataPackageId}/data-inventory-summary`,
    method: "GET",
  });
}

export function useDataInventorySummary(dataPackageId) {
  return useQuery(
    ["DataInventoryByDataPackageId", dataPackageId],
    () => getDataInventorySummaryByPackageId(dataPackageId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data inventory summary: ${error.message}`
          );
        }
      },
      enabled: !!dataPackageId,
      // refetchInterval: 10000,
    }
  );
}
