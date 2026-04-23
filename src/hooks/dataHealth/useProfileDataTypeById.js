import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getProfileDataTypeById(profileKey) {
  return fetchWrapper({
    url: `${BASE_URL}/api/profile-detail/${profileKey}/data-type`,
    method: "GET",
  });
}

export function useProfileDataTypeById(profileKey) {
  return useQuery(
    ["DataProfileDataTypeByID", profileKey],
    () => getProfileDataTypeById(profileKey),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch profile data type: ${error.message}`);
        }
      },
      enabled: !!profileKey,
    }
  );
}
