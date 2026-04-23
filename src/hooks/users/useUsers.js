import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getUsers() {
  return fetchWrapper({
    url: `${BASE_URL}/api/user`,
    method: "GET",
  });
}

export function useUsers() {
  return useQuery("Users", getUsers, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch users: ${error.message}`);
      }
    },
  });
}
