import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataByIDResourceDialect(resourceId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${resourceId}/dialect`,
    method: "GET",
  });
}

export function useDataResourceByIdDialect(resourceId) {
  return useQuery(
    ["DataResourceByIdDialect", resourceId],
    () => getDataByIDResourceDialect(resourceId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data resource dialect by id: ${error.message}`
          );
        }
      },
      enabled: !!resourceId,
    }
  );
}
