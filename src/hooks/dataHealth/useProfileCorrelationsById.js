import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getProfileCorrelationsById(profileKey) {
  return fetchWrapper({
    url: `${BASE_URL}/api/profile-header/${profileKey}/correlations`,
    method: "GET",
  });
}

export function useProfileCorrelationsById(profileKey) {
  return useQuery(
    ["DataProfileCorrelationsByID", profileKey],
    () => getProfileCorrelationsById(profileKey),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch profile correlations: ${error.message}`);
        }
      },
      enabled: !!profileKey,
    }
  );
}
