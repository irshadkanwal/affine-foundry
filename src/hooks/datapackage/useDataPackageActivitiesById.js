import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataPackageActivity(dataPackageId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package/${dataPackageId}/activity`,
    method: "GET",
  });
}

export function useDataPackageActivitiesById(dataPackageId) {
  return useQuery(
    ["DataPackageActivity", dataPackageId],
    () => getDataPackageActivity(dataPackageId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data package activity: ${error.message}`
          );
        }
      },
      enabled: !!dataPackageId,
    }
  );
}
