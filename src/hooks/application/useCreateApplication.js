import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createApplication({ name, path, className, applicationType }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/application`,
    body: {
      name,
      path,
      className,
      applicationType,
    },
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ name, path, className, applicationType }) =>
      createApplication({
        name,
        path,
        className,
        applicationType,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Application");
        notifySuccess("Application created successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create application: ${error.message}`);
        }
      },
    }
  );
}
