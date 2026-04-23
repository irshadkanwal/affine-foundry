import { BASE_URL } from "config";
import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateDataClassMapping({
  mappingId,
  dataClassId,
  dataResourceId,
  fieldName,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-class-field-mapping/${mappingId}`,
    body: {
      dataClassId,
      dataResourceId,
      fieldName,
    },
  });
}

export function useUpdateDataClassMapping() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ dataClassId, dataResourceId, fieldName, mappingId }) =>
      updateDataClassMapping({
        dataClassId,
        dataResourceId,
        fieldName,
        mappingId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataClassMapping", [
          "DataClassByLevel",
          2,
        ]);
        notifySuccess("Data class mapping updated successfully!");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update data class mapping: ${error.message}`);
        }
      },
    }
  );
}
