import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "config";
import { fetchWrapper } from "utils/fetchWrapper";
import { notifyError, notifySuccess } from "utils/toastNotifications";
async function createDataResource({
  name,
  title,
  description,
  archive,
  autoProfileData,
  dataPackageId,
  userId,
  dataClassId,
  editable,
  transactionTypeId,
  dataLevelTypeId,
  dataFormatId,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/data-resource`,
    body: {
      name,
      title,
      description,
      archive,
      autoProfileData,
      dataPackageId,
      userId,
      dataClassId,
      editable,
      transactionTypeId,
      dataFormatId,
      dataLevelTypeId,
    },
  });
}

export function useCreateDataResource() {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      name,
      title,
      description,
      archive,
      autoProfileData,
      dataPackageId,
      userId,
      dataClassId,
      editable,
      transactionTypeId,
      dataLevelTypeId,
      dataFormatId,
    }) =>
      createDataResource({
        name,
        title,
        description,
        archive,
        autoProfileData,
        dataPackageId,
        userId,
        dataClassId,
        editable,
        transactionTypeId,
        dataLevelTypeId,
        dataFormatId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataResource");
        notifySuccess("Data resource created successfully.");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create data resource: ${error.message}`);
        }
      },
    }
  );
}
