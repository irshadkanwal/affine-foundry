import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getProfileHistogramById(profileKey) {
  return fetchWrapper({
    url: `${BASE_URL}/api/profile-detail/${profileKey}/histogram`,
    method: "GET",
  });
}

export function useProfileHistogramById(profileKey) {
  return useQuery(
    ["DataProfileHistogramByID", profileKey],
    () => getProfileHistogramById(profileKey),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch profile histogram: ${error.message}`);
        }
      },
      enabled: !!profileKey,
      refetchInterval: 10000,
    }
  );
}
