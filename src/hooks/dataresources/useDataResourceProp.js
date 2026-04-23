import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataByIDResourceProp(resourceId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${resourceId}/prop`,
    method: "GET",
  });
}

export function useDataResourceByIdProperties(resourceId) {
  return useQuery(
    ["DataResourceByIdProperties", resourceId],
    () => getDataByIDResourceProp(resourceId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data resource properties: ${error.message}`
          );
        }
      },
      enabled: !!resourceId,
    }
  );
}
