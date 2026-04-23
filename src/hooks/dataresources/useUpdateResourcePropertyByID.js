import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataResourcePropById({
  key,
  value,
  appendToRecord,
  dataResourceId,
  propertyID,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-resource-prop/${propertyID}`,
    body: {
      key,
      value,
      appendToRecord,
      dataResourceId,
    },
  });
}

export function useUpdateDataResourcePropById(dataResourceId, propertyID) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ key, value, appendToRecord, dataResourceId }) =>
      createDataResourcePropById({
        key,
        value,
        appendToRecord,
        dataResourceId,
        propertyID,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "DataResourceByIdProperties",
          dataResourceId,
        ]);
        notifySuccess("Data Resource Property updated successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to update data resource property by id: ${error.message}`
          );
        }
      },
    }
  );
}
