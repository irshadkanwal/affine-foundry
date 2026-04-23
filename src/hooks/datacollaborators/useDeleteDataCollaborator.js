import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteDataCollaborator({ collaboratorId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/collaborator/${collaboratorId}`,
    method: "DELETE",
  });
}
export function useDeleteDataCollaborator() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ collaboratorId }) => deleteDataCollaborator({ collaboratorId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataCollaborators");
        notifySuccess("Data collaborator deleted successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to delete data collaborator: ${error.message}`);
        }
      },
    }
  );
}
