import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getRuleWorkBookDetail(workbookId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/rule-workbook-detail/?workbookId=${workbookId}`,
    method: "GET",
  });
}

export function useRuleWorkBookDetail(workBookId) {
  return useQuery(
    ["rule-workbook-detail", workBookId],
    () => getRuleWorkBookDetail(workBookId),
    {
      enabled: !!workBookId,
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to fetch rule workbook detail: ${error.message}`);
        }
      },
    }
  );
}
