import { BASE_URL } from "config";
import { useQuery } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError } from "utils/toastNotifications";

export function taskNotification() {
  return fetchWrapper({
    url: `${BASE_URL}/api/task-notification`,
    method: "GET",
  });
}

export function useTaskNotification() {
  return useQuery("TaskNotifications", taskNotification, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to get task notifications: ${error.message}`);
      }
    },
  });
}
