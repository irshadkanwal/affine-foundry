import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getResourceSchema(resourceId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${resourceId}/resource-schema`,
    method: "GET",
  });
}

export function useResourceSchema(resourceId) {
  return useQuery(
    ["DataResourceSchema", resourceId],
    () => getResourceSchema(resourceId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch data resource schema: ${error.message}`);
        }
      },
      enabled: !!resourceId,
    }
  );
}
