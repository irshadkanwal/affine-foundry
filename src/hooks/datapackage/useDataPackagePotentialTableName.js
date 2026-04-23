import { BASE_URL } from "config";
import { useQuery } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

export function getDataPackagePotentialTableName() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-package-potential-table`,
    method: "GET",
  });
}

export function useDataPackagePotentialTableName() {
  return useQuery(
    "DataPackagePotentialName",
    getDataPackagePotentialTableName,
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data package potential table name: ${error.message}`
          );
        }
      },
    }
  );
}
