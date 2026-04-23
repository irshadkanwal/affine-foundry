import { useMutation } from "react-query";
import { fetchWrapper } from "utils/fetchWrapper";
import { BASE_URL } from "config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function autoAssignClass({ dataPackageId }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-package/${dataPackageId}/auto-assign-class`,
  });
}

export function useAutoAssignClass() {
  return useMutation(
    ({ dataPackageId }) =>
      autoAssignClass({
        dataPackageId,
      }),
    {
      onSuccess: () => {
        <p>simple message</p>;
        notifySuccess("Class auto assigned successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to auto assign class: ${error.message}`);
        }
      },
    }
  );
}
