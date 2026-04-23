import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateDataCollaborator({
  collaboratorId,
  collaboratorRoleId,
  dataPackageId,
  lastActivityAt,
  userId,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/collaborator/${collaboratorId}`,
    body: {
      collaboratorRoleId,
      dataPackageId,
      lastActivityAt,
      userId,
    },
  });
}

export function useUpdateDataCollaborator() {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      collaboratorId,
      collaboratorRoleId,
      dataPackageId,
      lastActivityAt,
      userId,
    }) =>
      updateDataCollaborator({
        collaboratorId,
        collaboratorRoleId,
        dataPackageId,
        lastActivityAt,
        userId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataCollaborators");
        notifySuccess("Data collaborator updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update data collaborator: ${error.message}`);
        }
      },
    }
  );
}
