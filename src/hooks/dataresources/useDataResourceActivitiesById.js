import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataResourceActivity(dataResourceId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${dataResourceId}/activity`,
    method: "GET",
  });
}

export function useDataResourceActivitiesById(dataResourceId) {
  return useQuery(
    ["DataResourceActivity", dataResourceId],
    () => getDataResourceActivity(dataResourceId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data resource activities by id: ${error.message}`
          );
        }
      },
      enabled: !!dataResourceId,
    }
  );
}
