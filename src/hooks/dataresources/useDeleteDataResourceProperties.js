import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteDataResourcePropety({ propertyId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/data-resource-prop/${propertyId}`,
    method: "DELETE",
  });
}
export function useDeleteDataResourcePropety(dataResourceId) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ propertyId }) => deleteDataResourcePropety({ propertyId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "DataResourceByIdProperties",
          dataResourceId,
        ]);
        notifySuccess("Data Resource Property deleted successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to delete data resource property: ${error.message}`
          );
        }
      },
    }
  );
}
