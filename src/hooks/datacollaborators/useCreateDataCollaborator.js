import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataCollaborator({
  collaboratorRoleId,
  dataPackageId,
  lastActivityAt,
  userId,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/collaborator`,
    body: {
      collaboratorRoleId,
      dataPackageId,
      lastActivityAt,
      userId,
    },
  });
}

export function useCreateDataCollaborator() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ collaboratorRoleId, dataPackageId, lastActivityAt, userId }) =>
      createDataCollaborator({
        collaboratorRoleId,
        dataPackageId,
        lastActivityAt,
        userId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataCollaborators");
        notifySuccess("Data collaborator created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create data collaborator: ${error.message}`);
        }
      },
    }
  );
}
