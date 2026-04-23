import { BASE_URL } from "config";
import { useQuery } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

export function getDataInventoryStatus() {
  return fetchWrapper({
    url: `${BASE_URL}/api/report/inventory-status`,
    method: "GET",
  });
}

export function useDataInventoryStatus() {
  return useQuery("data-inventory-status", getDataInventoryStatus, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data inventory status: ${error.message}`);
      }
    },
  });
}
