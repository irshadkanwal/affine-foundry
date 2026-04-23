import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createResourceSchema({
  hasLookAhead,
  version,
  lookahead,
  dataResourceId,
  tableNameX,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-resource/${dataResourceId}/resource-schema`,
    body: {
      hasLookAhead,
      version,
      lookahead,
      dataResourceId,
      tableNameX,
    },
  });
}

export function useCreateResourceSchema(dataResourceId) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ hasLookAhead, version, lookahead, dataResourceId, tableNameX }) =>
      createResourceSchema({
        hasLookAhead,
        version,
        lookahead,
        dataResourceId,
        tableNameX,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["DataResourceSchema", dataResourceId]);
        notifySuccess("Resource Schema created successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create resource schema: ${error.message}`);
        }
      },
    }
  );
}
