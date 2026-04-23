import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataQualityByResourceId(resourceId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${resourceId}/data-quality`,
    method: "GET",
  });
}

export function useDataQualityByResourceId(resourceId) {
  return useQuery(
    ["DataQualityByResourceId", resourceId],
    () => getDataQualityByResourceId(resourceId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch data quality: ${error.message}`);
        }
      },
      enabled: !!resourceId,
    }
  );
}
