import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function updateDataPackage({
  dataPackageId,
  name,
  description,
  archive,
  autoProfileData,
  basePath,
  dataBucketId,
  dataClassificationId,
  ownerId,
  frequency,
  slaCronSchedule,
  cronSchedule,
}) {
  return await fetchWrapper({
    method: "PUT",
    url: `${BASE_URL}/api/data-package/${dataPackageId}`,
    body: {
      name,
      description,
      archive,
      autoProfileData,
      basePath,
      dataBucketId,
      dataClassificationId,
      ownerId,
      frequency,
      slaCronSchedule,
      cronSchedule,
    },
  });
}

export function useUpdateDataPackage() {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      dataPackageId,
      name,
      description,
      archive,
      autoProfileData,
      basePath,
      dataBucketId,
      dataClassificationId,
      ownerId,
      frequency,
      slaCronSchedule,
      cronSchedule,
    }) =>
      updateDataPackage({
        dataPackageId,
        name,
        description,
        archive,
        autoProfileData,
        basePath,
        dataBucketId,
        dataClassificationId,
        ownerId,
        frequency,
        slaCronSchedule,
        cronSchedule,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("DataPackage");
        notifySuccess("Data package updated successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to update data package: ${error.message}`);
        }
      },
    }
  );
}
