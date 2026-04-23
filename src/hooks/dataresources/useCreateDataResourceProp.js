import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataResourceProp({
  key,
  value,
  appendToRecord,
  dataResourceId,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-resource-prop`,
    body: {
      key,
      value,
      appendToRecord,
      dataResourceId,
    },
  });
}

export function useCreateDataResourceProp(dataResourceId) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ key, value, appendToRecord, dataResourceId }) =>
      createDataResourceProp({
        key,
        value,
        appendToRecord,
        dataResourceId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "DataResourceByIdProperties",
          dataResourceId,
        ]);
        notifySuccess("Data Resource Property created successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to create data resource property: ${error.message}`
          );
        }
      },
    }
  );
}
