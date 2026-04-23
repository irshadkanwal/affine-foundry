import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateApplication(data) {
  const { applicationId, name, path, className, applicationType } = data;
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/application/${applicationId}`,
    body: {
      name,
      path,
      className,
      applicationType,
    },
  });
}
export function useUpdateApplication() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ applicationId, name, path, className, applicationType }) =>
      updateApplication({
        applicationId,
        name,
        path,
        className,
        applicationType,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Application");
        notifySuccess("Application updated successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update application: ${error.message}`);
        }
      },
    }
  );
}
