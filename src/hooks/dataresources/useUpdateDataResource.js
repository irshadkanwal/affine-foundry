import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateDataResource({ resourceData, resourceId }) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-resource/${resourceId}`,
    body: resourceData,
  });
}

export function useUpdateDataResource() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ resourceData, resourceId }) =>
      updateDataResource({
        resourceData,
        resourceId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataResource");
        notifySuccess("Data resource updated successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update data resource: ${error.message}`);
        }
      },
    }
  );
}
