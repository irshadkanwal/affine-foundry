import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getProfileDetailById(profileKey) {
  return fetchWrapper({
    url: `${BASE_URL}/api/profile-header/${profileKey}/details`,
    method: "GET",
  });
}

export function useProfileDetailById(profileKey) {
  return useQuery(
    ["DataProfileHeaderByID", profileKey],
    () => getProfileDetailById(profileKey),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch profile details: ${error.message}`);
        }
      },
      enabled: !!profileKey,
    }
  );
}
