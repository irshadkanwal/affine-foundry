import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataClassbyLevel(level) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-class?level=${level}`,
    method: "GET",
  });
}

export function useDataClassbyLevel(level) {
  return useQuery(
    ["DataClassByLevel", level],
    () => getDataClassbyLevel(level),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch data class by level: ${error.message}`);
        }
      },
    }
  );
}
