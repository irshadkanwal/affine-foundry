import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getReferenceDataById({ referenceId }) {
  return fetchWrapper({
    url: `${BASE_URL}/api/lookup/${referenceId}`,
    method: "GET",
  });
}

export function useReferenceDataById(referenceId) {
  return useQuery(
    ["ReferenceDataById", referenceId],
    () => getReferenceDataById(referenceId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch reference data by id: ${error.message}`);
        }
      },
    }
  );
}
