import { BASE_URL } from "config";
import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataClass({ dataClassValues }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-class`,
    body: {
      dataClassValues,
    },
  });
}

export function useCreateDataClass() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ dataClassValues }) =>
      createDataClass({
        dataClassValues,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataClass");
        notifySuccess("Data class created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create data class: ${error.message}`);
        }
      },
    }
  );
}
