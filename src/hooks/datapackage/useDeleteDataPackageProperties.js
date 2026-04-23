import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteDataPackageProperty({ propertyId }) {
  return await fetchWrapper({
    method: "DELETE",
    url: `${BASE_URL}/api/data-package-prop/${propertyId}`,
  });
}

export function useDeleteDataPackageProperty() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ propertyId }) => deleteDataPackageProperty({ propertyId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackageProp");
        notifySuccess("Data package property deleted successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to delete data package property: ${error.message}`
          );
        }
      },
    }
  );
}
