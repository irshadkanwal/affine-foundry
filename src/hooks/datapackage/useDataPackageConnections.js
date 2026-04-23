import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataPackageConnections(dataPackageId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package/${dataPackageId}/connection`,
    method: "GET",
  });
}

export function useDataPackageConnections(dataPackageId) {
  return useQuery(
    ["DataPackageConnections", dataPackageId],
    () => getDataPackageConnections(dataPackageId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data package connections: ${error.message}`
          );
        }
      },
      enabled: !!dataPackageId,
    }
  );
}
