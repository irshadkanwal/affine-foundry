import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateResourceDialectsById({
  key,
  value,
  dataResourceId,
  dialectId,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-resource-dialect/${dialectId}`,
    body: {
      key,
      value,
      dataResourceId,
    },
  });
}

export function useUpdateDataResourceDialectById(dataResourceId, dialectId) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ key, value, dataResourceId }) =>
      updateResourceDialectsById({
        key,
        value,
        dataResourceId,
        dialectId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "DataResourceByIdDialect",
          dataResourceId,
        ]);
        notifySuccess("Data Resource Dialect updated successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to update the Data Resource Dialect: ${error.message}`
          );
        }
      },
    }
  );
}
