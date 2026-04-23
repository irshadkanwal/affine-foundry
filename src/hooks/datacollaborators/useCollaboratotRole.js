import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataCollaboratorRoles() {
  return fetchWrapper({
    url: `${BASE_URL}/api/collaborator-role`,
    method: "GET",
  });
}

export function useDataCollaboratorRoles() {
  return useQuery("DataCollaboratorsRoles", getDataCollaboratorRoles, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(
          `Failed to fetch data collaborator roles: ${error.message}`
        );
      }
    },
  });
}
