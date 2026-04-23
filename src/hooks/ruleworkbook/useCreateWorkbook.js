import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createWorkbook(data) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/rule-workbook`,
    body: data,
  });
}

export function useCreateWorkbook() {
  const queryClient = useQueryClient();

  return useMutation((data) => createWorkbook(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("rule-workbooks");
      notifySuccess("Workbook created successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to create workbook: ${error.message}`);
      }
    },
  });
}
