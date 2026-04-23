import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getProfileSuggestionById(profileKey) {
  return fetchWrapper({
    url: `${BASE_URL}/api/profile-detail/${profileKey}/suggestion`,
    method: "GET",
  });
}

export function useProfileSuggestionById(profileKey) {
  return useQuery(
    ["DataProfileSuggestionByID", profileKey],
    () => getProfileSuggestionById(profileKey),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch profile suggestion: ${error.message}`);
        }
      },
      enabled: !!profileKey,
    }
  );
}
