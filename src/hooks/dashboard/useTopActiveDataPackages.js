import { BASE_URL } from "config";
import { useQuery } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

export function getTopActiveDataPackages() {
  return fetchWrapper({
    url: `${BASE_URL}/api/report/top-active-data-packages`,
    method: "GET",
  });
}

export function useTopActiveDataPackages() {
  return useQuery("top-active-packages", getTopActiveDataPackages, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(
          `Failed to fetch top active data packages: ${error.message}`
        );
      }
    },
  });
}
