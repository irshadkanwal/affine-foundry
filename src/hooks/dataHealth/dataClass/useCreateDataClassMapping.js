import { BASE_URL } from "config";
import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataClassMapping(classMappingList) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-class-field-mapping`,
    body: classMappingList,
  });
}

export function useCreateDataClassMapping() {
  const queryClient = useQueryClient();

  return useMutation(
    (classMappingList) => createDataClassMapping(classMappingList),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataClassMapping", [
          "DataClassByLevel",
          2,
        ]);
        notifySuccess("Data class mapping created successfully!");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create data class mapping: ${error.message}`);
        }
      },
    }
  );
}
