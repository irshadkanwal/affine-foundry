import { BASE_URL } from "config";
import { useQuery } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

export function getDataFormat() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-format`,
    method: "GET",
  });
}

export function useDataFormat() {
  return useQuery("DataFormat", getDataFormat, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data format: ${error.message}`);
      }
    },
  });
}
