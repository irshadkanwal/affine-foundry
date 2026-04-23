import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataLineageByResourceId(dataPackageId, params) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package/${dataPackageId}/lineage?${params}`,
    method: "GET",
  });
}

export function useDataLineageByResourceId(dataPackageId, params) {
  return useQuery(
    ["DataLineageByResourceId", dataPackageId, params],
    () => getDataLineageByResourceId(dataPackageId, params),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch data lineage: ${error.message}`);
        }
      },
      enabled: !!dataPackageId && !!params,
    }
  );
}
