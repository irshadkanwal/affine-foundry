import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteDataPackage({ dataPackageId }) {
  return await fetchWrapper({
    method: "DELETE",
    url: `${BASE_URL}/api/data-package/${dataPackageId}`,
  });
}

export function useDeleteDataPackage() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ dataPackageId }) => deleteDataPackage({ dataPackageId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackage");
        notifySuccess("Data package deleted successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to delete data package: ${error.message}`);
        }
      },
    }
  );
}
