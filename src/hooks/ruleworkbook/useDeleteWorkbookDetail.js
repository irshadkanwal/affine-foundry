import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteWorkbookDetail({ workbookDetailId }) {
  return await fetchWrapper({
    url: `${BASE_URL}/api/rule-workbook-detail/${workbookDetailId}`,
    method: "DELETE",
  });
}
export function useDeleteWorkbookDetail(workbookDetailId) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ workbookDetailId }) => deleteWorkbookDetail({ workbookDetailId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "rule-workbook-detail",
          workbookDetailId,
        ]);
        notifySuccess("Workbook detail deleted successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to delete workbook detail: ${error.message}`);
        }
      },
    }
  );
}
