import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getRuleWorkBook() {
  return fetchWrapper({
    url: `${BASE_URL}/api/rule-workbook`,
    method: "GET",
  });
}

export function useRuleWorkBook() {
  return useQuery("rule-workbooks", getRuleWorkBook, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch rule workbooks: ${error.message}`);
      }
    },
  });
}
