import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getTransactionType() {
  return fetchWrapper({
    url: `${BASE_URL}/api/transaction-type`,
    method: "GET",
  });
}

export function useTransactionType() {
  return useQuery("TransactionType", getTransactionType, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch transaction type: ${error.message}`);
      }
    },
  });
}
