import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getTaskNodes() {
  return fetchWrapper({
    url: `${BASE_URL}/api/task`,
    method: "GET",
  });
}

export function useTaskNodes() {
  return useQuery("TaskNodes", getTaskNodes, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to get task nodes: ${error.message}`);
      }
    },
  });
}
