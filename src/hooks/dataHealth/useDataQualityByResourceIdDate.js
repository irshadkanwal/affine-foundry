import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataQualityByResourceIdDate(resourceId, dateValue) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${resourceId}/data-quality?date=${dateValue}`,
    method: "GET",
  });
}

export function useDataQualityByResourceIdDate(resourceId, dateValue) {
  return useQuery(
    ["DataQualityByResourceIdandDate", resourceId, dateValue],
    () => getDataQualityByResourceIdDate(resourceId, dateValue),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch data quality: ${error.message}`);
        }
      },
      enabled: !!resourceId && !!dateValue,
    }
  );
}
