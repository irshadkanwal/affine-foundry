import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataCollaborators() {
  return fetchWrapper({
    url: `${BASE_URL}/api/collaborator`,
    method: "GET",
  });
}

export function useDataCollaborators() {
  return useQuery("DataCollaborators", getDataCollaborators, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data collaborators: ${error.message}`);
      }
    },
  });
}
