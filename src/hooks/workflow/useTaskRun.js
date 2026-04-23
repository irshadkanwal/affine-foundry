import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getTaskRun() {
  return fetchWrapper({
    url: `${BASE_URL}/api/task-run`,
    method: "GET",
  });
}

export function useTaskRun() {
  return useQuery("TaskRun", getTaskRun, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to get task run: ${error.message}`);
      }
    },
  });
}
