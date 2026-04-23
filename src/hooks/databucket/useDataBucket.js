import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataBucket() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-bucket`,
    method: "GET",
  });
}

export function useDataBucket() {
  return useQuery("DataBucket", getDataBucket, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data bucket: ${error.message}`);
      }
    },
  });
}
