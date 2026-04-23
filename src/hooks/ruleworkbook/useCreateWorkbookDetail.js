import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createWorkbookDetail(data) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/rule-workbook-detail`,
    body: data,
  });
}

export function useCreateWorkbookDetail() {
  const queryClient = useQueryClient();

  return useMutation(({ data }) => createWorkbookDetail(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("rule-workbook-detail");
      notifySuccess("Workbook detail created successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to create workbook detail: ${error.message}`);
      }
    },
  });
}
