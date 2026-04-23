import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateApplicationProp({
  key,
  value,
  applicationId,
  applicationPropId,
  postion,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/application-prop/${applicationPropId}`,
    body: {
      key,
      value,
      applicationId,
      postion,
    },
  });
}
export function useUpdateApplicationProp() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ key, value, applicationId, applicationPropId, postion }) =>
      updateApplicationProp({
        key,
        value,
        applicationId,
        applicationPropId,
        postion,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ApplicationProps");
        notifySuccess("Application Prop updated successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update application prop: ${error.message}`);
        }
      },
    }
  );
}
