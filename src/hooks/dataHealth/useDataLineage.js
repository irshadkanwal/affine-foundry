import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataLineage(dataPackageId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package/${dataPackageId}/lineage`,
    method: "GET",
  });
}

export function useDataLineage(dataPackageId) {
  return useQuery(
    ["DataLineage", dataPackageId],
    () => getDataLineage(dataPackageId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch data lineage: ${error.message}`);
        }
      },
      enabled: !!dataPackageId,
    }
  );
}
