import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getAppLicationData() {
  return fetchWrapper({
    url: `${BASE_URL}/api/application`,
    method: "GET",
  });
}

export function useApplication() {
  return useQuery("Application", getAppLicationData, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch Application: ${error.message}`);
      }
    },
  });
}
