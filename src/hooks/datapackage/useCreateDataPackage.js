import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createDataPackage({
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
    method: "POST",
    url: `${BASE_URL}/api/data-package`,
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

export function useCreateDataPackage() {
  const queryClient = useQueryClient();

  return useMutation(
    ({
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
      createDataPackage({
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
        notifySuccess("Data package created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create data package: ${error.message}`);
        }
      },
    }
  );
}
