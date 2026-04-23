import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getResourceTargetSchema(resourceId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${resourceId}/target-schema`,
    method: "GET",
  });
}

export function useResourceTargetSchema(resourceId) {
  return useQuery(
    ["DataResourceTargetSchema", resourceId],
    () => getResourceTargetSchema(resourceId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data resource target schema: ${error.message}`
          );
        }
      },
      enabled: !!resourceId,
    }
  );
}
