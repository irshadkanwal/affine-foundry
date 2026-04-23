import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createApplicationProp({ key, value, position, applicationId }) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/application-prop`,
    body: {
      key,
      value,
      applicationId,
      position,
    },
  });
}

export function useCreateApplicationProp() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ key, value, applicationId, position }) =>
      createApplicationProp({
        key,
        value,
        applicationId,
        position,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ApplicationProps");
        notifySuccess("Application Prop created successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create application prop: ${error.message}`);
        }
      },
    }
  );
}
