import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getLookupSchema() {
  return fetchWrapper({
    url: `${BASE_URL}/api/lookup-version-schema-column`,
    method: "GET",
  });
}

export function useLookupSchema() {
  return useQuery("LookupSchema", getLookupSchema, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch lookup schema: ${error.message}`);
      }
    },
  });
}
