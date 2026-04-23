import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateWorkbookDetail(workbookDetailId, data) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/rule-workbook-detail/${workbookDetailId}`,
    body: data,
  });
}

export function useUpdateWorkbookDetail() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ workbookDetailId, data }) =>
      updateWorkbookDetail(workbookDetailId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("rule-workbook-detail");
        notifySuccess("Workbook detail updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update workbook detail: ${error.message}`);
        }
      },
    }
  );
}
