import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataResourceDialect({ key, value, dataResourceId }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-resource-dialect`,
    body: {
      key,
      value,
      dataResourceId,
    },
  });
}

export function useCreateDataResourceDialect(dataResourceId) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ key, value, dataResourceId }) =>
      createDataResourceDialect({
        key,
        value,
        dataResourceId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "DataResourceByIdDialect",
          dataResourceId,
        ]);
        notifySuccess("Data Resource Dialect created successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to create data resource dialect: ${error.message}`
          );
        }
      },
    }
  );
}
